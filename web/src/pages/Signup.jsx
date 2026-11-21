import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, googleLoginUser, clearAuthError, sendOtp, verifyOtp } from '../redux/slices/authSlice'
import { useGoogleLogin } from '@react-oauth/google'
import { useLanguage } from '../context/LanguageContext'

import SiteBrandLogo from '../components/SiteBrandLogo'
import './Signup.css'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { loading, error, token, otpVerified: otpVerifiedStore } = useSelector((state) => state.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [localError, setLocalError] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true })
  }, [token, navigate])

  // Clear errors on any field change
  useEffect(() => {
    if (error) dispatch(clearAuthError())
    if (localError) setLocalError(null)
  }, [name, email, password, confirm])

  useEffect(() => {
    // Reset OTP state when email changes
    setOtpSent(false)
    setOtpCode('')
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) return
    if (password !== confirm) {
      setLocalError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }
    dispatch(registerUser({ name: name.trim(), fullName: name.trim(), email: email.trim(), password, phone: phone.trim(), is_verify: !!otpVerifiedStore }))
  }

  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      setLocalError('Enter a valid email to send OTP')
      return
    }
    setSendingOtp(true)
    try {
      await dispatch(sendOtp({ email: email.trim() })).unwrap()
      setOtpSent(true)
    } catch (err) {
      setLocalError(err || 'Failed to send OTP')
    } finally {
      setSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      setLocalError('Enter the OTP')
      return
    }
    setVerifyingOtp(true)
    try {
      await dispatch(verifyOtp({ email: email.trim(), otp: otpCode.trim() })).unwrap()
      setLocalError(null)
    } catch (err) {
      setLocalError(err || 'OTP verification failed')
    } finally {
      setVerifyingOtp(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const resultAction = await dispatch(googleLoginUser({
          googleAccessToken: tokenResponse.access_token,
          deviceId: 'browser',
          platform: 'web'
        }));
        if (googleLoginUser.fulfilled.match(resultAction)) {
          navigate('/dashboard', { replace: true })
        }
      } catch (err) {
        console.error('Google Login Error:', err);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const displayError = localError || error

  return (
    <div className="signup-container">
      {/* Background ambient lighting */}
      <div className="signup-glow signup-glow--a" aria-hidden />
      <div className="signup-glow signup-glow--b" aria-hidden />

      {/* Top Navigation Row */}
      <div className="signup-top-bar">
        <Link to="/" className="signup-back-link">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to website</span>
        </Link>
      </div>

      {/* Centered Auth Card */}
      <div className="signup-card">
        {/* Brand Logo Inside Form Card */}
        <div className="signup-card-brand">
          <Link to="/" className="signup-brand-link" aria-label="EXTRACLS Home">
            <SiteBrandLogo size="auth" />
          </Link>
        </div>

        <div className="signup-header">
          <h1 className="signup-title">{t('joinTheCircleTitle')}</h1>
          <p className="signup-subtitle">{t('signupSubtitle')}</p>
        </div>

        <button type="button" className="google-btn" onClick={() => handleGoogleLogin()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.87 14.13c-.22-.67-.35-1.38-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.53 1 10.21 1 12s.43 3.47 1.18 4.97l3.69-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335" />
          </svg>
          <span>{t('joinWithGoogle')}</span>
        </button>

        <div className="divider">
          <span>{t('orCreateAccount')}</span>
        </div>

        {/* Error Banner */}
        {displayError && (
          <div className="auth-error-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{displayError}</span>
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">{t('fullName')}</label>
            <input
              id="signup-name"
              type="text"
              className="signup-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-phone">Phone Number (Optional)</label>
            <input
              id="signup-phone"
              type="tel"
              className="signup-input"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">{t('emailAddress')}</label>
            <input
              id="signup-email"
              type="email"
              className="signup-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <div className="otp-controls-row">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className="otp-send-btn"
              >
                {sendingOtp ? t('sendingOtpBtn') : (otpSent ? t('resendOtpBtn') : t('sendOtpBtn'))}
              </button>
              {otpSent && (
                <div className="otp-verify-wrap">
                  <input
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder={t('enterOtpPlaceholder')}
                    className="signup-input otp-code-input"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otpVerifiedStore}
                    className={`otp-verify-btn ${otpVerifiedStore ? 'otp-verify-btn--verified' : ''}`}
                  >
                    {verifyingOtp ? t('verifyingBtn') : (otpVerifiedStore ? t('verifiedBtn') : t('verifyBtn'))}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">{t('password')}</label>
            <div className="password-field-wrap">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className={`signup-input ${password && confirm && password !== confirm ? 'signup-input--error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">{t('confirmPassword')}</label>
            <div className="password-field-wrap">
              <input
                id="signup-confirm"
                type={showConfirm ? 'text' : 'password'}
                className={`signup-input ${password && confirm && password !== confirm ? 'signup-input--error' : ''}`}
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {/* Inline match indicator */}
            {confirm && (
              <span className={`password-match-hint ${password === confirm ? 'password-match-hint--ok' : 'password-match-hint--err'}`}>
                {password === confirm ? '✓ Passwords match' : '✗ Passwords do not match'}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`signin-btn ${loading ? 'signin-btn--loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="signin-spinner" />
                <span>CREATING ACCOUNT...</span>
              </>
            ) : (
              <span>{t('createAccount')}</span>
            )}
          </button>
        </form>

        <div className="signup-text">
          {t('alreadyHaveAccount')} <Link to="/login" className="signup-link">{t('signIn')}</Link>
        </div>
      </div>

      {/* Centered Footer */}
      <footer className="signup-footer">
        <p>© {new Date().getFullYear()} EXTRACLS. ALL RIGHTS RESERVED.</p>
        <p className="signup-footer-security">
          <span>🔒 256-Bit SSL Encrypted & Secure Connection</span>
        </p>
      </footer>
    </div>
  )
}

export default Signup
