import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import sanitizeDisplay from '../utils/textSanitize'
import { resolveCourseThumbnail } from '../utils/courseThumbnail.js'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const CARD_SHELL =
  'rounded-[1.35rem] border border-[#E2EAF3] bg-white overflow-hidden transition-[border-color,transform] duration-300 hover:border-accent/45 hover:-translate-y-0.5'

function courseListPrice(course) {
  const sale = course?.salePrice != null && Number(course.salePrice) > 0 ? Number(course.salePrice) : null
  const base = course?.price != null && Number(course.price) > 0 ? Number(course.price) : null
  const active = sale ?? base
  const hasSale = sale != null && base != null && sale < base
  if (active == null) return { label: 'Enquire', original: null }
  return {
    label: `₹${Number(active).toLocaleString('en-IN')}`,
    original: hasSale ? `₹${Number(base).toLocaleString('en-IN')}` : null,
  }
}

function formatLabel(course) {
  const mode = (course?.deliveryMode || course?.courseType || '').toString().toLowerCase()
  if (mode.includes('live')) return 'Live'
  if (mode.includes('record')) return 'Recorded'
  if (mode.includes('offline') || mode.includes('in-person')) return 'Offline'
  const plans = course?.plans
  if (Array.isArray(plans) && plans.length > 0) {
    const names = plans.map((p) => (p?.name || '').toLowerCase()).join(' ')
    if (names.includes('offline')) return 'Offline'
    if (names.includes('live')) return 'Live'
  }
  return 'Program'
}

function useCourseMeta(course, t) {
  const id = course._id || course.id
  const { label, original } = courseListPrice(course)
  const thumb = resolveCourseThumbnail(course.thumbnail)
  const category =
    course.categoryId?.name || course.category?.name || course.category || t('landingCoursesCategoryFallback')
  const desc = course.shortDescription || course.description || ''
  const href = id ? `/course-detail/${id}` : '/courses'
  return { id, label, original, thumb, category, desc, href, title: course.title }
}

const FormatBadge = ({ course }) => (
  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-accent text-white font-jetbrains text-[9px] uppercase tracking-wider font-bold">
    {formatLabel(course)}
  </span>
)

const PriceRow = ({ label, original, t, compact }) => (
  <div className={`flex items-end justify-between gap-3 ${compact ? 'pt-3 mt-2 border-t border-[#E2EAF3]' : 'pt-4 mt-auto border-t border-[#E2EAF3]'}`}>
    <div className="min-w-0">
      <p className="font-jetbrains text-[9px] uppercase tracking-wider text-description mb-0.5">
        {t('landingCoursesFrom')}
      </p>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`font-montserrat font-bold text-normal ${compact ? 'text-sm' : 'text-base md:text-lg'}`}>
          {label}
        </span>
        {original && (
          <span className="font-montserrat text-xs text-description line-through">{original}</span>
        )}
      </div>
    </div>
    <span className="shrink-0 rounded-lg bg-accent px-3 py-1.5 font-jetbrains text-[9px] uppercase tracking-[0.12em] font-bold text-white group-hover:bg-[#3aa8ee] transition-colors">
      {t('landingCoursesCta')}
    </span>
  </div>
)

const CourseThumbnail = ({ thumb, t, className = '' }) => (
  <div className={`relative bg-[#E5F2FF] overflow-hidden ${className}`}>
    {thumb ? (
      <img src={thumb} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
    ) : (
      <div className="w-full h-full flex items-center justify-center px-6 text-center min-h-[120px]">
        <span className="font-jetbrains text-[10px] uppercase tracking-[0.25em] text-accent/50">{t('noPreview')}</span>
      </div>
    )}
  </div>
)

