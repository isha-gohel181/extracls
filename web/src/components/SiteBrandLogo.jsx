import React from 'react'
import { APP_DISPLAY_NAME, LOGO_PATH, LOGO_WIDE_PATH } from '../constants/brand'

const IMG_SIZE = {
  sm: 'h-8 md:h-9 w-auto max-w-[160px]',
  md: 'h-9 md:h-10 w-auto max-w-[10.5rem] md:max-w-[12rem]',
  auth: 'h-11 sm:h-12 w-auto max-w-[14rem]',
  lg: 'h-20 md:h-24 w-auto max-w-[280px]',
  footer: 'h-12 md:h-14 w-auto max-w-[220px]',
  watermark: 'h-auto max-h-40 w-auto max-w-[220px]',
}

const FRAME_VARIANT = {
  light: 'rounded-xl bg-black border border-slate-300/50 shadow-sm',
  dark: 'rounded-xl bg-black border border-white/25 shadow-sm',
  auth: 'rounded-2xl bg-black border border-slate-200/40 shadow-sm px-4 py-2',
}

/**
 * Logo in the rounded dark frame matching brand styling.
 */
export default function SiteBrandLogo({
  size = 'md',
  variant,
  src,
  alt = APP_DISPLAY_NAME,
  className = '',
  imgClassName = '',
  unframed = false,
}) {
  const chosenVariant = variant || (size === 'auth' ? 'auth' : 'light')
  const defaultSrc = (size === 'auth' || size === 'footer') ? LOGO_WIDE_PATH : LOGO_PATH
  const imageSrc = src || defaultSrc
  const imgClass = `${IMG_SIZE[size] || IMG_SIZE.md} object-contain ${imgClassName}`.trim()

  if (unframed) {
    return <img src={imageSrc} alt={alt} className={imgClass} />
  }

  const frame = FRAME_VARIANT[chosenVariant] || FRAME_VARIANT.light

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${frame} ${className}`.trim()}
    >
      <img src={imageSrc} alt={alt} className={imgClass} />
    </span>
  )
}
