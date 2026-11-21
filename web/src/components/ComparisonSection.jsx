import { getApiBase } from '../utils/apiBase.js'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import comparisonImg from '../assets/images/comparision_img.webp'
import sanitizeDisplay from '../utils/textSanitize'
import LogoMarquee from './LogoMarquee'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const ComparisonSection = ({ course, section }) => {
  const containerRef = useRef(null)

  // Use section data if provided, otherwise fallback to course data
  const targetSection = section || course?.comparisonSection
  const sanitize = (t) => sanitizeDisplay(t)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.solo-heading',
        { opacity: 0, y: 4 },
        {
          opacity: 1, y: 0, duration: 0.3, ease: 'power3.out', stagger: 0.02,
          scrollTrigger: { trigger: '.solo-heading', start: 'top 96%' }
        }
      )
      gsap.fromTo('.solo-image-wrap',
        { opacity: 0, scale: 0.99, y: 4 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.solo-image-wrap', start: 'top 98%' }
        }
      )

      gsap.utils.toArray('.comparison-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, x: i % 2 === 0 ? -5 : 5 },
          {
            opacity: 1, x: 0, duration: 0.25, ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 96%',
            }
          }
        )
      })

      gsap.fromTo('.feature-card',
        { opacity: 0, y: 4, scale: 0.99 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out', stagger: 0.02,
          scrollTrigger: {
            trigger: '.feature-grid',
            start: 'top 96%',
          }
        }
      )

      gsap.fromTo('.cta-reveal',
        { opacity: 0, y: 4 },
        {
          opacity: 1, y: 0, duration: 0.3, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-reveal',
            start: 'top 98%',
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Use dynamic comparison points strictly from API
  const leftPoints = targetSection?.leftPoints || []
  const rightPoints = targetSection?.rightPoints || []
  const apiComparison = leftPoints.map((trad, i) => ({
    traditional: trad,
    our: rightPoints[i] || '',
  }))

  const manifestoPointers = targetSection?.content?.blocks?.map(block => 
    sanitizeDisplay(block.data?.text || '').replace(/&nbsp;/g, ' ')
  ).filter(t => t && t.trim() !== '') || []

  const apiFeatures = manifestoPointers.length > 0
    ? manifestoPointers
    : (course?.benefitsSection?.points || [])

  const sectionTitle = targetSection?.title || (course?.title ? `Why Choose ${course.title}` : 'Program Comparison')
  const sectionSubtitle = targetSection?.subtitle || course?.subtitle || ''

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto mb-24 px-4 md:px-0">
      {/* INTRO */}
      <div className="mb-20 text-center space-y-6">
        <div className="space-y-3">
          <h2 className="solo-heading font-newsreader italic text-[clamp(2rem,5.5vw,4.5rem)] text-slate-900 font-extralight leading-tight">
            {sanitize(sectionTitle)}
          </h2>
          {sectionSubtitle && (
            <p className="solo-heading font-montserrat text-[#1a5f9e] text-xs md:text-sm font-semibold max-w-xl mx-auto leading-relaxed tracking-wider uppercase">
              {sanitizeDisplay(sectionSubtitle)}
            </p>
          )}

          {targetSection?.description?.blocks ? (
            <div className="solo-heading font-montserrat text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed space-y-3 pt-2">
              {targetSection.description.blocks.map((block, bi) => (
                <p key={bi}>{sanitizeDisplay(block.data?.text || '').replace(/&nbsp;/g, ' ')}</p>
              ))}
            </div>
          ) : targetSection?.description && typeof targetSection.description === 'string' ? (
            <div className="solo-heading font-montserrat text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed pt-2">
              {sanitizeDisplay(targetSection.description)}
            </div>
          ) : null}
        </div>

        {/* Course Cover Image (if available) */}
        {course?.coverImage && (
          <div className="solo-image-wrap relative group overflow-hidden max-w-3xl mx-auto shadow-xl rounded-2xl border border-slate-200">
            <img
              src={(() => {
                const img = course.coverImage
                if (!img) return comparisonImg
                if (img.startsWith('http')) return img
                const rawBase = import.meta.env.VITE_IMAGE_URL || getApiBase()
                const baseUrl = rawBase.replace(/\/api\/v1\/?$/, '')
                return `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`
              })()}
              alt={sanitize(course.title)}
              className="w-full aspect-[16/9] object-cover transition-all duration-700 group-hover:scale-[1.01]"
            />
          </div>
        )}
      </div>

      {/* Comparison Rows */}
      {apiComparison.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-8 mb-12 opacity-80">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="font-jetbrains text-[9px] text-slate-400 tracking-[0.3em] uppercase font-bold shrink-0">
              Curriculum Comparison
            </span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-16 mb-8 text-center border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="font-jetbrains text-[10px] text-slate-400 tracking-[0.2em] uppercase font-bold">
                Traditional Methods
              </span>
              <h3 className="font-newsreader italic text-xl md:text-3xl text-slate-700 font-extralight tracking-tight">
                {sanitizeDisplay(targetSection?.leftTitle || 'Standard Approach')}
              </h3>
            </div>
            <div className="space-y-1">
              <span className="font-jetbrains text-[10px] text-[#1a5f9e] tracking-[0.2em] uppercase font-bold">
                EXTRACLS Methodology
              </span>
              <h3 className="font-newsreader italic text-xl md:text-3xl text-[#142B5C] font-normal tracking-tight">
                {sanitizeDisplay(targetSection?.rightTitle || 'Our Interactive Method')}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {apiComparison.map((item, i) => (
              <div key={i} className="comparison-row grid grid-cols-1 md:grid-cols-2 gap-4 py-1 items-center group">
                <div className="flex items-center gap-4 px-4 md:px-6 py-4 bg-red-50/70 border-l-4 border-red-500 rounded-xl shadow-xs transition-all duration-300">
                  <div className="w-7 h-7 rounded-full border border-red-200 flex items-center justify-center shrink-0 bg-red-100">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="4">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="font-montserrat text-xs md:text-sm text-red-700 font-medium leading-relaxed">
                    {sanitizeDisplay(item.traditional)}
                  </p>
                </div>

                <div className="flex items-center gap-4 px-4 md:px-6 py-4 bg-blue-50/70 border-l-4 border-[#55B8F5] rounded-xl shadow-xs transition-all duration-300">
                  <div className="w-7 h-7 rounded-full border border-blue-200 flex items-center justify-center shrink-0 bg-blue-100">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#142B5C" strokeWidth="4">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-montserrat text-xs md:text-sm text-[#142B5C] font-semibold leading-relaxed">
                    {sanitizeDisplay(item.our)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Grid (if points exist) */}
      {apiFeatures.length > 0 && (
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {apiFeatures.map((feat, i) => (
            <div
              key={i}
              className="feature-card border border-slate-200/80 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#55B8F5]/50 relative group transition-all duration-300 h-full flex flex-col justify-start min-h-[120px]"
            >
              <div className="absolute top-3 right-4 select-none pointer-events-none">
                <span className="font-jetbrains text-3xl font-black text-[#55B8F5]/20 group-hover:text-[#55B8F5]/40 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-start gap-3.5 pr-8 relative z-10">
                <div className="w-2.5 h-2.5 bg-[#55B8F5] rounded-full mt-1.5 shrink-0" />
                <span className="font-montserrat text-sm text-slate-800 font-medium tracking-wide leading-relaxed">
                  {feat}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="cta-reveal text-center space-y-6">
        <h4 className="font-newsreader italic text-2xl md:text-3xl text-slate-800 font-light tracking-tight">
          Give your child the advantage of structured, interactive learning.
        </h4>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-[#142B5C] hover:bg-[#1a3568] px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10 font-montserrat text-white text-xs font-bold tracking-[0.2em] uppercase">
              Enroll in {course?.title ? sanitize(course.title) : 'This Program'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection
