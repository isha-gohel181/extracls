import React from 'react'
import { APP_DISPLAY_NAME, LOGO_PATH } from '../constants/brand'

const IMG_SIZE = {
  sm: 'h-8 md:h-9 w-auto max-w-[160px]',
  md: 'h-9 md:h-10 w-auto max-w-[10.5rem] md:max-w-[12rem]',
  auth: 'h-9 md:h-10 w-auto max-w-[10.5rem] md:max-w-[12rem]',
  lg: 'h-20 md:h-24 w-auto max-w-[280px]',
  footer: 'h-14 md:h-16 w-auto max-w-[220px]',
  watermark: 'h-auto max-h-40 w-auto max-w-[220px]',
}

const FRAME_VARIANT = {
  light: 'rounded-xl bg-black border border-slate-300/50 shadow-sm',
  dark: 'rounded-xl bg-black border border-white/25 shadow-sm',
}

/**
 * Logo in the same rounded frame as the navbar mark (overflow-hidden + curved border).
 */
export default function SiteBrandLogo({
  size = 'md',
  variant = 'light',
  src = LOGO_PATH,
  alt = APP_DISPLAY_NAME,
  className = '',
  imgClassName = '',
  unframed = false,
}) {
  const imgClass = `${IMG_SIZE[size] || IMG_SIZE.md} object-contain ${imgClassName}`.trim()

  if (unframed) {
    return <img src={src} alt={alt} className={imgClass} />
  }

  const frame = FRAME_VARIANT[variant] || FRAME_VARIANT.light

  return (
    <span
      className={`inline-flex items-center shrink-0 overflow-hidden ${frame} ${className}`.trim()}
    >
      <img src={src} alt={alt} className={imgClass} />
    </span>
  )
}