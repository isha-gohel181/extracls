import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const FOCUS_KEYS = [
  { title: 'focus01Title', desc: 'focus01Desc' },
  { title: 'focus02Title', desc: 'focus02Desc' },
  { title: 'focus03Title', desc: 'focus03Desc' },
  { title: 'focus04Title', desc: 'focus04Desc' },
  { title: 'focus05Title', desc: 'focus05Desc' },
  { title: 'focus06Title', desc: 'focus06Desc' },
]

const WhyPearlsSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()

  const features = FOCUS_KEYS.map((keys) => ({
    title: t(keys.title),
    desc: t(keys.desc),
  }))

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-brown py-12 md:py-16 px-4 md:px-8 lg:px-12 border-y border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b]/40 via-transparent to-accent/10 pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="max-w-3xl mb-8 md:mb-10 space-y-3">
          <span data-reveal className="font-jetbrains text-[10px] text-accent tracking-[0.5em] uppercase font-bold">
            {t('whyPearlsEyebrow')}
          </span>
          <h2
            data-reveal
            className="font-newsreader text-2xl sm:text-3xl md:text-4xl text-white leading-[1.12] font-light tracking-tight"
          >
            {t('whyPearlsTitle')}
          </h2>
          <p data-reveal className="font-montserrat text-sm md:text-base text-white/75 max-w-2xl">
            {t('whyPearlsSub')}
          </p>
        </header>

        <div className="border-t border-white/15">
          {features.map((feature, i) => {
            const num = String(i + 1).padStart(2, '0')

            return (
              <article
                key={feature.title}
                data-reveal
                className="group border-b border-white/15 py-5 md:py-6 px-2 md:px-3 -mx-2 md:-mx-3 rounded-lg transition-colors duration-300 hover:bg-white/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 items-start md:items-center">
                  <div className="md:col-span-2 flex md:block items-baseline gap-4">
                    <p
                      className="font-newsreader text-3xl md:text-5xl leading-none text-[#F5E6D3]/35 tabular-nums select-none shrink-0"
                      aria-hidden
                    >
                      {num}
                    </p>
                    <h3 className="md:hidden font-newsreader text-lg text-white font-light leading-snug">
                      {feature.title}
                    </h3>
                  </div>

                  <h3 className="hidden md:block md:col-span-4 font-newsreader text-lg md:text-xl text-white font-light leading-snug">
                    {feature.title}
                  </h3>

                  <p className="md:col-span-6 font-montserrat text-sm text-white/70 leading-snug md:pl-2 lg:pl-6">
                    {feature.desc}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyPearlsSection