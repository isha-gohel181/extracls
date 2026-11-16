import React from 'react'
import { Link } from 'react-router-dom'
import { LANDING_IMAGES } from '../constants/landingImages'
import { APP_DISPLAY_NAME, APP_TAGLINE, MISSION_STATEMENT } from '../constants/brand'
import { useLanguage } from '../context/LanguageContext'
import { handleLandingImageError } from '../utils/landingImageFallback'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const FOCUS_ITEMS = [
  {
    titleKey: 'focus01Title',
    descKey: 'focus01Desc',
    icon: (
      <path
        d="M12 6.5v11M8.5 10h7M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
        strokeLinecap="round"
      />
    ),
  },
  {
    titleKey: 'focus02Title',
    descKey: 'focus02Desc',
    icon: (
      <path
        d="M15 10l4.5 2.5v5L15 20l-4.5-2.5M9 10L4.5 12.5v5L9 20l4.5-2.5M9 10V4.5L13.5 2 18 4.5V10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    titleKey: 'focus03Title',
    descKey: 'focus03Desc',
    icon: (
      <>
        <path d="M8 18h8M9 6h6v8H9z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 14v4" strokeLinecap="round" />
      </>
    ),
  },
]

const LandingAboutSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()

  const paragraphs = [t('aboutLandingP1'), t('aboutLandingP2'), t('aboutLandingP3')].filter(Boolean)
  const [lead, ...rest] = paragraphs

  const title = t('aboutLandingTitle')
  const titleParts = title.split(/\s*[—–]\s*/)
  const titleLine1 = titleParts[0]?.trim() || title
  const titleLine2 = titleParts[1]?.trim() || ''

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#E2EAF3] bg-[#FAFCFF] py-20 md:py-28 lg:py-32 px-4 md:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#55B8F5]/12 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#142B5C]/6 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute right-[8%] top-[12%] font-newsreader text-[clamp(5rem,14vw,11rem)] font-light leading-none text-[#142B5C]/[0.04] select-none"
        aria-hidden
      >
        {APP_DISPLAY_NAME}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-16 items-center">
          {/* Visual column */}
          <div className="lg:col-span-5 order-2 lg:order-1" data-reveal>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none pt-8 lg:pt-4 pb-6">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#55B8F5]/20 via-[#E5F2FF]/40 to-[#142B5C]/10 blur-2xl opacity-80" aria-hidden />

              <div className="relative rounded-[1.85rem] overflow-hidden border-2 border-white shadow-2xl shadow-[#142B5C]/12 aspect-[4/5] group">
                <img
                  src={LANDING_IMAGES.trainingWorkshop}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                  onError={handleLandingImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142B5C]/50 via-[#142B5C]/5 to-transparent" />
              </div>

              <div className="absolute -top-2 -right-2 sm:right-4 lg:-right-6 w-[42%] min-w-[120px] max-w-[180px] rounded-2xl overflow-hidden border-4 border-white shadow-xl aspect-[4/5] rotate-3 hover:rotate-0 transition-transform duration-500 hidden sm:block">
                <img
                  src={LANDING_IMAGES.trainingSeminar}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleLandingImageError}
                />
              </div>

              <div className="absolute -bottom-2 left-2 right-2 sm:left-6 sm:right-auto sm:max-w-[18rem] rounded-2xl border border-white/90 bg-white/95 backdrop-blur-md p-5 shadow-xl shadow-[#142B5C]/10">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#55B8F5]/15 text-[#1a5f9e] font-jetbrains text-xs font-bold">
                    ★
                  </span>
                  <div>
                    <p className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-[#3d5a80] font-semibold mb-1">
                      {t('aboutLandingMissionLabel')}
                    </p>
                    <p className="font-newsreader italic text-base sm:text-lg text-[#142B5C] leading-snug text-balance">
                      {MISSION_STATEMENT}
                    </p>
                    <p className="mt-2 font-montserrat text-xs text-[#64748b]">{APP_TAGLINE}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-[2rem] border border-[#E2EAF3] bg-gradient-to-br from-white via-white to-[#F0F7FF]/90 p-8 md:p-10 lg:p-11 shadow-lg shadow-[#142B5C]/5">
              <div data-reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-12 bg-[#142B5C]/25 shrink-0" aria-hidden />
                  <span className="font-jetbrains text-xs sm:text-[13px] text-[#3d5a80] tracking-[0.2em] uppercase font-medium">
                    {t('aboutLandingEyebrow')}
                  </span>
                </div>
                <h2 className="text-balance">
                  <span className="block font-newsreader text-[clamp(2.1rem,4.5vw,3.5rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#142B5C]">
                    {titleLine2 ? `${titleLine1}—` : titleLine1}
                  </span>
                  {titleLine2 ? (
                    <span className="mt-1 block font-newsreader italic text-[clamp(2.1rem,4.5vw,3.5rem)] font-light leading-[1.06] text-[#1a5f9e]">
                      {titleLine2}
                    </span>
                  ) : null}
                </h2>
              </div>

              {lead ? (
                <p
                  data-reveal
                  className="mt-7 font-montserrat text-lg sm:text-xl text-[#334155] leading-[1.65]"
                >
                  {lead}
                </p>
              ) : null}

              {rest.length > 0 ? (
                <div
                  data-reveal
                  className="mt-5 pl-5 border-l-2 border-[#55B8F5]/50 space-y-3"
                >
                  {rest.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="font-montserrat text-base text-[#475569] leading-[1.7]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : null}

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5" data-reveal>
                {FOCUS_ITEMS.map(({ titleKey, descKey, icon }, index) => (
                  <li
                    key={titleKey}
                    className="group relative overflow-hidden rounded-2xl border border-[#E2EAF3] bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md hover:border-[#55B8F5]/35"
                  >
                    <span
                      className="pointer-events-none absolute -right-2 -top-3 font-newsreader text-5xl font-light text-[#55B8F5]/10"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F7FF] text-[#1a5f9e] ring-1 ring-[#E2EAF3]">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        {icon}
                      </svg>
                    </span>
                    <p className="font-montserrat text-[15px] font-semibold text-[#142B5C] leading-snug">
                      {t(titleKey)}
                    </p>
                    <p className="mt-1.5 font-montserrat text-xs sm:text-[13px] text-[#64748b] leading-relaxed line-clamp-3">
                      {t(descKey)}
                    </p>
                  </li>
                ))}
              </ul>

              <div data-reveal className="mt-9 flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center min-h-[52px] px-9 py-3.5 rounded-2xl bg-[#142B5C] text-white font-montserrat text-[15px] font-semibold shadow-lg shadow-[#142B5C]/20 hover:bg-[#1a3568] transition-colors duration-200 active:scale-[0.98]"
                >
                  {t('browseCourses')}
                </Link>
                <Link
                  to="/about-us"
                  className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-9 py-3.5 rounded-2xl border-2 border-[#CBD8E8] bg-white/80 text-[#142B5C] font-montserrat text-[15px] font-semibold hover:border-[#55B8F5]/60 hover:text-[#1a5f9e] transition-colors duration-200 active:scale-[0.98]"
                >
                  {t('aboutLandingReadMore')}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingAboutSection