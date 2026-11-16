import { getApiBase, getImageBase } from '../utils/apiBase.js'
import React, { useEffect, useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TestimonialAvatar from './TestimonialAvatar'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const EMPTY_REVIEWS = Object.freeze([])

const staticTestimonials = [
  {
    name: 'Priya M.',
    meta: 'Parent · Ahmedabad',
    text: 'My daughter loves the lessons—she asks to do the activities every evening after school.',
    photo: null,
  },
  {
    name: 'Rahul K.',
    meta: 'Parent · Delhi',
    text: 'Clear videos and worksheets made primary math much easier for our son to follow.',
    photo: null,
  },
  {
    name: 'Anita S.',
    meta: 'Parent · Bengaluru',
    text: 'Live classes keep my child engaged. Support on WhatsApp has been quick and helpful.',
    photo: null,
  },
  {
    name: 'Vikram P.',
    meta: 'Parent · Mumbai',
    text: 'Quality study material beyond the school book—our child’s confidence in reading has grown.',
    photo: null,
  },
  {
    name: 'Meena R.',
    meta: 'Parent · Hyderabad',
    text: 'Flexible recorded lessons fit our schedule. Educators explain concepts very simply.',
    photo: null,
  },
  {
    name: 'Arjun D.',
    meta: 'Parent · Jaipur',
    text: 'EXTRACLS made learning feel joyful—not stressful—for our preschooler.',
    photo: null,
  },
]

const mapApiTestimonial = (r) => {
  let photo = null
  if (r.image) {
    const rawBase = getImageBase()
    const baseUrl = rawBase.replace(/\/api\/v1\/?$/, '')
    photo = `${baseUrl}${r.image.startsWith('/') ? '' : '/'}${r.image}`
  }
  const name = r.name || (r.userId && r.userId.fullName) || 'Verified Parent'
  const role = r.role || r.designation || 'Parent'
  const place = r.company || ''
  const meta = place ? `${role} · ${place}` : role
  return {
    name,
    meta,
    text: (r.message || r.reviewText || r.text || '').trim(),
    photo,
  }
}

const mapPropReview = (r) => {
  let photo = null
  if (r.image) {
    const rawBase = getImageBase()
    const baseUrl = rawBase.replace(/\/api\/v1\/?$/, '')
    photo = `${baseUrl}${r.image.startsWith('/') ? '' : '/'}${r.image}`
  }
  const name = r.name || r.userName || 'Verified Parent'
  const role = r.designation || r.role || 'Parent'
  const place = r.company || ''
  const meta = place ? `${role} · ${place}` : role
  return {
    name,
    meta,
    text: (r.reviewText || r.text || r.message || '').trim(),
    photo,
  }
}

const StarRow = () => (
  <div className="flex gap-0.5 text-accent" aria-hidden>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const TestimonialCard = ({ item, landing = false }) => {
  if (!landing) {
    return (
      <article className="flex flex-col h-full p-6 md:p-7 rounded-2xl bg-dark/80 border border-card-border hover:border-accent/25 transition-colors">
        <div className="flex items-center gap-4 mb-5">
          {item.photo ? (
            <img
              src={item.photo}
              alt=""
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <TestimonialAvatar name={item.name} />
          )}
          <div className="min-w-0">
            <h3 className="font-montserrat text-sm md:text-base font-semibold text-normal truncate">{item.name}</h3>
            <p className="font-montserrat text-xs text-description truncate">{item.meta}</p>
          </div>
        </div>
        <p className="font-montserrat text-sm text-description leading-relaxed flex-1">&ldquo;{item.text}&rdquo;</p>
      </article>
    )
  }

  return (
    <article className="flex flex-col h-full min-h-[220px] w-[min(88vw,340px)] sm:w-[360px] shrink-0 rounded-2xl border border-[#E2EAF3] bg-white p-6 md:p-7 shadow-[0_8px_30px_-12px_rgba(20,43,92,0.12)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <StarRow />
        <span className="font-newsreader text-3xl leading-none text-accent/25" aria-hidden>
          &ldquo;
        </span>
      </div>
      <p className="font-montserrat text-sm md:text-[15px] text-brand-brown/90 leading-relaxed flex-1 line-clamp-5">
        {item.text}
      </p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#E2EAF3]">
        {item.photo ? (
          <img
            src={item.photo}
            alt=""
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#F0F7FF] shrink-0"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <TestimonialAvatar name={item.name} className="w-11 h-11 text-[10px]" />
        )}
        <div className="min-w-0">
          <h3 className="font-montserrat text-sm font-semibold text-normal truncate">{item.name}</h3>
          <p className="font-jetbrains text-[9px] uppercase tracking-wider text-description truncate">{item.meta}</p>
        </div>
      </div>
    </article>
  )
}

const TestimonialsScroll = ({ reviews, variant = 'default' }) => {
  const { t } = useLanguage()
  const landingRevealRef = useLandingScrollReveal({ selector: '[data-reveal]' })
  const propReviews = Array.isArray(reviews) ? reviews : EMPTY_REVIEWS
  const [apiTestimonials, setApiTestimonials] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(variant === 'landing')
  const isLanding = variant === 'landing'
  const propReviewCount = propReviews.length

  useEffect(() => {
    if (propReviewCount > 0) {
      setLoadingReviews(false)
      return
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 15000)

    const fetchLiveTestimonials = async () => {
      if (isLanding) setLoadingReviews(true)
      try {
        const rawBase = getApiBase()
        const baseUrl = rawBase.replace(/\/api\/v1\/?$/, '')
        const query = isLanding ? '?landing=true' : ''
        const res = await fetch(`${baseUrl}/testimonials${query}`, { signal: controller.signal })
        if (res.ok) {
          const json = await res.json()
          const items = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : []
          setApiTestimonials(items)
        } else {
          setApiTestimonials([])
        }
      } catch (err) {
        if (err?.name !== 'AbortError') setApiTestimonials([])
      } finally {
        window.clearTimeout(timeoutId)
        if (!controller.signal.aborted) setLoadingReviews(false)
      }
    }

    fetchLiveTestimonials()
    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [isLanding, propReviewCount])

  const displayTestimonials = useMemo(() => {
    if (propReviewCount > 0) {
      const valid = propReviews.filter((r) => r && (r.reviewText || r.text || r.message))
      if (valid.length > 0) return valid.map((r) => mapPropReview(r))
    }

    if (apiTestimonials.length > 0) {
      const validApi = apiTestimonials.filter((r) => r && (r.message || r.reviewText || r.text))
      if (validApi.length > 0) return validApi.map((r) => mapApiTestimonial(r))
    }

    return staticTestimonials
  }, [propReviews, propReviewCount, apiTestimonials])

  const marqueeItems = useMemo(() => {
    const list = displayTestimonials.length > 0 ? displayTestimonials : staticTestimonials
    return [...list, ...list]
  }, [displayTestimonials])

  if (loadingReviews) {
    return (
      <section
        className={`w-full py-16 md:py-20 px-4 md:px-8 border-y ${
          isLanding ? 'bg-[#F0F7FF]/50 border-[#E2EAF3]' : 'bg-white border-card-border'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-center py-8">
          <div className="h-9 w-9 border-4 border-brand-brown/20 border-t-accent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  if (displayTestimonials.length === 0) return null

  const sectionRef = isLanding ? landingRevealRef : undefined
  const revealProps = isLanding ? { 'data-reveal': true } : {}

  return (
    <section
      ref={sectionRef}
      id="student-testimonials"
      className={`relative py-16 md:py-24 px-4 md:px-8 lg:px-12 border-y overflow-hidden ${
        isLanding ? 'bg-[#F0F7FF]/60 border-[#E2EAF3]' : 'bg-white border-card-border'
      }`}
    >
      <div className="max-w-7xl mx-auto relative z-10 mb-10 md:mb-12">
        <div className="max-w-2xl space-y-3 text-center md:text-left mx-auto md:mx-0">
          <span
            {...revealProps}
            className="font-jetbrains text-[10px] text-accent tracking-[0.5em] uppercase font-bold"
          >
            {t('testimonialsEyebrow')}
          </span>
          <h2
            {...revealProps}
            className="font-newsreader text-3xl sm:text-4xl md:text-[2.75rem] text-brand-brown font-light leading-tight"
          >
            {t('testimonialsTitle')}
          </h2>
          <p {...revealProps} className="font-montserrat text-sm md:text-base text-description">
            {t('testimonialsSub')}
          </p>
        </div>
      </div>

      {isLanding ? (
        <>
          <div
            data-reveal
            className="testimonial-marquee-root relative w-full overflow-hidden py-2"
            aria-label={t('testimonialsEyebrow')}
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#F0F7FF] to-transparent z-10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#F0F7FF] to-transparent z-10"
              aria-hidden
            />
            <div className="testimonial-marquee-track flex items-stretch gap-4 md:gap-5 pl-4">
              {marqueeItems.map((item, idx) => (
                <TestimonialCard key={`${item.name}-marquee-${idx}`} item={item} landing />
              ))}
            </div>
          </div>

          <div className="testimonial-marquee-fallback hidden max-w-7xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayTestimonials.map((item, idx) => (
              <TestimonialCard key={`${item.name}-fallback-${idx}`} item={item} landing />
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayTestimonials.map((item, idx) => (
            <TestimonialCard key={`${item.name}-${idx}`} item={item} landing={false} />
          ))}
        </div>
      )}
    </section>
  )
}

export default TestimonialsScroll