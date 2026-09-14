import type { ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'

type Variant = 'primary' | 'secondary' | 'on-dark' | 'link'
type Size = 'default' | 'sm'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[8px] font-medium leading-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] cursor-pointer disabled:cursor-not-allowed '

const sizes: Record<Size, string> = {
  default: 'text-[15px] px-8 h-12',
  sm: 'text-[13px] px-5 h-10',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-[--color-cta-bg] text-[--color-cta-text] hover:bg-[--color-cta-bg-hover] shadow-[0_6px_18px_rgba(0,0,0,0.14)]',
  secondary:
    'bg-transparent text-[--color-ink] border border-[--color-hairline-strong] hover:border-[--color-muted-soft] hover:bg-[--color-surface-soft]',
  'on-dark':
    'bg-[--color-surface-dark-elevated] text-[--color-on-dark] border border-white/10 hover:border-white/25 hover:bg-[--color-surface-dark-soft]',
  link: 'text-[--color-ink] hover:text-[--color-primary] px-1 h-10 font-medium',
}

export type ButtonProps = {
  variant?: Variant
  size?: Size
  href?: string
  icon?: boolean
  full?: boolean
  children: ReactNode
  className?: string
  onClick?: () => void
} & Omit<HTMLMotionProps<'button'>, 'children' | 'className' | 'onClick'>

/**
 * The project's only button primitive. Every on-page action uses this so the
 * primary action language, shape system, and press states stay consistent.
 * When `href` is set, renders an `<a>` that scrolls to the target section.
 *
 * Apple Design principles:
 * - Press feedback on pointer-down (whileTap), not click
 * - Spring-driven, critically damped (bounce: 0) for UI actions
 * - Velocity handoff from gesture to spring (handled by Motion)
 * - Identical spring behavior on <button> and <a>
 */
export function Button({
  variant = 'primary',
  size = 'default',
  href,
  icon = false,
  full = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`

  // Apple default: critically damped spring (bounce: 0), response ~0.3-0.4s
  // duration in Motion maps to "response" - 0.25s feels snappy for button press
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.25 }

  // Primary variant lifts on hover (elevates like a physical button)
  // Secondary/link don't lift - they're flat UI elements
  const hoverLift = variant === 'primary' ? -1 : 0

  // Icon size adjusts with button size
  const iconSize = size === 'sm' ? 14 : 16

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ y: hoverLift, transition: spring }}
        whileTap={{ scale: 0.98, y: 1, transition: spring }}
      >
        <span>{children}</span>
        {icon && (
          <ArrowRight
            size={iconSize}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      whileHover={{ y: hoverLift, transition: spring }}
      whileTap={{ scale: 0.98, y: 1, transition: spring }}
      {...rest}
    >
      <span>{children}</span>
      {icon && <ArrowRight size={iconSize} weight="bold" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />}
    </motion.button>
  )
}