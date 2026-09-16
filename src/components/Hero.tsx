import { useMemo, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '../lib/Button'
import { Container } from '../lib/Container'

/**
 * HERO · THE OPENING SHOT
 * ONE composed viewport: CREATOR (a field of fine signals, left) ─→ the
 * BrandBridge mark at the centre, where a thin connection line draws in ─→
 * BRAND (a field of signals, right).
 *
 * Mobile is a first-class composition — a compact signal strip above the
 * mark rather than empty side columns. Scroll hands off to the persistent
 * film thread; reduced-motion users get a resolved, static hero.
 */
export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const creatorSignals = useMemo(() => makeSignals(22, 1), [])
  const brandSignals = useMemo(() => makeSignals(18, 9), [])

  // Scroll-linked departure: 0 at hero top, 1 when the hero has left the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const centerY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const centerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const creatorX = useTransform(scrollYProgress, [0, 1], [0, -70])
  const brandX = useTransform(scrollYProgress, [0, 1], [0, 70])
  const sideOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const creatorStyle = reduce ? {} : { x: creatorX, opacity: sideOpacity }
  const brandStyle = reduce ? {} : { x: brandX, opacity: sideOpacity }

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* Atmosphere is supplied by the persistent FilmLayer behind the page;
          no local gradient here, so the hero reads as part of one space. */}
      <div className="absolute inset-x-0 top-[46%] z-0 hidden lg:block" aria-hidden="true">
        <div className="relative mx-auto h-px w-full max-w-6xl bg-[--color-hairline]">
          <motion.span
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0.5, originY: 0.5 }}
            className="absolute inset-0 bg-[--color-primary]/40"
          />
        </div>
      </div>

      <Container className="relative z-10 flex min-h-[96svh] flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:items-center lg:gap-6 pt-16 pb-8 lg:pt-20 lg:pb-16">
        {/* Mobile: a compact horizontal signal strip above the mark */}
        <div className="flex items-center gap-3 pt-4 lg:hidden" aria-hidden="true">
          <span className="h-px flex-1 bg-[--color-hairline]" />
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[--color-primary]/60" />
            <span className="h-px w-8 bg-[--color-hairline-strong]" />
            <span className="h-1 w-1 rounded-full bg-[--color-primary]/60" />
          </span>
          <span className="h-px flex-1 bg-[--color-hairline]" />
        </div>

        {/* ── LEFT · Creator signal field (desktop only) ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={creatorStyle}
          className="hidden lg:flex h-[46vh] min-h-[320px] items-center justify-center"
          aria-hidden="true"
        >
          <SignalField signals={creatorSignals} align="right" />
        </motion.div>

        {/* ── CENTRE · The convergence ── */}
        <motion.div
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          style={exitStyle}
          className="mx-auto flex w-full max-w-2xl flex-col items-center text-center lg:px-4 pt-6 lg:pt-0"
        >
          <Item variants={itemVariants}>
            <h1 className="font-display text-[clamp(2.5rem,8.5vw,5.6rem)] leading-[1.03] tracking-[-0.02em] text-[--color-ink]">
              The right creator.
              <br />
              <span className="italic text-[--color-primary]">The right brand.</span>
            </h1>
          </Item>

          <Item variants={itemVariants}>
            <p className="mx-auto mt-6 max-w-[46ch] text-[15px] leading-relaxed text-[--color-body] sm:text-[16px]">
              BrandBridge connects creators with sponsorships that fit their audience, style and niche, while helping brands find relevant partnerships.
            </p>
          </Item>

          <Item variants={itemVariants}>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <Button href="#contact" icon full>
                Start a conversation
              </Button>
              <Button href="#process" variant="secondary" full>
                See how it works
              </Button>
            </div>
          </Item>
        </motion.div>

        {/* ── RIGHT · Brand signal field (desktop only) ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          style={brandStyle}
          className="hidden lg:flex h-[46vh] min-h-[320px] items-center justify-center"
          aria-hidden="true"
        >
          <SignalField signals={brandSignals} align="left" structured />
        </motion.div>

        {/* Mobile bottom signal strip — mirrors the top, closes the frame */}
        <div className="mt-10 flex items-center gap-3 lg:hidden" aria-hidden="true">
          <span className="h-px flex-1 bg-[--color-hairline]" />
          <span className="flex items-center gap-1.5">
            <span className="h-px w-8 bg-[--color-hairline-strong]" />
            <span className="h-1 w-1 rounded-full bg-[--color-primary]/60" />
            <span className="h-px w-8 bg-[--color-hairline-strong]" />
          </span>
          <span className="h-px flex-1 bg-[--color-hairline]" />
        </div>
      </Container>
    </section>
  )
}

/* Shared staggered item - resolves quietly on load only; the exit is scroll. */
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function Item({
  children,
  variants,
}: {
  children: ReactNode
  variants: typeof itemVariants
}) {
  return <motion.div variants={variants}>{children}</motion.div>
}

/* ── SIGNAL FIELD ── */
type SignalKind = 'dot' | 'tick' | 'ring'

interface Signal {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  kind: SignalKind
  rot: number
}

function makeSignals(count: number, salt: number): Signal[] {
  const rnd = (i: number, s: number) => {
    const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453
    return v - Math.floor(v)
  }
  return Array.from({ length: count }, (_, i) => {
    const k = rnd(i, salt + 1)
    const kind: SignalKind = k < 0.55 ? 'dot' : k < 0.78 ? 'tick' : 'ring'
    return {
      id: i,
      x: rnd(i, salt + 2) * 100,
      y: rnd(i, salt + 3) * 100,
      size:
        kind === 'dot'
          ? 2 + rnd(i, salt + 4) * 3
          : kind === 'tick'
            ? 12 + rnd(i, salt + 4) * 16
            : 8 + rnd(i, salt + 4) * 12,
      opacity: 0.16 + rnd(i, salt + 5) * 0.42,
      kind,
      rot: rnd(i, salt + 6) * 120 - 60,
    }
  })
}

function SignalField({
  signals,
  align,
  structured = false,
}: {
  signals: Signal[]
  align: 'left' | 'right'
  structured?: boolean
}) {
  return (
    <div className={`relative h-full w-[82%] ${align === 'right' ? 'ml-auto' : ''}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[--color-hairline-soft]" aria-hidden="true" />
      {signals.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
        >
          {s.kind === 'dot' && (
            <span
              className={`block ${structured ? 'rounded-[1px] bg-[--color-primary]' : 'rounded-full bg-[--color-primary]'}`}
              style={{ width: s.size, height: s.size }}
            />
          )}
          {s.kind === 'tick' && (
            <span
              className="block bg-[--color-primary]"
              style={{ width: s.size, height: 1, transform: `rotate(${s.rot}deg)` }}
            />
          )}
          {s.kind === 'ring' && (
            <span
              className="block rounded-full border border-[--color-primary]/60"
              style={{ width: s.size, height: s.size }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
