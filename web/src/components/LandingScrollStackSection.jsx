import React from 'react'
import { LANDING_IMAGES } from '../constants/landingImages'
import { useLanguage } from '../context/LanguageContext'
import { handleLandingImageError } from '../utils/landingImageFallback'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const CARDS = [
  {
    id: '01',
    image: LANDING_IMAGES.trainingSeminar,
    titleAccentKey: 'stack01TitleAccent',
    titleRestKey: 'stack01TitleRest',
    descKey: 'stack01Desc',
  },
  {
    id: '02',
    image: LANDING_IMAGES.formatRecorded,
    titleAccentKey: 'stack02TitleAccent',
    titleRestKey: 'stack02TitleRest',
    descKey: 'stack02Desc',
  },
  {
    id: '03',
    image: LANDING_IMAGES.trainingWorkshop,
    titleAccentKey: 'stack03TitleAccent',
    titleRestKey: 'stack03TitleRest',
    descKey: 'stack03Desc',
  },
  {
    id: '04',
    image: LANDING_IMAGES.trainingMentor,
    titleAccentKey: 'stack04TitleAccent',
    titleRestKey: 'stack04TitleRest',
    descKey: 'stack04Desc',
  },
]

const StackCardContent = ({ card, t, index, total }) => {
  const num = card.id
  const flip = index % 2 === 1

  return (
    <article
      className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/25 bg-accent ring-1 ring-white/20 shadow-[0_-4px_24px_rgba(20,43,92,0.12),0_16px_36px_rgba(20,43,92,0.18)]"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl"
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3 border-b border-white/20 px-4 py-2.5 sm:px-6 sm:py-3.5 md:px-10 md:py-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-3 py-1 sm:px-3.5 sm:py-1.5 font-jetbrains text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          {t('stackSectionEyebrow')}
        </span>
        <span className="font-jetbrains text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-white/85">
          {num} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div
          className={`space-y-2.5 sm:space-y-4 md:space-y-6 order-2 ${
            flip ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <p
            className="font-newsreader text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none font-light text-white/25"
            aria-hidden
          >
            {num}
          </p>
          <h3 className="font-newsreader text-xl sm:text-2xl md:text-3xl lg:text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-tight -mt-1 sm:-mt-2 md:-mt-3 text-balance">
            <span className="italic text-white">{t(card.titleAccentKey)}</span>{' '}
            <span className="text-[#142B5C]">{t(card.titleRestKey)}</span>
          </h3>
          <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-md">
            {t(card.descKey)}
          </p>
        </div>

        <div className={`order-1 ${flip ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="group relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] max-h-[200px] sm:max-h-[260px] lg:max-h-none overflow-hidden rounded-xl sm:rounded-2xl border border-white/80 sm:border-2 sm:border-white bg-[#E5F2FF]">
            <img
              src={card.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              loading="lazy"
              decoding="async"
              onError={handleLandingImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142B5C]/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </article>
  )
}

const StackCard = ({ card, t, index, total }) => {
  const inner = <StackCardContent card={card} t={t} index={index} total={total} />

  return (
    <div
      className="sticky flex items-start justify-center bg-transparent px-3 sm:px-6 md:px-8 lg:px-12 h-[min(82vh,680px)] min-h-[460px] sm:min-h-[500px] md:h-[min(76vh,720px)]"
      style={{
        top: `calc(var(--stack-offset-base, 4.25rem) + var(--stack-step, 12px) * ${index})`,
        zIndex: index + 1,
      }}
    >
      {inner}
    </div>
  )
}

const LandingScrollStackSection = () => {
  const { t } = useLanguage()
  const headerRef = useLandingScrollReveal()
  const total = CARDS.length

  const title = t('stackSectionTitle')
  const titleParts = title.split(/,\s*/)
  const titleLine1 = titleParts[0]?.trim() || title
  const titleLine2 = titleParts.slice(1).join(', ').trim()

  return (
    <section
      ref={headerRef}
      className="relative isolate z-0 overflow-visible border-b border-[#E2EAF3] bg-[#FAFCFF]"
    >
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#55B8F5]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-[#142B5C]/5 blur-3xl" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#142B5C]/25 shrink-0" aria-hidden />
              <span className="font-jetbrains text-xs sm:text-[13px] text-[#3d5a80] tracking-[0.2em] uppercase font-medium">
                {t('stackSectionEyebrow')}
              </span>
            </div>
            <h2 data-reveal className="text-balance">
              <span className="block font-newsreader text-[clamp(2rem,4.2vw,3.35rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#142B5C]">
                {titleLine1}
                {titleLine2 ? ',' : ''}
              </span>
              {titleLine2 ? (
                <span className="mt-1 block font-newsreader italic text-[clamp(2rem,4.2vw,3.35rem)] font-light leading-[1.08] text-[#1a5f9e]">
                  {titleLine2}
                </span>
              ) : null}
            </h2>
          </div>
          <p
            data-reveal
            className="hidden lg:flex items-center gap-2 font-montserrat text-sm text-[#64748b] pb-1"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E2EAF3] bg-white shadow-sm">
              <svg className="h-4 w-4 text-[#1a5f9e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {t('stackSectionScrollHint')}
          </p>
        </div>
      </div>

      {/* Unified Responsive Sticky Scroll Stack for Mobile, Tablet & Desktop */}
      <div className="relative isolate pb-12 sm:pb-16 md:pb-20 [--stack-offset-base:4.25rem] md:[--stack-offset-base:4.75rem] [--stack-step:12px] md:[--stack-step:14px]">
        {CARDS.map((card, index) => (
          <StackCard key={card.id} card={card} index={index} total={total} t={t} />
        ))}
      </div>
    </section>
  )
}

export default LandingScrollStackSection
