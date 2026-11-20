import React, { useCallback, useEffect, useState } from 'react'
import { fetchLandingCarousel, resolveFreeThumbnail } from '../api/freeContent.js'
import { getVideoEmbedUrl, getYouTubeThumbnail } from '../utils/videoEmbed.js'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const FALLBACK_VIDEOS = [
  {
    _id: 'fallback-1',
    title: 'Phonics fun for young readers',
    description: 'Letter sounds and joyful reading for preschool learners.',
    videoUrl: 'https://www.youtube.com/watch?v=BELlZKpi1Zs',
  },
  {
    _id: 'fallback-2',
    title: 'Counting with everyday objects',
    description: 'Build number sense with simple home activities.',
    videoUrl: 'https://www.youtube.com/watch?v=DQdB9Ggyzi8',
  },
  {
    _id: 'fallback-3',
    title: 'Creative art and colors',
    description: 'Easy art ideas for curiosity and fine motor skills.',
    videoUrl: 'https://www.youtube.com/watch?v=OK_QO-uDFeE',
  },
]

const STAGE_SHELL =
  'rounded-[1.35rem] border border-[#E2EAF3] bg-white shadow-[0_4px_30px_rgba(24,120,192,0.12)] overflow-hidden'

function thumbFor(item) {
  return resolveFreeThumbnail(item) || getYouTubeThumbnail(item?.videoUrl) || ''
}

function StageSkeleton() {
  return (
    <div className={`${STAGE_SHELL} w-full max-w-5xl xl:max-w-6xl mx-auto animate-pulse`}>
      <div className="aspect-video bg-[#E5F2FF]/80" />
    </div>
  )
}

function MainVideoStage({ item, onPlay, freeClassLabel, stageKey }) {
  if (!item) return null
  const src = thumbFor(item)
  return (
    <button
      type="button"
      onClick={() => onPlay(item)}
      className={`group relative w-full text-left ${STAGE_SHELL} transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(24,120,192,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50`}
    >
      <div
        key={stageKey}
        className="relative aspect-video w-full overflow-hidden bg-[#E5F2FF] motion-reduce:transition-none"
      >
        {src ? (
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E5F2FF] to-slate-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-slate-900/10" />

        <span className="absolute left-4 top-4 z-10 rounded-lg bg-accent px-2.5 py-1 font-jetbrains text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
          {freeClassLabel}
        </span>

        <span className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute h-20 w-20 rounded-full bg-accent/25 motion-safe:animate-ping motion-reduce:hidden" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 pt-16 md:p-6 md:pt-20">
          <p className="font-montserrat text-base font-semibold text-white md:text-lg line-clamp-2">
            {item.title}
          </p>
          <p className="mt-1 font-jetbrains text-[10px] uppercase tracking-wider text-white/80">
            Tap to watch
          </p>
        </div>
      </div>
    </button>
  )
}

function SideVideoPeek({ item, onSelect, align }) {
  if (!item) return <div className="hidden md:block" aria-hidden />
  const src = thumbFor(item)
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group hidden md:block w-full text-left ${STAGE_SHELL} transition-all duration-300 hover:border-accent/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
        align === 'left' ? 'origin-right md:scale-[0.92]' : 'origin-left md:scale-[0.92]'
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-[#E5F2FF]">
        {src ? (
          <img src={src} alt="" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" loading="lazy" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E5F2FF] to-slate-200" />
        )}
        <div className="absolute inset-0 bg-slate-900/30" />
        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-3">
          <span className="block font-montserrat text-xs font-medium text-white line-clamp-2">{item.title}</span>
        </span>
      </div>
    </button>
  )
}

export default function LandingFreeResourcesCarousel() {
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  useLandingScrollReveal()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await fetchLandingCarousel()
        if (!cancelled) setItems(data.length ? data : FALLBACK_VIDEOS)
      } catch {
        if (!cancelled) setItems(FALLBACK_VIDEOS)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const count = items.length
  const active = items[index] || null
  const stageKey = active?._id ?? index

  const go = useCallback(
    (dir) => {
      if (!count) return
      setIndex((i) => (i + dir + count) % count)
    },
    [count]
  )

  const openPlayer = useCallback((item) => {
    const embed = getVideoEmbedUrl(item?.videoUrl)
    if (embed) setPlayer({ embed, title: item.title })
    else if (item?.fileUrl) window.open(item.fileUrl, '_blank', 'noopener,noreferrer')
  }, [])

  const prev = count ? items[(index - 1 + count) % count] : null
  const next = count ? items[(index + 1) % count] : null

  if (!loading && count === 0) return null

  const freeClassLabel = t('landingFreeResourcesEyebrow') || 'Free class'

  return (
    <section className="border-y border-slate-200/80 bg-gradient-to-b from-[#E5F2FF]/40 via-white to-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="mb-10 max-w-2xl">
          <p className="font-jetbrains text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            {t('landingFreeResourcesEyebrow')}
          </p>
          <h2 className="font-newsreader text-3xl font-light text-slate-900 md:text-4xl lg:text-[2.75rem] leading-tight">
            {t('landingFreeResourcesTitle')}
          </h2>
          <p className="mt-3 text-sm text-slate-600 md:text-base">{t('landingFreeResourcesSub')}</p>
        </div>

        {loading ? (
          <StageSkeleton />
        ) : (
          <div className="space-y-6">
            <div className="relative max-w-7xl mx-auto px-0 md:px-12 lg:px-14">
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-xl text-slate-800 shadow-md transition hover:border-accent hover:text-accent md:flex"
                aria-label={t('landingFreeResourcesPrev')}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-xl text-slate-800 shadow-md transition hover:border-accent hover:text-accent md:flex"
                aria-label={t('landingFreeResourcesNext')}
              >
                ›
              </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
              <div className="md:col-span-3 order-2 md:order-1">
                <SideVideoPeek item={prev} onSelect={() => go(-1)} align="left" />
              </div>

              <div className="md:col-span-6 order-1 md:order-2 relative">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 z-20 flex md:hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-[#E2EAF3] bg-white/95 text-lg shadow-md"
                  aria-label={t('landingFreeResourcesPrev')}
                >
                  ‹
                </button>
                <MainVideoStage
                  item={active}
                  onPlay={openPlayer}
                  freeClassLabel={freeClassLabel}
                  stageKey={stageKey}
                />
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 z-20 flex md:hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-[#E2EAF3] bg-white/95 text-lg shadow-md"
                  aria-label={t('landingFreeResourcesNext')}
                >
                  ›
                </button>
              </div>

              <div className="md:col-span-3 order-3">
                <SideVideoPeek item={next} onSelect={() => go(1)} align="right" />
              </div>
            </div>
            </div>

            {active?.description && (
              <p className="mx-auto max-w-2xl text-center text-sm text-slate-600 md:text-base">
                {active.description}
              </p>
            )}

            {count > 1 && (
              <div className="flex justify-center gap-2 md:hidden">
                {items.map((item, i) => (
                  <button
                    key={`dot-${item._id || i}`}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-accent' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Video ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {player && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={player.title}
        >
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setPlayer(null)}
              className="absolute -top-10 right-0 font-jetbrains text-xs uppercase tracking-wider text-white"
            >
              Close
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border-2 border-white/20 bg-black">
              <iframe
                title={player.title}
                src={player.embed}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}