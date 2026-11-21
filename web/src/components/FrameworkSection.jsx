import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import sanitizeDisplay from '../utils/textSanitize'

gsap.registerPlugin(ScrollTrigger)

const FrameworkSection = ({ course, section }) => {
  const containerRef = useRef(null)
  const introRef = useRef(null)

  // Extract data from EditorJS blocks or plain text
  const processContent = (content) => {
    if (!content) return { intro: [], phases: [] }

    if (typeof content === 'string') {
      return { intro: [content], phases: [] }
    }

    if (!content.blocks) return { intro: [], phases: [] }

    const intro = []
    const phases = []
    let currentPhase = null
    let foundFirstHeader = false

    content.blocks.forEach(block => {
      if (block.type === 'header') {
        foundFirstHeader = true
        if (currentPhase) phases.push(currentPhase)
        currentPhase = { title: block.data.text, description: '' }
      } else if (block.type === 'paragraph') {
        if (!foundFirstHeader) {
          intro.push(block.data.text)
        } else if (currentPhase) {
          currentPhase.description += block.data.text + ' '
        }
      }
    })
    if (currentPhase) phases.push(currentPhase)
    return { intro, phases }
  }

  const { intro, phases } = processContent(section?.description || section?.content)

  const stripHtml = (html) => {
    if (!html) return ''
    return String(html).replace(/<[^>]*>/g, '').replace(/&nbsp;|\u00A0/g, ' ')
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.framework-intro-item', 
        { opacity: 0, y: 8 },
        { 
          opacity: 1, y: 0, 
          duration: 0.45, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 95%'
          }
        }
      )

      gsap.utils.toArray('.phase-node').forEach((node) => {
        gsap.fromTo(node,
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0,
            duration: 0.45, ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      gsap.fromTo('.roadmap-line-inner', 
        { height: '0%' },
        { 
          height: '100%', 
          ease: 'none',
          scrollTrigger: {
            trigger: '.phases-container',
            start: 'top 70%',
            end: 'bottom 90%',
            scrub: true
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [phases])

  if (!section?.title && intro.length === 0 && phases.length === 0) {
    return null
  }

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto py-16">
      
      {/* HEADER SECTION */}
      <div ref={introRef} className="max-w-4xl mx-auto mb-16 relative px-4 md:px-0">
        <div className="relative p-6 md:p-10 lg:p-12 border border-[#E2EAF3] bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="framework-intro-item font-newsreader italic text-3xl md:text-4xl lg:text-5xl text-[#142B5C] font-light tracking-tight leading-[1.1]">
                {sanitizeDisplay(section?.title || 'Learning Methodology')}
              </h2>
              {section?.subtitle && (
                <span className="framework-intro-item block font-jetbrains text-[#1a5f9e] text-[10px] tracking-[0.15em] uppercase font-bold">
                  {sanitizeDisplay(section.subtitle)}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {intro.map((text, i) => (
                <p key={i} className={`framework-intro-item font-montserrat text-[#475569] leading-[1.8] tracking-wide font-normal ${i === 0 ? 'text-base md:text-lg text-[#142B5C] border-l-2 border-[#55B8F5] pl-4 md:pl-6 py-1' : 'text-sm md:text-base'}`}>
                  {sanitizeDisplay(stripHtml(text))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PHASES ROADMAP */}
      {phases.length > 0 && (
        <div className="phases-container relative max-w-4xl mx-auto pt-4 space-y-16 md:space-y-24 pl-6 md:pl-0">
          
          {/* Central Road Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#E2EAF3]">
             <div className="roadmap-line-inner w-full bg-[#55B8F5] origin-top" />
          </div>

          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div 
                key={index} 
                className={`phase-node relative flex flex-col md:flex-row items-center gap-4 md:gap-0 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Content Card */}
                <div className="w-full md:w-[46%] group">
                  <div className="relative p-6 md:p-8 border border-[#E2EAF3] bg-white rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md hover:border-[#55B8F5]/60 overflow-hidden">
                    <div className="space-y-2">
                      <span className="font-jetbrains text-[#1a5f9e] text-[10px] uppercase tracking-wider font-bold">
                        Stage {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-newsreader italic text-xl md:text-2xl text-[#142B5C] font-normal leading-snug">
                        {sanitizeDisplay(phase.title)}
                      </h3>
                      {phase.description && (
                        <p className="font-montserrat text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">
                          {sanitizeDisplay(phase.description)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Node Indicator */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-[#55B8F5] shadow-md z-20" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default FrameworkSection
