import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApiBase } from '../utils/apiBase.js'
import { resolveCourseThumbnail } from '../utils/courseThumbnail.js'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

export default function LandingFreeDownloadSection() {
  const { t } = useLanguage()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  useLandingScrollReveal()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const base = getApiBase()
        const res = await fetch(
          `${base}/courses/?showFreeDownloadOnLanding=true&limit=12&page=1&isPublished=true`
        )
        if (!res.ok) throw new Error('fetch failed')
        const json = await res.json()
        const list = json?.data?.data || json?.data || []
        if (!cancelled) setCourses(Array.isArray(list) ? list.slice(0, 6) : [])
      } catch {
        if (!cancelled) setCourses([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!loading && courses.length === 0) return null

  return (
    <section className="py-14 md:py-18 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="font-jetbrains text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
          {t('landingFreeDownloadEyebrow')}
        </p>
        <h2 className="font-newsreader text-3xl font-light text-slate-900 md:text-4xl mb-2">
          {t('landingFreeDownloadTitle')}
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mb-10">{t('landingFreeDownloadSub')}</p>

        {loading ? (
          <p className="text-sm text-slate-500">{t('loading') || 'Loading…'}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const id = course._id || course.id
              const thumb = resolveCourseThumbnail(course.thumbnail)
              const title = course.title || 'Course'
              const href = id ? `/course-detail/${id}` : '/courses'
              return (
                <li key={id}>
                  <Link
                    to={href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2EAF3] bg-white transition hover:border-accent/45 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/10] bg-[#E5F2FF] overflow-hidden">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : null}
                      <span className="absolute top-3 left-3 rounded-lg bg-emerald-600 px-2.5 py-1 font-jetbrains text-[9px] font-bold uppercase tracking-wider text-white">
                        {t('landingFreeDownloadBadge')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-montserrat text-base font-semibold text-slate-900 line-clamp-2">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {course.shortDescription || course.description || ''}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 font-jetbrains text-[10px] font-bold uppercase tracking-wider text-accent">
                        {t('landingFreeDownloadCta')}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}