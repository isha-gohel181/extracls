import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import { LANDING_IMAGES } from '../constants/landingImages'
import { handleLandingImageError } from '../utils/landingImageFallback'

const HERO_BG = LANDING_IMAGES.hero

const Hero = () => {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.1,
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const trustItems = [t('heroTrust1'), t('heroTrust2'), t('heroTrust3')]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(85vh,780px)] lg:min-h-[700px] flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#E8EEF4]" aria-hidden>
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 h-full w-full min-h-full min-w-full object-cover object-[62%_42%] sm:object-[70%_40%]"
          loading="eager"
          fetchPriority="high"
          onError={handleLandingImageError}
        />
        {/* Left readability scrim — photo stays clear on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7FF] from-[0%] via-[#F0F7FF]/88 via-[42%] to-transparent to-[68%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F7FF]/40 via-transparent to-white/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="hero-anim flex items-center gap-3 mb-7">
            <span className="h-px w-12 bg-[#142B5C]/25 shrink-0" aria-hidden />
            <span className="font-jetbrains text-xs sm:text-[13px] text-[#3d5a80] tracking-[0.2em] uppercase font-medium">
              {t('heroEyebrow')}
            </span>
          </div>

          <h1 className="hero-anim mb-7 text-balance">
            <span className="block font-newsreader text-[clamp(2.75rem,6.8vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-[#142B5C]">
              {t('heroTitle')}
            </span>
            <span className="mt-0.5 block font-newsreader italic text-[clamp(2.75rem,6.8vw,5rem)] font-light leading-[1.02] tracking-[-0.02em] text-[#1a5f9e]">
              {t('heroTitleAccent')}
            </span>
          </h1>

          <p className="hero-anim max-w-xl text-lg sm:text-xl font-montserrat text-[#475569] leading-[1.6] mb-10">
            {t('heroSubline')}
          </p>

          <div className="hero-anim flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2.5 min-h-[54px] px-10 py-4 rounded-2xl bg-[#142B5C] text-white font-montserrat text-[15px] sm:text-base font-semibold shadow-lg shadow-[#142B5C]/22 ring-1 ring-[#142B5C]/10 hover:bg-[#1a3568] hover:shadow-xl hover:shadow-[#142B5C]/28 transition-[transform,box-shadow,background-color] duration-200 active:scale-[0.98]"
            >
              {t('browseCourses')}
              <svg
                className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              to="/about-us"
              className="inline-flex items-center justify-center min-h-[54px] px-10 py-4 rounded-2xl border-2 border-[#CBD8E8] bg-white/90 backdrop-blur-sm text-[#142B5C] font-montserrat text-[15px] sm:text-base font-semibold shadow-sm hover:border-[#55B8F5]/70 hover:bg-white hover:text-[#1a5f9e] transition-[transform,border-color,background-color,color] duration-200 active:scale-[0.98]"
            >
              {t('heroSecondaryCta')}
            </Link>
          </div>

          <ul className="hero-anim flex flex-wrap gap-3 sm:gap-3.5">
            {trustItems.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-2.5 font-montserrat text-[15px] sm:text-base font-medium text-[#334155] pl-3 pr-5 py-2.5 sm:py-3 rounded-2xl bg-[#F0F7FF]/95 border border-[#CBD8E8]/90 shadow-sm backdrop-blur-[2px]"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#55B8F5]/15 text-[#1a5f9e]"
                  aria-hidden
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero