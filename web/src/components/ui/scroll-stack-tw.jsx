/**
 * Scroll-stack behavior aligned with React Bits Pro Scroll Stack (`variant="stack"`).
 * Install the official source when REACTBITS_LICENSE_KEY is in .env.local:
 *   npx shadcn@latest add @reactbits-starter/scroll-stack-tw
 */
import React, { useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '../../lib/utils'

function StackCardLayer({
  index,
  count,
  progress,
  peek,
  scaleStep,
  blur,
  dim,
  depth,
  borderRadius,
  children,
}) {
  const relative = useTransform(progress, (p) => index - p)

  const scale = useTransform(relative, (r) => {
    if (r < 0) return 1
    return Math.max(0.72, 1 - scaleStep * r)
  })

  const y = useTransform(relative, (r) => {
    if (r < 0) return Math.min(120, -r * 140)
    return -peek * r
  })

  const opacity = useTransform(relative, (r) => {
    if (r <= 0.08) return 1
    if (r < 0) return 0.95
    return Math.max(0.72, 1 - dim * r)
  })

  const filterBlur = useTransform(relative, (r) => {
    if (r <= 0 || blur <= 0) return 'blur(0px)'
    const px = Math.min(blur, blur * r)
    return `blur(${px}px)`
  })

  const zIndex = useTransform(relative, (r) => {
    if (r < 0) return count + 10
    return count - Math.round(r)
  })

  const pointerEvents = useTransform(relative, (r) => (Math.abs(r) < 0.45 ? 'auto' : 'none'))

  const display = useTransform(relative, (r) => (r > depth + 0.5 ? 'none' : 'block'))

  return (
    <motion.div
      className="absolute inset-0 origin-top will-change-transform"
      style={{
        scale,
        y,
        opacity,
        zIndex,
        filter: filterBlur,
        borderRadius,
        pointerEvents,
        display,
      }}
    >
      <div className="h-full w-full overflow-hidden" style={{ borderRadius }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function ScrollStack({
  children,
  variant = 'stack',
  scrollLength = 1,
  peek = 26,
  scaleStep = 0.07,
  blur = 4,
  dim = 0.28,
  smooth = 0.16,
  depth = 3,
  cardWidth = 880,
  cardHeight = 0.68,
  borderRadius = 22,
  showProgress = true,
  showCounter = true,
  onIndexChange,
  className,
}) {
  const containerRef = useRef(null)
  const childArray = useMemo(() => React.Children.toArray(children), [children])
  const count = childArray.length
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const damp = Math.max(0.05, smooth)
  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, Math.max(1, count - 0.001)])
  const progress = useSpring(rawProgress, {
    stiffness: 120 / damp,
    damping: 24 + damp * 80,
    mass: 0.45,
  })

  const lastIndexRef = useRef(-1)
  useMotionValueEvent(progress, 'change', (p) => {
    const idx = Math.min(count - 1, Math.max(0, Math.round(p)))
    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx
      setActiveIndex(idx)
      onIndexChange?.(idx)
    }
  })

  if (count === 0) return null

  const sectionHeight = `${count * scrollLength * 100}vh`
  const stackHeight = `min(${cardHeight * 100}vh, 840px)`
  const progressPct = count > 1 ? (activeIndex / (count - 1)) * 100 : 100

  return (
    <section
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ height: sectionHeight }}
      data-scroll-stack-variant={variant}
    >
      <div className="sticky top-[4.5rem] z-10 flex h-[calc(100vh-4.5rem)] w-full flex-col items-center justify-center px-4 md:px-8">
        <div
          className="relative w-full"
          style={{
            maxWidth: cardWidth,
            height: stackHeight,
            minHeight: 500,
          }}
        >
          {childArray.map((child, index) => (
            <StackCardLayer
              key={index}
              index={index}
              count={count}
              progress={progress}
              peek={peek}
              scaleStep={scaleStep}
              blur={blur}
              dim={dim}
              depth={depth}
              borderRadius={borderRadius}
            >
              {child}
            </StackCardLayer>
          ))}
        </div>

        {(showProgress || showCounter) && (
          <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3">
            {showProgress && (
              <div className="h-px w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-accent transition-[width] duration-300 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}
            {showCounter && (
              <span className="font-jetbrains text-[10px] uppercase tracking-[0.35em] text-description">
                {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}