import React from 'react'
import { Link } from 'react-router-dom'
import { LANDING_IMAGES } from '../constants/landingImages'
import { useLanguage } from '../context/LanguageContext'
import { handleLandingImageError } from '../utils/landingImageFallback'
import { useLandingScrollReveal } from '../hooks/useLandingScrollReveal'

const FormatCard = ({ title, desc, imageSrc, imageAlt, ctaLabel }) => (
  <div
    data-reveal
    className="group relative flex flex-col h-full bg-white border border-card-border rounded-2xl overflow-hidden shadow-sm hover:border-accent/35 hover:shadow-md transition-all duration-300"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF9F3]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        onError={handleLandingImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
    <div className="flex flex-col flex-1 p-6 md:p-8">
      <h3 className="font-newsreader italic text-2xl text-normal font-light mb-3">{title}</h3>
      <p className="font-montserrat text-sm text-description leading-relaxed mb-6 flex-1">{desc}</p>
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] font-bold text-accent group-hover:gap-3 transition-all"
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </Link>
    </div>
  </div>
)

const LandingProgramsSection = () => {
  const { t } = useLanguage()
  const sectionRef = useLandingScrollReveal()

  const formats = [
    {
      title: t('formatLiveTitle'),
      desc: t('formatLiveDesc'),
      imageSrc: LANDING_IMAGES.formatLive,
      imageAlt: t('trainingCaptionSeminar'),
    },
    {
      title: t('formatRecordedTitle'),
      desc: t('formatRecordedDesc'),
      imageSrc: LANDING_IMAGES.formatRecorded,
      imageAlt: t('trainingCaptionMentor'),
    },
    {
      title: t('formatOfflineTitle'),
      desc: t('formatOfflineDesc'),
      imageSrc: LANDING_IMAGES.formatOffline,
      imageAlt: t('trainingCaptionWorkshop'),
    },
  ]

  const highlights = [t('trainingHighlight1'), t('trainingHighlight2'), t('trainingHighlight3')]

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 px-4 md:px-8 lg:px-12 overflow-hidden border-b border-card-border"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4">
          <div data-reveal className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent/40" />
            <span className="font-jetbrains text-[10px] text-accent tracking-[0.5em] uppercase font-bold">
              {t('formatsEyebrow')}
            </span>
            <span className="w-8 h-[1px] bg-accent/40" />
          </div>
          <h2 data-reveal className="font-newsreader italic text-3xl sm:text-4xl md:text-5xl text-normal font-light tracking-tight">
            {t('formatsTitle')}
          </h2>
          <p data-reveal className="font-montserrat text-sm md:text-base text-description">{t('formatsSub')}</p>
        </div>

        <ul data-reveal className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-2 max-w-3xl mx-auto mb-12 md:mb-14">
          {highlights.map((line) => (
            <li key={line} className="flex items-center gap-2 font-montserrat text-sm text-description">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {formats.map((f) => (
            <FormatCard
              key={f.title}
              title={f.title}
              desc={f.desc}
              imageSrc={f.imageSrc}
              imageAlt={f.imageAlt}
              ctaLabel={t('viewCourses')}
            />
          ))}
        </div>

        <div data-reveal className="mt-12 md:mt-14 flex justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-accent hover:bg-amber-600 text-white rounded-xl font-jetbrains text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-accent-soft hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t('browseCourses')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LandingProgramsSection