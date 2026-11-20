import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SiteBrandLogo from './SiteBrandLogo'
import {
  LOGO_PATH,
  MENTOR_IMAGE_PATH,
  MENTOR_NAME,
  MENTOR_TITLE,
  MENTOR_CREDENTIALS,
  MENTOR_STORY,
  WHATSAPP_URL,
} from '../constants/brand'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const MentorSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()
  const [imgSrc, setImgSrc] = useState(MENTOR_IMAGE_PATH)
  const [imgFailed, setImgFailed] = useState(false)

  const handleImgError = () => {
    if (imgSrc !== LOGO_PATH) {
      setImgSrc(LOGO_PATH)
      return
    }
    setImgFailed(true)
  }

  const sectionTitle = t('meetMentorTitle')
  const titleParts = sectionTitle.split(/\s+at\s+/i)
  const titleLine1 = titleParts[0]?.trim() || sectionTitle
  const titleLine2 = titleParts[1] ? `at ${titleParts[1].trim()}` : ''

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-[#E2EAF3] bg-white py-16 md:py-24 lg:py-28 px-4 md:px-8 lg:px-12 select-none"
    >
      <div className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-[#55B8F5]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#142B5C]/5 blur-3xl" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* Image */}
          <div data-reveal className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[#55B8F5]/12 blur-2xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[1.85rem] border-2 border-white aspect-[4/5] bg-[#E5F2FF] group">
                {!imgFailed ? (
                  <img
                    src={imgSrc}
                    alt={MENTOR_NAME}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    onError={handleImgError}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <SiteBrandLogo size="watermark" imgClassName="opacity-40" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#142B5C]/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 border-t border-white/20 bg-accent/95 p-5 sm:p-6 backdrop-blur-sm">
                  <p className="font-jetbrains text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">
                    {MENTOR_TITLE}
                  </p>
                  <p className="mt-1 font-montserrat text-xl font-semibold text-white">{MENTOR_NAME}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-[2rem] border border-[#E2EAF3] bg-gradient-to-br from-white via-white to-[#F0F7FF]/90 p-8 md:p-10 lg:p-11">
              <div data-reveal>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-12 shrink-0 bg-[#142B5C]/25" aria-hidden />
                  <span className="font-jetbrains text-xs font-medium uppercase tracking-[0.2em] text-[#3d5a80] sm:text-[13px]">
                    {t('meetMentorEyebrow')}
                  </span>
                </div>
                <h2 className="text-balance">
                  <span className="block font-newsreader text-[clamp(2rem,4.2vw,3.35rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#142B5C]">
                    {titleLine1}
                  </span>
                  {titleLine2 ? (
                    <span className="mt-1 block font-newsreader text-[clamp(2rem,4.2vw,3.35rem)] font-light italic leading-[1.08] text-[#1a5f9e]">
                      {titleLine2}
                    </span>
                  ) : null}
                </h2>
                <p className="mt-5 max-w-xl font-montserrat text-base leading-relaxed text-[#475569] md:text-lg">
                  {t('meetMentorSub')}
                </p>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" data-reveal>
                {MENTOR_CREDENTIALS.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 rounded-2xl border border-[#E2EAF3] bg-white px-4 py-3.5"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#55B8F5]/15 text-[#1a5f9e]"
                      aria-hidden
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-montserrat text-sm font-medium leading-snug text-[#334155] sm:text-[15px]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <div data-reveal className="mt-6 space-y-4 border-l-2 border-[#55B8F5]/45 pl-5">
                {MENTOR_STORY.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="max-w-2xl font-montserrat text-base leading-[1.7] text-[#475569]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div data-reveal className="mt-9 flex flex-col flex-wrap gap-4 sm:flex-row">
                <Link
                  to="/courses"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#142B5C] px-9 py-3.5 font-montserrat text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#1a3568] active:scale-[0.98]"
                >
                  {t('browseCourses')}
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hello EXTRACLS, I would like to know more about your courses for children.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-[#CBD8E8] bg-white/90 px-9 py-3.5 font-montserrat text-[15px] font-semibold text-[#142B5C] transition-colors duration-200 hover:border-[#55B8F5]/60 hover:text-[#1a5f9e] active:scale-[0.98]"
                >
                  {t('whatsAppCta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MentorSection