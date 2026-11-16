import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import sanitizeDisplay from '../utils/textSanitize'
import { editorJsBlocks, editorJsToPlainText, isHtmlContent } from '../utils/editorContent'
import { useLanguage } from '../context/LanguageContext'
import { submitContactQuery, resetSupportState } from '../redux/slices/supportSlice'

const BTN =
  'inline-flex items-center justify-center font-jetbrains text-[10px] font-bold tracking-[0.35em] uppercase rounded-xl px-8 md:px-10 py-3.5 transition-all duration-300'

const EMPTY_FORM = { name: '', email: '', phone: '', reason: '' }

const CourseHeroDetail = ({ course, section }) => {
  const heroRef = useRef(null)
  const dispatch = useDispatch()
  const { t } = useLanguage()
  const { user } = useSelector((state) => state.auth)
  const { submitting, error, success } = useSelector((state) => state.support)

  const [formData, setFormData] = useState({
    name: user?.name || user?.fullName || '',
    email: user?.email || '',
    phone: '',
    reason: '',
  })
  const [validationError, setValidationError] = useState(null)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)

  const rawTitle = section?.title || course.title || ''
  const displayTitle = sanitizeDisplay(rawTitle)
  const displaySubtitle = sanitizeDisplay(section?.subtitle || course.subtitle || '')
  const courseTitleForQuery = sanitizeDisplay(course?.title) || 'Unknown course'

  const sectionDescriptionBlocks = editorJsBlocks(section?.description)
  const courseDescriptionRaw = course.shortDescription || course.description || ''
  const descriptionIsHtml = isHtmlContent(courseDescriptionRaw)
  const plainDescription =
    sectionDescriptionBlocks.length > 0
      ? sectionDescriptionBlocks.join(' ')
      : editorJsToPlainText(section?.description) || (descriptionIsHtml ? '' : courseDescriptionRaw)

  useEffect(() => {
    dispatch(resetSupportState())
  }, [dispatch])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }
      )
      gsap.fromTo(
        '.hero-form-card',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!success) return
    setFormData(EMPTY_FORM)
    setValidationError(null)
    setShowSuccessBanner(true)
    dispatch(resetSupportState())
    const timer = window.setTimeout(() => setShowSuccessBanner(false), 8000)
    return () => window.clearTimeout(timer)
  }, [success, dispatch])

  const highlights = course.highlights?.filter(Boolean) || []
  const categoryLine = [course.category?.name, course.level?.[0]].filter(Boolean).join(' / ')
  const enrolled = Number(course.enrolledStudentsCount) || 0

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationError) setValidationError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.replace(/\D/g, '')
    const reason = formData.reason.trim()

    if (!name || !email || !phone || !reason) {
      setValidationError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email address.')
      return
    }
    if (phone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.')
      return
    }

    setValidationError(null)
    dispatch(
      submitContactQuery({
        name,
        email,
        phone: `+91 ${phone}`,
        message: `[Course callback: ${courseTitleForQuery}] ${reason}`,
        category: 'course',
      })
    )
  }

  if (
    !displayTitle &&
    !displaySubtitle &&
    !plainDescription &&
    !(descriptionIsHtml && courseDescriptionRaw) &&
    !sectionDescriptionBlocks.length &&
    highlights.length === 0
  ) {
    return null
  }

  const titleWords = displayTitle ? displayTitle.split(/\s+/).filter(Boolean) : []
  const displayError = validationError || error

  return (
    <section
      ref={heroRef}
      className="max-w-7xl mx-auto mb-16 md:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
    >
      {/* Course copy */}
      <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
        <header className="space-y-3 md:space-y-4">
          {categoryLine && (
            <span className="hero-reveal block font-jetbrains text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
              {categoryLine}
            </span>
          )}
          {titleWords.length > 0 && (
            <h1 className="hero-reveal font-newsreader text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-light text-normal max-w-3xl break-words">
              {titleWords.map((word, i) => (
                <React.Fragment key={`${word}-${i}`}>
                  {i === titleWords.length - 1 ? (
                    <span className="text-accent italic">{word}</span>
                  ) : (
                    <span>{word} </span>
                  )}
                </React.Fragment>
              ))}
            </h1>
          )}
          {displaySubtitle && (
            <p className="hero-reveal font-newsreader text-lg md:text-xl text-description font-light leading-snug max-w-2xl">
              {displaySubtitle}
            </p>
          )}
          <div className="hero-reveal h-px w-16 md:w-24 bg-accent/30" aria-hidden />
        </header>

        {sectionDescriptionBlocks.length > 0 && (
          <div className="hero-reveal space-y-4 max-w-3xl">
            {sectionDescriptionBlocks.map((para, i) => (
              <p
                key={i}
                className="font-montserrat text-[15px] md:text-base text-description leading-[1.75] break-words"
              >
                {para}
              </p>
            ))}
          </div>
        )}

        {sectionDescriptionBlocks.length === 0 && descriptionIsHtml && courseDescriptionRaw && (
          <div
            className="hero-reveal course-detail-prose break-words"
            dangerouslySetInnerHTML={{ __html: courseDescriptionRaw }}
          />
        )}

        {sectionDescriptionBlocks.length === 0 && !descriptionIsHtml && plainDescription && (
          <p className="hero-reveal font-montserrat text-[15px] md:text-base text-description max-w-3xl leading-[1.75] break-words whitespace-pre-line">
            {plainDescription}
          </p>
        )}

        {highlights.length > 0 && (
          <ul className="hero-reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
            {highlights.map((check, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-accent/35 flex items-center justify-center shrink-0 text-accent">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-montserrat text-sm text-description leading-snug">{check}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="hero-reveal flex flex-wrap items-center gap-3 md:gap-4 pt-2">
          <button
            type="button"
            onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
            className={`${BTN} bg-accent text-dark hover:brightness-105 active:scale-[0.98] shadow-accent-soft`}
          >
            {t('seePricing')}
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('curriculum-section')?.scrollIntoView({ behavior: 'smooth' })}
            className={`${BTN} border border-card-border bg-white/80 text-normal hover:border-accent/40`}
          >
            View curriculum
          </button>
        </div>
      </div>

      {/* Inquiry card — matches pricing / landing cards */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="hero-form-card rounded-2xl border border-card-border bg-white p-6 md:p-8 shadow-card">
          <div className="space-y-2 mb-6">
            <h3 className="font-newsreader italic text-2xl md:text-3xl text-normal font-light leading-tight">
              Ready to <span className="text-accent">transform?</span>
            </h3>
            <p className="font-jetbrains text-[9px] text-description/80 tracking-[0.25em] uppercase">
              {enrolled > 0 ? `Join ${enrolled}+ students today` : 'Request a callback from our team'}
            </p>
          </div>

          {showSuccessBanner && (
            <div
              className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center"
              role="status"
            >
              <p className="font-montserrat text-sm text-emerald-800">
                Thanks! Our team will call you soon.
              </p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <label className="block space-y-1.5">
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-description/90 font-semibold">
                {t('fullName')}
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-card-border bg-[#FFF9F3]/50 px-4 py-3 font-montserrat text-sm text-normal placeholder:text-description/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-colors"
                placeholder="Your name"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-description/90 font-semibold">
                {t('emailAddress')}
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-card-border bg-[#FFF9F3]/50 px-4 py-3 font-montserrat text-sm text-normal placeholder:text-description/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-colors"
                placeholder="you@example.com"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-description/90 font-semibold">
                {t('phoneNumber')}
              </span>
              <div className="flex rounded-xl border border-card-border bg-[#FFF9F3]/50 overflow-hidden focus-within:border-accent/50 focus-within:ring-2 focus-within:ring-accent/15 transition-colors">
                <span className="flex items-center px-3 font-jetbrains text-xs text-accent font-bold border-r border-card-border bg-white/80">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  autoComplete="tel-national"
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-4 py-3 font-montserrat text-sm text-normal placeholder:text-description/50 focus:outline-none bg-transparent"
                  placeholder="10-digit mobile"
                />
              </div>
            </label>
            <label className="block space-y-1.5">
              <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-description/90 font-semibold">
                Why do you want to join?
              </span>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full rounded-xl border border-card-border bg-[#FFF9F3]/50 px-4 py-3 font-montserrat text-sm text-normal placeholder:text-description/50 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/15 transition-colors resize-none"
                placeholder="Tell us briefly…"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className={`${BTN} w-full bg-accent text-dark hover:brightness-105 active:scale-[0.98] shadow-accent-soft tracking-[0.3em] disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {submitting ? 'Requesting…' : 'Request callback'}
            </button>

            {displayError && (
              <p className="font-jetbrains text-[10px] text-red-600 uppercase tracking-widest text-center">
                {displayError}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default CourseHeroDetail