const LandingCourseCard = ({ course }) => {
  const { t } = useLanguage()
  const { href, thumb, category, desc, label, original, title } = useCourseMeta(course, t)

  return (
    <Link to={href} className={`group flex flex-col h-full ${CARD_SHELL}`}>
      <div className="relative aspect-[16/10] border-b border-[#E2EAF3]">
        <CourseThumbnail thumb={thumb} t={t} className="absolute inset-0" />
        <FormatBadge course={course} />
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6 gap-2">
        <span className="font-jetbrains text-[10px] uppercase tracking-[0.22em] text-[#1a5f9e] font-semibold truncate">
          {sanitizeDisplay(String(category))}
        </span>
        <h3 className="font-newsreader text-xl text-[#142B5C] font-light leading-snug line-clamp-2 group-hover:text-[#1a5f9e] transition-colors">
          <span className="italic">{sanitizeDisplay(title)}</span>
        </h3>
        {desc ? (
          <p className="font-montserrat text-sm text-description leading-relaxed line-clamp-2 flex-1">{desc}</p>
        ) : (
          <div className="flex-1" />
        )}
        <PriceRow label={label} original={original} t={t} compact />
      </div>
    </Link>
  )
}

const LandingFeaturedCourseCard = ({ course }) => {
  const { t } = useLanguage()
  const { href, thumb, category, desc, label, original, title } = useCourseMeta(course, t)

  return (
    <Link to={href} className={`group flex flex-col lg:flex-row h-full border-t-[3px] border-t-accent ring-1 ring-[#F0F7FF] ${CARD_SHELL}`}>
      <div className="relative lg:w-[44%] shrink-0 aspect-[16/10] lg:aspect-auto lg:min-h-[280px] border-b lg:border-b-0 lg:border-r border-[#E2EAF3]">
        <CourseThumbnail thumb={thumb} t={t} className="absolute inset-0" />
        <FormatBadge course={course} />
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-8 lg:p-10 gap-3">
        <span className="font-jetbrains text-[10px] uppercase tracking-[0.22em] text-[#1a5f9e] font-semibold">
          {sanitizeDisplay(String(category))}
        </span>
        <h3 className="font-newsreader text-2xl md:text-3xl lg:text-[2rem] text-[#142B5C] font-light leading-tight group-hover:text-[#1a5f9e] transition-colors">
          <span className="italic">{sanitizeDisplay(title)}</span>
        </h3>
        {desc && (
          <p className="font-montserrat text-sm md:text-base text-description leading-relaxed line-clamp-3 lg:line-clamp-4">
            {desc}
          </p>
        )}
        <PriceRow label={label} original={original} t={t} compact={false} />
      </div>
    </Link>
  )
}

