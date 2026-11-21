import React from 'react'
import sanitizeDisplay from '../utils/textSanitize'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const CourseCard = ({ item, className = '', variant = 'course', onRegister }) => {
  const { t } = useLanguage()

  const handleAction = (e) => {
    if (variant === 'event') {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (item?.onRegister) item.onRegister(item)
      else if (onRegister) onRegister(item)
    }
  }

  const CardContent = (
    <div className={`catalog-card flex flex-col h-full rounded-3xl border border-[#E2EAF3] bg-white p-3 sm:p-3.5 shadow-sm hover:shadow-xl hover:border-[#55B8F5]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden group ${className}`}>
      {/* Image Wrapper */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E5F2FF] mb-4">
        {item.image ? (
          <img
            src={item.image}
            alt={sanitizeDisplay(item.title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center px-4">
            <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-[#142B5C]/40 text-center">
              {t('noPreview') || 'No preview'}
            </span>
          </div>
        )}
      </div>

      {/* Content Metadata */}
      <div className="flex flex-col flex-grow gap-2 px-1 pb-1">
        {item.category && (
          <span className="font-jetbrains text-[9px] text-[#1a5f9e] tracking-[0.2em] font-bold uppercase pointer-events-none truncate">
            {item.category}
          </span>
        )}
        
        <h3 className="font-newsreader text-xl sm:text-[22px] text-[#142B5C] font-normal tracking-tight leading-snug group-hover:text-[#1a5f9e] transition-colors pointer-events-none line-clamp-2">
          {sanitizeDisplay(item.title)}
        </h3>
        
        {item.description ? (
          <p className="font-montserrat text-xs sm:text-[13px] text-[#475569] leading-relaxed mb-3 flex-grow line-clamp-2 pointer-events-none">
            {item.description}
          </p>
        ) : null}

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-[#E2EAF3] mt-auto">
          {variant === 'course' ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat text-sm sm:text-base text-[#142B5C] font-bold">
                  {item.price}
                </span>
                {item.originalPrice && (
                  <span className="font-montserrat text-xs text-[#94A3B8] line-through">
                    {item.originalPrice}
                  </span>
                )}
              </div>
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F0F7FF] text-[#142B5C] group-hover:bg-[#142B5C] group-hover:text-white transition-all duration-300">
                <svg 
                  width="11" 
                  height="11" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </>
          ) : (
            <button 
              type="button"
              onClick={handleAction}
              className="w-full py-2.5 px-4 rounded-xl bg-accent text-white font-montserrat text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#3aa8ee] shadow-xs transition-all duration-200 cursor-pointer text-center"
            >
              {item.buttonText || t('registerNow') || 'REGISTER NOW'}
            </button>
          )}
        </div>
      </div>
    </div>
  )

  if (variant === 'course') {
    return (
      <Link to={`/course-detail/${item.id}`} className="block h-full">
        {CardContent}
      </Link>
    )
  }

  if (variant === 'event') {
    return (
      <div onClick={handleAction} className="block h-full cursor-pointer">
        {CardContent}
      </div>
    )
  }

  return CardContent
}

export default CourseCard
