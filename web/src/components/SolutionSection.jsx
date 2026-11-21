import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import sanitizeDisplay from '../utils/textSanitize'

gsap.registerPlugin(ScrollTrigger)

const SolutionSection = ({ course, section }) => {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.sol-title').forEach((title) => {
        gsap.fromTo(title,
          { opacity: 0, y: 6 },
          {
            opacity: 1, y: 0,
            duration: 0.35, ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 95%' }
          }
        )
      })

      gsap.utils.toArray('.sol-desc').forEach((desc) => {
        gsap.fromTo(desc,
          { opacity: 0, y: 4 },
          {
            opacity: 1, y: 0,
            duration: 0.3, ease: 'power3.out',
            scrollTrigger: { trigger: desc, start: 'top 95%' }
          }
        )
      })

      gsap.utils.toArray('.sol-point').forEach((point) => {
        gsap.fromTo(point,
          { opacity: 0, x: -4, scale: 0.99 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: point,
              start: 'top 95%'
            }
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Process EditorJS content for the description text blocks
  const descriptionBlocks = section?.content?.blocks?.map(block => 
    sanitizeDisplay(block.data?.text || '').replace(/&nbsp;/g, ' ')
  ) || []

  const outcomePoints = section?.outcomePoints || []
  const solutionPoints = section?.points || []

  if (!section?.title && outcomePoints.length === 0 && solutionPoints.length === 0) {
    return null
  }

  const titleWords = sanitizeDisplay(section?.title || "Complete Learning Experience").split(' ')

  return (
    <section ref={ref} className="max-w-7xl mx-auto py-16">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#55B8F5]/30 to-transparent mb-12" />

      <div className="grid grid-cols-1 min-[1301px]:grid-cols-[1fr_1.8fr] gap-12 min-[1301px]:gap-20 items-start mb-20 px-4 md:px-0">
        <div className="space-y-6 min-[1301px]:sticky min-[1301px]:top-32 transition-all duration-500">
          <h2 className="sol-title font-newsreader italic text-4xl md:text-5xl lg:text-6xl text-slate-900 font-extralight tracking-tight leading-[1.1]">
            {titleWords.map((word, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-[#1a5f9e]">{word}</span>
                ) : (
                  word + ' '
                )}
              </React.Fragment>
            ))}
          </h2>
          <div className="h-[2px] bg-[#55B8F5]/50 w-20" />
        </div>

        {descriptionBlocks.length > 0 && (
          <div className="min-[1301px]:border-l border-slate-200 pl-0 min-[1301px]:pl-12 py-2">
            <div className="space-y-4">
              {descriptionBlocks.map((text, i) => (
                <p key={i} className={`font-montserrat leading-[1.8] tracking-wide ${i === 0 ? 'text-lg md:text-xl text-slate-800 font-medium' : 'text-sm md:text-base text-slate-600 font-normal'}`}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Challenges Points (Red X) */}
      {outcomePoints.length > 0 && (
        <div className="space-y-8 mb-16 px-4 md:px-0">
          {section?.outcomeTitle && (
            <div className="text-center">
              <h3 className="sol-title font-newsreader italic text-2xl md:text-4xl text-slate-900 font-extralight tracking-tight">
                {sanitizeDisplay(section.outcomeTitle)}
              </h3>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {outcomePoints.map((p, i) => (
              <div key={i} className="sol-point group flex items-center gap-4 px-6 py-4 bg-red-50/70 border-l-4 border-red-500 rounded-xl shadow-xs transition-all duration-300">
                <div className="w-7 h-7 rounded-full border border-red-200 flex items-center justify-center shrink-0 bg-red-100">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="4">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-montserrat text-xs md:text-sm text-red-700 font-medium leading-relaxed">{sanitizeDisplay(p)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solutions / Everything Included Points (Green Check) */}
      {solutionPoints.length > 0 && (
        <div className="space-y-8 px-4 md:px-0">
          {section?.solutionTitle && (
            <div className="text-center">
              <h3 className="sol-title font-newsreader italic text-2xl md:text-4xl text-slate-900 font-extralight tracking-tight">
                {sanitizeDisplay(section.solutionTitle)}
              </h3>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {solutionPoints.map((p, i) => (
              <div key={i} className="sol-point group flex items-center gap-4 px-6 py-4 bg-blue-50/70 border-l-4 border-[#55B8F5] rounded-xl shadow-xs transition-all duration-300">
                <div className="w-7 h-7 rounded-full border border-blue-200 flex items-center justify-center shrink-0 bg-blue-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#142B5C" strokeWidth="4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="font-montserrat text-xs md:text-sm text-[#142B5C] font-semibold leading-relaxed">{sanitizeDisplay(p)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#55B8F5]/20 to-transparent mt-16" />
    </section>
  )
}

export default SolutionSection
