import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const LandingContactCTA = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()
  const headingId = 'landing-contact-cta-heading'

  return (
    <section
      ref={sectionRef}
      className="bg-[#F0F7FF] px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 pt-4 md:pt-6"
      aria-labelledby={headingId}
    >
      <div className="max-w-5xl mx-auto">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-brand-brown text-white shadow-xl shadow-brand-brown/25 p-10 md:p-14 text-center"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:11px_11px] opacity-80"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1a3a6b]/50 via-transparent to-accent/15"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-5 md:space-y-6">
            <span
              data-reveal
              className="font-jetbrains text-[10px] md:text-xs text-accent tracking-[0.45em] uppercase font-bold"
            >
              {t('landingCtaEyebrow')}
            </span>

            <h2
              id={headingId}
              data-reveal
              className="font-newsreader text-3xl sm:text-4xl md:text-[2.65rem] text-white leading-[1.15] font-light tracking-tight"
            >
              {t('landingCtaTitle')}
            </h2>

            <p
              data-reveal
              className="font-montserrat text-sm md:text-base text-white/78 leading-relaxed"
            >
              {t('landingCtaBody')}
            </p>

            <div
              data-reveal
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 pt-2 w-full"
            >
              <Link
                to="/courses"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-jetbrains text-[11px] uppercase tracking-[0.16em] font-bold shadow-md shadow-accent/25 hover:bg-[#3da8e8] transition-colors duration-200"
              >
                {t('browseCourses')}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-3.5 rounded-xl border border-dashed border-white/55 bg-transparent text-white font-jetbrains text-[11px] uppercase tracking-[0.16em] font-semibold hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {t('getInTouch')}
              </Link>
            </div>

            <p
              data-reveal
              className="font-montserrat text-xs text-white/55 pt-1"
            >
              {t('landingCtaFootnote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingContactCTA