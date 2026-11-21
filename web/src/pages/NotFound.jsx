import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APP_DISPLAY_NAME, APP_TAGLINE } from '../constants/brand'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className="relative w-full flex-1 flex flex-col justify-center items-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFCFF]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#55B8F5]/15 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#142B5C]/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#55B8F5]/12 border border-[#55B8F5]/30 text-[#142B5C] mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF792E] animate-pulse" />
          <span className="font-jetbrains text-[11px] font-bold tracking-[0.2em] uppercase text-[#142B5C]">
            404 Error · Page Not Found
          </span>
        </div>

        {/* 404 Serif Numeral */}
        <div className="relative mb-4 select-none">
          <span className="font-newsreader italic text-[clamp(6rem,16vw,10.5rem)] font-light leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#142B5C] via-[#1a3875] to-[#55B8F5]/70">
            404
          </span>
          <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] font-semibold text-[#64748B]/60">
              {APP_DISPLAY_NAME}
            </span>
          </div>
        </div>

        {/* Heading & Explanation */}
        <h1 className="font-newsreader text-2xl sm:text-4xl lg:text-5xl font-light text-[#142B5C] tracking-tight mb-4 max-w-xl mx-auto">
          We couldn’t find the page you’re looking for
        </h1>
        <p className="font-montserrat text-sm sm:text-base text-[#475569] max-w-lg mx-auto leading-relaxed mb-8">
          The link you followed may have changed, been removed, or was entered with a small typo.
          Don't worry—let's get you back on track with {APP_DISPLAY_NAME}.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#142B5C] hover:bg-[#1a3568] text-white font-montserrat text-sm font-semibold shadow-lg shadow-[#142B5C]/20 transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <Link
            to="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl border border-[#CBD8E8] bg-white hover:border-[#55B8F5] hover:bg-[#F0F7FF] text-[#142B5C] font-montserrat text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <span>Browse Courses</span>
            <svg className="w-4 h-4 text-[#55B8F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-[#64748B] hover:text-[#142B5C] font-montserrat text-sm font-medium transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Footer Tagline Quote */}
        <p className="font-newsreader italic text-xs text-[#64748B]/80 text-center">
          {APP_TAGLINE} · Empowering learning with care and quality.
        </p>
      </div>
    </section>
  )
}

export default NotFound
