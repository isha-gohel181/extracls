import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fade-up reveal for landing sections. Targets `[data-reveal]` inside the section ref.
 */
export function useLandingScrollReveal(options = {}) {
  const sectionRef = useRef(null)
  const {
    selector = '[data-reveal]',
    start = 'top 82%',
    stagger = 0.08,
    y = 24,
    duration = 0.85,
    refreshOnImages = true,
  } = options

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let mm

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector, el)
      if (targets.length === 0) return

      mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(targets, { autoAlpha: 1, y: 0 })
      })
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(targets, { autoAlpha: 0, y })
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        })
      })
    }, el)

    const refresh = () => {
      try {
        ScrollTrigger.refresh()
      } catch {
        /* ignore */
      }
    }

    let timeoutId
    if (refreshOnImages) {
      const imgs = el.querySelectorAll('img')
      imgs.forEach((img) => {
        if (img.complete) return
        img.addEventListener('load', refresh, { once: true })
        img.addEventListener('error', refresh, { once: true })
      })
      timeoutId = window.setTimeout(refresh, 400)
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      mm?.revert()
      ctx.revert()
    }
  }, [selector, start, stagger, y, duration, refreshOnImages])

  return sectionRef
}