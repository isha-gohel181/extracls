import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const BonusSection = ({ course }) => {
  const ref = useRef(null)

  // Use API bonuses strictly if available
  const apiBonuses = Array.isArray(course?.bonuses) ? course.bonuses.filter(b => b && b.title) : []

  useEffect(() => {
    if (apiBonuses.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.bonus-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.1,
          scrollTrigger: { trigger: '.bonus-heading', start: 'top 87%' }
        }
      )

      gsap.fromTo('.bonus-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.1,
          scrollTrigger: { trigger: '.bonus-card', start: 'top 85%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [apiBonuses.length])

  // Hide the entire section if no bonuses exist in API
  if (apiBonuses.length === 0) return null

  return (
    <section ref={ref} className="max-w-7xl mx-auto mb-20 px-4 md:px-0">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#55B8F5]/30 to-transparent mb-16" />

      <div className="text-center space-y-3 mb-12">
        <span className="bonus-heading block font-jetbrains text-[9px] text-[#1a5f9e] tracking-[0.4em] uppercase font-bold">
          Exclusive Enrollment Bonuses
        </span>
        <h2 className="bonus-heading font-newsreader italic text-[clamp(2rem,5vw,3.5rem)] text-slate-900 font-extralight leading-tight">
          Included With Your Enrollment
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiBonuses.map((b, i) => (
          <div
            key={i}
            className="bonus-card group relative border border-[#E2EAF3] bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#55B8F5]/50 transition-all duration-300"
          >
            <div className="relative z-10 space-y-3">
              <p className="font-montserrat text-sm text-slate-800 font-semibold leading-relaxed">
                {b.title}
              </p>
              {b.price && (
                <div className="flex items-center gap-2">
                  <span className="font-jetbrains text-xs text-[#1a5f9e] font-bold">
                    Value: {b.price}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BonusSection
