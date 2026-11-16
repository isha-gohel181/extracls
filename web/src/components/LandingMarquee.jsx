import React, { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Star = () => (
  <span className="text-accent mx-5 md:mx-8 shrink-0" aria-hidden>
    ✦
  </span>
)

const LandingMarquee = ({ embedded = false }) => {
  const { t } = useLanguage()

  const phrases = useMemo(
    () =>
      [
        t('marqueePhrase1'),
        t('marqueePhrase2'),
        t('marqueePhrase3'),
        t('marqueePhrase4'),
        t('marqueePhrase5'),
        t('marqueePhrase6'),
      ].filter(Boolean),
    [t]
  )

  const trackItems = useMemo(() => [...phrases, ...phrases], [phrases])

  return (
    <div
      className={`landing-marquee-root relative w-full overflow-hidden bg-brand-brown py-3.5 md:py-4 ${
        embedded
          ? 'rounded-2xl border border-white/10 shadow-[0_12px_40px_-16px_rgba(20,43,92,0.35)]'
          : 'border-y border-white/10'
      }`}
      aria-label={t('marqueeAriaLabel')}
    >
      <div className="landing-marquee-track flex items-center whitespace-nowrap will-change-transform">
        {trackItems.map((phrase, i) => (
          <React.Fragment key={`${phrase}-${i}`}>
            <span className="font-jetbrains text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-white/95 font-semibold px-1">
              {phrase}
            </span>
            <Star />
          </React.Fragment>
        ))}
      </div>

      <div className="landing-marquee-static hidden flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-1 max-w-4xl mx-auto text-center">
        {phrases.map((phrase) => (
          <span
            key={phrase}
            className="font-jetbrains text-[10px] uppercase tracking-[0.22em] text-white/90 font-semibold after:content-['✦'] after:ml-3 after:text-accent last:after:content-none"
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  )
}

export default LandingMarquee