import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUp } from '@phosphor-icons/react'

/**
 * BACK TO TOP · a control of the film, not a pop-in badge.
 * Visibility is scroll-linked (fades in as you leave the top, never snaps),
 * because scrolling is itself the timeline. Hover/press give a restrained
 * spring nudge; reduced-motion users skip that nudge.
 */
export default function BackToTop() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.18], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.04, 1], [16, 0, 0])
  const pointerEvents = useTransform(scrollYProgress, [0.035, 0.05], ['none', 'auto'] as const)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  const spring = { type: 'spring' as const, bounce: 0, duration: 0.28 }

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{ opacity, y, pointerEvents }}
      whileHover={reduce ? undefined : { scale: 1.06, transition: spring }}
      whileTap={reduce ? undefined : { scale: 0.94, transition: spring }}
      className="fixed bottom-6 right-6 z-[80] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[--color-hairline] bg-[--color-canvas] shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
    >
      <ArrowUp size={18} weight="regular" aria-hidden="true" className="text-[--color-ink]" />
    </motion.button>
  )
}
