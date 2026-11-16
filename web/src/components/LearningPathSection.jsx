import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const LearningPathSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()
  const lineRef = useRef(null)

  const steps = [
    { title: t('pathStep1Title'), desc: t('pathStep1Desc') },
    { title: t('pathStep2Title'), desc: t('pathStep2Desc') },
    { title: t('pathStep3Title'), desc: t('pathStep3Desc') },
    { title: t('pathStep4Title'), desc: t('pathStep4Desc') },
  ]

  useEffect(() => {
    const el = sectionRef.current
    const line = lineRef.current
    if (!el || !line) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              once: true,
            },
          }
        )
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(line, { scaleX: 1 })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F0F7FF]/50 py-20 md:py-28 px-4 md:px-8 lg:px-12 overflow-hidden border-y border-[#E2EAF3]/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span data-reveal className="font-jetbrains text-[10px] text-accent tracking-[0.5em] uppercase font-bold">
            {t('pathEyebrow')}
          </span>
          <h2 data-reveal className="font-newsreader italic text-3xl sm:text-4xl md:text-5xl text-normal font-light">
            {t('pathTitle')}
          </h2>
        </div>

        <div className="relative hidden lg:block mb-6 px-8" aria-hidden>
          <div ref={lineRef} className="h-[2px] w-full bg-accent/25" />
        </div>

        <div className="relative">
          <ol className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-accent/30 shadow-sm flex items-center justify-center mb-4 relative z-10">
                  <span className="font-jetbrains text-lg font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-newsreader italic text-xl text-normal mb-2">{step.title}</h3>
                <p className="font-montserrat text-sm text-description leading-relaxed max-w-xs">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default LearningPathSection