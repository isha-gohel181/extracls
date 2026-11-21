import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import sanitizeDisplay from '../utils/textSanitize'
import { resolveCourseThumbnail } from '../utils/courseThumbnail.js'
import { useLanguage } from '../context/LanguageContext'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

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

function useCourseMeta(course, t) {
  const id = course._id || course.id
  const { label, original } = courseListPrice(course)
  const thumb = resolveCourseThumbnail(course.thumbnail)
  const category =
    course.categoryId?.name || course.category?.name || course.category || t('landingCoursesCategoryFallback') || 'Enrichment'
  const desc = course.shortDescription || course.description || ''
  const href = id ? `/course-detail/${id}` : '/courses'
  return { id, label, original, thumb, category, desc, href, title: course.title }
}

const ModernCourseCard = ({ course }) => {
  const { t } = useLanguage()
  const { label, original, thumb, category, desc, href, title } = useCourseMeta(course, t)

  return (
    <Link
      to={href}
      data-reveal
      className="group flex flex-col h-full rounded-3xl border border-[#E2EAF3] bg-white shadow-sm hover:shadow-xl hover:border-[#55B8F5]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Visual Header */}
      <div className="relative aspect-[16/10] m-3 rounded-2xl overflow-hidden bg-[#E5F2FF]">
        {thumb ? (
          <img
            src={thumb}
            alt={sanitizeDisplay(title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-4">
            <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-[#142B5C]/40">
              {t('noPreview') || 'No Preview'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 gap-2 pt-1">
        {category && (
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-[#1a5f9e] font-bold truncate">
            {sanitizeDisplay(String(category))}
          </span>
        )}

        <h3 className="font-newsreader text-xl sm:text-[22px] text-[#142B5C] font-normal leading-snug group-hover:text-[#1a5f9e] transition-colors line-clamp-2">
          {sanitizeDisplay(title)}
        </h3>

        {desc ? (
          <p className="font-montserrat text-xs sm:text-[13px] text-[#475569] leading-relaxed line-clamp-2">
            {desc}
          </p>
        ) : null}

        {/* Footer Price & Action */}
        <div className="pt-4 mt-auto border-t border-[#E2EAF3] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-montserrat font-bold text-base sm:text-lg text-[#142B5C]">
              {label}
            </span>
            {original && (
              <span className="font-montserrat text-xs text-[#94A3B8] line-through">
                {original}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F0F7FF] text-[#142B5C] font-montserrat text-xs font-semibold group-hover:bg-[#142B5C] group-hover:text-white transition-all duration-200">
            <span>{t('landingCoursesCta') || 'Explore'}</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

const CompactSkeleton = () => (
  <div className="animate-pulse rounded-3xl border border-[#E2EAF3] bg-white overflow-hidden p-3 flex flex-col gap-4">
    <div className="aspect-[16/10] rounded-2xl bg-[#E5F2FF]" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-24 bg-[#E2EAF3] rounded" />
      <div className="h-6 w-3/4 bg-[#E2EAF3] rounded" />
      <div className="h-3 w-full bg-[#E2EAF3] rounded" />
    </div>
  </div>
)

const LandingCoursesSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()
  const { courses, loading } = useSelector((state) => state.courses)
  const [activeTab, setActiveTab] = useState('ALL')

  const validCourses = useMemo(() => {
    return Array.isArray(courses) ? courses.filter((c) => c && (c._id || c.id)) : []
  }, [courses])

  // Extract unique category tabs dynamically from courses
  const filterTabs = useMemo(() => {
    const tabs = [{ id: 'ALL', label: `All Programs (${validCourses.length})` }]
    const seen = new Set()

    validCourses.forEach((c) => {
      const catName = c.categoryId?.name || c.category?.name || c.category
      if (catName && !seen.has(catName.toLowerCase())) {
        seen.add(catName.toLowerCase())
        tabs.push({ id: catName, label: catName })
      }
    })

    return tabs
  }, [validCourses])

  // Filter courses based on active tab
  const displayedCourses = useMemo(() => {
    if (activeTab === 'ALL') return validCourses
    return validCourses.filter((c) => {
      const catName = (c.categoryId?.name || c.category?.name || c.category || '').toLowerCase()
      return catName === activeTab.toLowerCase()
    })
  }, [validCourses, activeTab])

  const sectionTitle = t('landingCoursesTitle') || 'Courses built for young minds'
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
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div data-reveal className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-[#142B5C]/25 shrink-0" aria-hidden />
              <span className="font-jetbrains text-xs text-[#3d5a80] tracking-[0.2em] uppercase font-semibold">
                {t('landingCoursesEyebrow') || 'Academic Excellence'}
              </span>
            </div>
            <h2 data-reveal className="text-balance">
              <span className="block font-newsreader text-[clamp(2.1rem,4.2vw,3.35rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#142B5C]">
                {titleLine1}
              </span>
              {titleLine2 ? (
                <span className="mt-1 block font-newsreader italic text-[clamp(2.1rem,4.2vw,3.35rem)] font-light leading-[1.08] text-[#1a5f9e]">
                  {titleLine2}
                </span>
              ) : null}
            </h2>
            <p data-reveal className="mt-4 font-montserrat text-sm md:text-base text-[#475569] leading-relaxed max-w-xl">
              {t('landingCoursesSub') || 'Interactive live classes, comprehensive curriculum kits, and personalized educator guidance crafted for preschool and primary students.'}
            </p>
          </div>

          <Link
            data-reveal
            to="/courses"
            className="group inline-flex self-start lg:self-auto items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-2xl bg-[#142B5C] text-white font-montserrat text-sm font-semibold hover:bg-[#1a3568] transition-colors duration-200 active:scale-[0.98]"
          >
            <span>{t('landingCoursesViewAll') || 'View All Courses'}</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
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

        {/* Interactive Category Filter Pills */}
        {filterTabs.length > 2 && (
          <div data-reveal className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-4 py-2 rounded-full font-montserrat text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#142B5C] text-white shadow-sm'
                      : 'bg-white text-[#475569] border border-[#E2EAF3] hover:border-[#55B8F5]/60 hover:text-[#142B5C]'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        )}

        {/* Courses Grid - 100% Dynamic Courses Only */}
        {loading && validCourses.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <CompactSkeleton />
            <CompactSkeleton />
            <CompactSkeleton />
          </div>
        ) : displayedCourses.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-dashed border-[#CBD8E8] bg-white">
            <p className="font-montserrat text-base text-[#475569] mb-6">
              {t('noCoursesAvailable') || 'No courses available in this category.'}
            </p>
            <button
              onClick={() => setActiveTab('ALL')}
              className="inline-flex min-h-[44px] items-center px-6 py-2.5 bg-accent text-white rounded-xl font-montserrat text-sm font-semibold hover:bg-[#3aa8ee] transition-colors"
            >
              View All Programs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {displayedCourses.map((course) => (
              <ModernCourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div data-reveal className="mt-12 pt-8 border-t border-[#E2EAF3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-montserrat text-xs sm:text-sm text-[#64748B]">
            All enrichment programs include live interactive batches, physical study kits, and verified educator feedback.
          </p>
          <Link
            to="/courses"
            className="font-montserrat text-xs sm:text-sm font-bold text-[#142B5C] hover:text-[#1a5f9e] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Browse Full Curriculum</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LandingCoursesSection
