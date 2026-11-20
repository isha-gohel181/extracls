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
      className="bg-[#F0F7FF] border-t border-border/60 px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 pt-16 md:pt-20"
      aria-labelledby={headingId}
    >
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="space-y-5 md:space-y-6 max-w-xl">
          <div data-reveal className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-accent" aria-hidden />
            <span className="font-jetbrains text-xs text-accent tracking-[0.3em] uppercase font-bold">
              {t('landingCtaEyebrow')}
            </span>
          </div>

          <h2
            id={headingId}
            data-reveal
            className="font-newsreader text-3xl md:text-4xl lg:text-[2.65rem] text-normal font-light leading-tight tracking-tight"
          >
            {t('landingCtaTitle')}
          </h2>

          <p
            data-reveal
            className="font-montserrat text-sm md:text-base text-description leading-relaxed max-w-lg"
          >
            {t('landingCtaBody')}
          </p>

          <p
            data-reveal
            className="font-montserrat text-sm text-description/80"
          >
            {t('landingCtaFootnote')}
          </p>
        </div>

        <div
          data-reveal
          className="mt-8 lg:mt-0 flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap items-stretch sm:items-center lg:items-end xl:items-center gap-3 md:gap-4 shrink-0"
        >
          <Link
            to="/courses"
            className="group inline-flex w-full sm:w-auto lg:w-full xl:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-jetbrains text-[11px] uppercase tracking-[0.16em] font-bold shadow-md shadow-accent/25 hover:bg-[#3da8e8] transition-colors duration-200"
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
            className="inline-flex w-full sm:w-auto lg:w-full xl:w-auto items-center justify-center px-8 py-3.5 rounded-xl border border-border bg-white text-normal font-jetbrains text-[11px] uppercase tracking-[0.16em] font-semibold hover:border-accent/50 hover:text-accent transition-colors duration-200"
          >
            {t('getInTouch')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LandingContactCTA