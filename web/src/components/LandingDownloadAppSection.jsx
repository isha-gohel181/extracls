import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'
import { PLAY_STORE_URL, APP_STORE_URL } from '../constants/brand'

/** Same bounding box so Play + App Store badges read equal on screen */
const BADGE_MEDIA_CLASS =
  'block h-10 w-[7.75rem] sm:h-12 sm:w-[9.25rem] shrink-0'
const BADGE_IMG_CLASS =
  'h-full w-full object-contain object-center transition-opacity group-hover:opacity-90'
const BADGE_LINK_CLASS =
  'group block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

const GOOGLE_PLAY_BADGE = '/store-badges/google-play-badge.svg'
const APP_STORE_BADGE = '/store-badges/app-store-badge.svg'

function StoreBadgeLink({ href, ariaLabel, children }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={BADGE_LINK_CLASS}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      className={`${BADGE_LINK_CLASS} cursor-default`}
      aria-label={ariaLabel}
      aria-disabled="true"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </button>
  )
}

export default function LandingDownloadAppSection() {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 pt-2 md:pt-4"
      aria-labelledby="landing-app-download-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a5f9e] via-[#1878c0] to-[#55B8F5] text-white shadow-xl shadow-accent/20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(135deg,transparent_40%,white_40%,white_42%,transparent_42%,transparent_58%,white_58%,white_60%,transparent_60%)] bg-[length:48px_48px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 p-8 md:p-12 lg:p-14 max-w-2xl">
            <p className="font-jetbrains text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-white/75 mb-3">
              {t('landingAppDownloadEyebrow')}
            </p>
            <h2
              id="landing-app-download-heading"
              className="font-newsreader text-3xl md:text-4xl lg:text-[2.5rem] font-light leading-tight text-white"
            >
              {t('landingAppDownloadTitle')}
            </h2>
            <p className="mt-4 font-montserrat text-sm md:text-base text-white/85 leading-relaxed">
              {t('landingAppDownloadSub')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StoreBadgeLink href={PLAY_STORE_URL || undefined} ariaLabel={t('landingAppDownloadPlay')}>
                <span className={BADGE_MEDIA_CLASS}>
                  <img
                    src={GOOGLE_PLAY_BADGE}
                    alt=""
                    className={BADGE_IMG_CLASS}
                    width={155}
                    height={60}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </StoreBadgeLink>
              <StoreBadgeLink href={APP_STORE_URL || undefined} ariaLabel={t('landingAppDownloadApple')}>
                <span className={BADGE_MEDIA_CLASS}>
                  <img
                    src={APP_STORE_BADGE}
                    alt=""
                    className={BADGE_IMG_CLASS}
                    width={155}
                    height={60}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </StoreBadgeLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}