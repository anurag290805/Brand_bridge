import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * SCROLL-LINKED REVEAL · GPU-optimized
 * Only animates opacity + y translate (GPU-friendly), no blur filters.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  from = 0.94,
  to = 0.6,
}: {
  children: ReactNode
  delay?: number
  className?: string
  /** Viewport fraction where the reveal begins (0.94 ≈ just entered). */
  from?: number
  /** Viewport fraction where the reveal completes. */
  to?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const shift = delay * 0.6
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${Math.min(Math.max(from - shift, 0.06), 0.96)}`, `start ${Math.max(to - shift, 0.04)}`],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [24, 0])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}