import { useEffect, useRef, useState } from 'react'
import { List, X, Sun, Moon } from '@phosphor-icons/react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { config } from '../config'
import { Button } from '../lib/Button'
import { BrandLogo } from '../lib/BrandMark'
import { useTheme } from '../lib/theme'

/** Sections the nav tracks, in document order. */
const SECTION_IDS = [
  'who-its-for',
  'matching',
  'economics',
  'process',
  'niches',
  'faq',
  'contact',
] as const
type SectionId = (typeof SECTION_IDS)[number]

const links = [
  {
    label: 'Creators & Brands',
    caption: 'For both sides',
    href: '#who-its-for',
  },
  {
    label: 'Matching',
    caption: 'Context before connection',
    href: '#matching',
  },
  {
    label: 'Economics',
    caption: 'Transparent 85/15 split',
    href: '#economics',
  },
  {
    label: 'Process',
    caption: 'How it works',
    href: '#process',
  },
  {
    label: 'Niches',
    caption: 'Audience focus',
    href: '#niches',
  },
  {
    label: 'FAQ',
    caption: 'Common questions',
    href: '#faq',
  },
  {
    label: 'Contact',
    caption: 'Start a conversation',
    href: '#contact',
  },
]

/**
 * Fixed navigation, designed to be almost invisible until needed.
 * At the top of the page it is bare type on the canvas; once the user scrolls
 * it gains a hairline and a blurred translucent surface. The official
 * BrandBridge logo sits at the left; a single CTA on the right.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)
  const topsRef = useRef<{ id: SectionId; top: number }[]>([])
  const { theme, toggle } = useTheme()

  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  const raised = scrolled || open
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.4 }

  // Cache the tracked sections' document positions once, and again on resize,
  // so scrollspy reads offsets instead of touching layout every frame.
  useEffect(() => {
    const measure = () => {
      topsRef.current = SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        return { id, top: el ? el.getBoundingClientRect().top + window.scrollY : 0 }
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 12)
    // The section whose top sits just below the fixed header is the active scene.
    const probe = v + 140
    let current: SectionId | null = null
    for (const s of topsRef.current) {
      if (probe >= s.top) current = s.id
    }
    setActive(current)
  })

  // Prevent background scroll while the mobile sheet is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open])

  // Sync scroll state to <body> for scroll-edge fade CSS
  // Update both dataset and class in same effect to avoid flash
  useEffect(() => {
    document.body.dataset.scrolled = scrolled ? 'true' : 'false'
    document.body.classList.toggle('nav-raised', raised)
  }, [scrolled, raised])

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: raised ? 'var(--color-canvas)' : 'rgba(0,0,0,0)',
        borderBottomColor: raised ? 'var(--color-hairline)' : 'rgba(0,0,0,0)',
      }}
      transition={spring}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      style={{
        backdropFilter: raised ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: raised ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-10">
        {/* Desktop: single unified row with equidistant spacing.
            BrandBridge wordmark left, 7 nav links center, theme toggle + CTA right.
            All items on one horizontal line with consistent gap. */}
        <div className="flex w-full items-center gap-4 lg:gap-6">
          {/* Brand wordmark — distinct left anchor */}
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
            aria-label="BrandBridge home"
            onClick={() => setOpen(false)}
          >
            <BrandLogo size={28} />
            <span className="whitespace-nowrap font-display text-[18px] leading-none tracking-[-0.01em] text-[--color-ink]">
              BrandBridge
            </span>
          </a>

          {/* Navigation links — centered group with uniform spacing */}
          <ul className="hidden items-center gap-4 lg:flex lg:gap-5 shrink-0 mx-auto" role="navigation" aria-label="Main navigation">
            {links.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`group relative block rounded-[4px] px-1.5 py-1 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] lg:text-[13px] ${
                      isActive ? 'text-[--color-ink]' : 'text-[--color-body] hover:text-[--color-ink]'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                    {/* Active-scene indicator — spring-driven rule beneath the label */}
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={reduce ? { duration: 0.01 } : spring}
                      style={{ transformOrigin: 'left center' }}
                      className="pointer-events-none absolute inset-x-1.5 -bottom-0.5 h-px w-auto origin-left bg-[--color-primary]"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right actions: theme toggle + CTA, unified spacing */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex ml-auto">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <Button href="#contact" icon size="sm">
              {config.ctaLabel}
            </Button>
          </div>
        </div>

        {/* Mobile toggle — press feedback via spring (Apple: respond on pointer-down) */}
        <motion.button
          type="button"
          whileTap={reduce ? undefined : { scale: 0.94, transition: spring }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[--color-hairline] text-[--color-ink] transition-colors hover:border-[--color-hairline-strong] hover:bg-[--color-surface-soft] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
        </motion.button>
      </nav>

      {/* Mobile sheet — conditionally rendered so AnimatePresence can actually
          run its exit animation. While open, it reads as a spatial extension
          of the header, not a floating card. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-sheet"
            id="mobile-menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0.01 } : spring}
            className="overflow-hidden border-t border-[--color-hairline] bg-[--color-canvas] px-5 pb-8 pt-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-[8px] px-2 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                    >
                      <span
                        className={`relative block pl-3 text-[17px] leading-tight transition-colors hover:text-[--color-ink] ${isActive ? 'text-[--color-ink]' : 'text-[--color-body]'}`}
                      >
                        <motion.span
                          aria-hidden="true"
                          initial={false}
                          animate={{
                            scale: isActive ? 1 : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={reduce ? { duration: 0.01 } : spring}
                          className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[--color-primary]"
                        />
                        {l.label}
                      </span>
                      <span
                        className={`mt-0.5 block pl-3 font-mono text-[10px] uppercase leading-[1.3] tracking-[0.14em] transition-colors ${isActive ? 'text-[--color-primary]' : 'text-[--color-muted-soft]'}`}
                      >
                        {l.caption}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <ThemeToggle theme={theme} onToggle={toggle} />
              <Button href="#contact" icon full onClick={() => setOpen(false)}>
                {config.ctaLabel}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const dark = theme === 'dark'
  const reduce = useReducedMotion()
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.3 }

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={reduce ? undefined : { scale: 0.94, transition: spring }}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[--color-hairline] text-[--color-muted] transition-colors hover:border-[--color-hairline-strong] hover:bg-[--color-surface-soft] hover:text-[--color-ink] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
    >
      {dark ? (
        <Sun size={18} weight="regular" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="regular" aria-hidden="true" />
      )}
    </motion.button>
  )
}