const CoursesFeaturedLayout = ({ courses }) => {
  const n = courses.length

  if (n === 1) {
    return (
      <div className="max-w-4xl mx-auto">
        <div data-reveal>
          <LandingFeaturedCourseCard course={courses[0]} />
        </div>
      </div>
    )
  }

  if (n === 2) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {courses.map((course) => (
          <div key={course._id || course.id} data-reveal className="min-h-0">
            <LandingFeaturedCourseCard course={course} />
          </div>
        ))}
      </div>
    )
  }

  if (n === 3) {
    const [primary, ...rest] = courses
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:items-stretch">
        <div className="lg:col-span-7 min-h-0" data-reveal>
          <LandingFeaturedCourseCard course={primary} />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
          {rest.map((course) => (
            <div key={course._id || course.id} data-reveal className="flex-1 min-h-0">
              <LandingCourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const [primary, second, third, ...remainder] = courses
  return (
    <div className="space-y-5 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:items-stretch">
        <div className="lg:col-span-7 min-h-0" data-reveal>
          <LandingFeaturedCourseCard course={primary} />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
          {[second, third].filter(Boolean).map((course) => (
            <div key={course._id || course.id} data-reveal className="flex-1 min-h-0">
              <LandingCourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      {remainder.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {remainder.map((course) => (
            <div key={course._id || course.id} data-reveal>
              <LandingCourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const FeaturedSkeleton = () => (
  <div className={`animate-pulse flex flex-col lg:flex-row ${CARD_SHELL}`}>
    <div className="aspect-[16/10] lg:w-[44%] bg-[#E5F2FF]/80" />
    <div className="flex-1 p-8 space-y-4">
      <div className="h-2 w-24 bg-white/80 rounded" />
      <div className="h-8 w-3/4 bg-white/80 rounded" />
      <div className="h-4 w-full bg-white/60 rounded" />
      <div className="h-4 w-2/3 bg-white/60 rounded" />
    </div>
  </div>
)

const CompactSkeleton = () => (
  <div className={`animate-pulse ${CARD_SHELL}`}>
    <div className="aspect-[16/10] bg-[#E5F2FF]/80" />
    <div className="p-6 space-y-3">
      <div className="h-2 w-24 bg-white/80 rounded" />
      <div className="h-6 w-full bg-white/80 rounded" />
    </div>
  </div>
)

const LandingCoursesSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()
  const { courses, loading } = useSelector((state) => state.courses)

  const displayed = useMemo(() => {
    const list = Array.isArray(courses) ? courses.filter((c) => c && (c._id || c.id)) : []
    if (list.length === 0) return []
    const sorted = [...list].sort((a, b) => {
      const af = a.isFeatured ? 1 : 0
      const bf = b.isFeatured ? 1 : 0
      return bf - af
    })
    return sorted.slice(0, 6)
  }, [courses])

  const sectionTitle = t('landingCoursesTitle')
  const titleForSplit = sectionTitle.split(/\s+for\s+/i)
  const titleLine1 = titleForSplit[0]?.trim() || sectionTitle
  const titleLine2 = titleForSplit[1] ? `for ${titleForSplit[1].trim()}` : ''

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-[#E2EAF3] bg-[#F0F7FF] pt-16 md:pt-20 pb-16 md:pb-24 px-4 md:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[#55B8F5]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#142B5C]/5 blur-3xl" aria-hidden />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="h-px w-12 bg-[#142B5C]/25 shrink-0" aria-hidden />
              <span className="font-jetbrains text-xs sm:text-[13px] text-[#3d5a80] tracking-[0.2em] uppercase font-medium">
                {t('landingCoursesEyebrow')}
              </span>
            </div>
            <h2 data-reveal className="text-balance">
              <span className="block font-newsreader text-[clamp(2rem,4.2vw,3.35rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#142B5C]">
                {titleLine1}
              </span>
              {titleLine2 ? (
                <span className="mt-1 block font-newsreader italic text-[clamp(2rem,4.2vw,3.35rem)] font-light leading-[1.08] text-[#1a5f9e]">
                  {titleLine2}
                </span>
              ) : null}
            </h2>
            <p data-reveal className="mt-4 font-montserrat text-base md:text-lg text-[#475569] leading-relaxed max-w-xl">
              {t('landingCoursesSub')}
            </p>
          </div>
          <Link
            data-reveal
            to="/courses"
            className="group inline-flex self-start lg:self-auto items-center justify-center gap-2 min-h-[52px] px-9 py-3.5 rounded-2xl bg-[#142B5C] text-white font-montserrat text-[15px] font-semibold hover:bg-[#1a3568] transition-colors duration-200 active:scale-[0.98]"
          >
            {t('landingCoursesViewAll')}
            <svg
              className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {loading && displayed.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <CompactSkeleton />
            <CompactSkeleton />
            <CompactSkeleton />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 rounded-[1.35rem] border border-dashed border-[#CBD8E8] bg-white">
            <p className="font-montserrat text-base text-[#475569] mb-6">{t('noCoursesAvailable')}</p>
            <Link
              to="/courses"
              className="inline-flex min-h-[48px] items-center px-9 py-3 bg-accent text-white rounded-2xl font-montserrat text-[15px] font-semibold hover:bg-[#3aa8ee] transition-colors"
            >
              {t('browseCourses')}
            </Link>
          </div>
        ) : (
          <CoursesFeaturedLayout courses={displayed} />
        )}
      </div>
    </section>
  )
}

export default LandingCoursesSection