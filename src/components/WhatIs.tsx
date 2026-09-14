import { useMemo, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'
import { BridgeGlyph } from '../lib/BrandMark'

/**
 * WHAT IS BRANDBRIDGE · ACT 01 → 02 (THE CONNECTION)
 *
 * The headline carries the message; beneath it a composed, minimal system
 * reads the connection as a bridge: CREATOR node ──audience dots── BRANDBRIDGE
 * ── BRAND node. The geometry mirrors the brand mark itself (two signal nodes
 * joined by a bridge), so the diagram belongs to BrandBridge rather than being
 * a generic flowchart.
 *
 * GPU-optimized: only transform/opacity animate, scroll-linked, no blur.
 */
export default function WhatIs() {
  const reduce = useReducedMotion()
  const eqRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: eq } = useScroll({
    target: eqRef,
    offset: ['start 0.9', 'start 0.5'],
  })
  const lineScale = useTransform(eq, [0, 1], [0, 1])
  const marksOpacity = useTransform(eq, [0.5, 1], [0, 1])
  const dotsOpacity = useTransform(eq, [0.35, 0.85], [0, 1])
  const dotsY = useTransform(eq, [0.45, 1], [10, 0])

  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const rnd = (s: number) => {
          const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453
          return v - Math.floor(v)
        }
        const leftish = i < 7
        const t = leftish ? rnd(1) * 0.34 : 0.66 + rnd(2) * 0.34
        return {
          id: i,
          left: leftish ? 14 + t * 34 : 52 + t * 34,
          top: 30 + rnd(3) * 40,
          size: 1.6 + rnd(4) * 2.4,
          opacity: 0.16 + rnd(5) * 0.3,
        }
      }),
    []
  )

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <Reveal from={0.94} to={0.55}>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
              Creators build audiences.
              <br />
              Brands want to reach them.
            </h2>
          </Reveal>
          <Reveal delay={0.08} from={0.9} to={0.5}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[--color-body]">
              The hard part is the fit. BrandBridge is the connection between the audience an
              influencer has built and the brand that genuinely wants to reach it.
            </p>
          </Reveal>
        </div>

        {/* The connection system — Creator → BrandBridge → Brand */}
        <div ref={eqRef} className="mt-16 md:mt-20">
          <div className="relative">
            {/* Diagram layer behind the stations */}
            <div className="absolute inset-x-[2%] top-1/2 hidden -translate-y-1/2 md:block" aria-hidden="true">
              <svg viewBox="0 0 1000 220" fill="none" className="w-full" preserveAspectRatio="none">
                {/* Bridge line — draws in on scroll */}
                <motion.line
                  x1="110"
                  y1="110"
                  x2="890"
                  y2="110"
                  className="stroke-[--color-hairline-strong]"
                  strokeWidth="1"
                  style={reduce ? undefined : { scaleX: lineScale, transformOrigin: '110px 110px' }}
                />

                {/* Audience / connection dots travelling both approaches */}
                <motion.g style={reduce ? undefined : { opacity: dotsOpacity, y: dotsY }}>
                  {dots.map((d) => (
                    <circle
                      key={d.id}
                      cx={d.id < 7 ? 110 + ((d.left - 14) / 34) * 320 : 680 + ((d.left - 52) / 34) * 210}
                      cy={d.top + (d.size / 2)}
                      r={d.size / 2}
                      className="fill-[--color-primary]"
                      opacity={d.opacity}
                    />
                  ))}
                </motion.g>

                {/* Outer node rings at the two poles, echoing the brand mark */}
                <motion.g style={reduce ? undefined : { opacity: marksOpacity }}>
                  <circle cx="110" cy="110" r="30" className="stroke-[--color-hairline-strong]" strokeWidth="1" />
                  <circle cx="110" cy="110" r="4" className="fill-[--color-primary]" />
                  <circle cx="890" cy="110" r="30" className="stroke-[--color-hairline-strong]" strokeWidth="1" />
                  <circle cx="890" cy="110" r="4" className="fill-[--color-primary]" />
                </motion.g>
              </svg>
            </div>

            {/* Three stations sit above the diagram so the typography leads */}
            <div className="relative">
              <div className="grid gap-10 md:grid-cols-3 md:gap-6">
                <EqStation progress={eq} delay={0} className="flex items-center md:justify-end">
                  <Station top="Creator" bottom="audience, voice" mono className="md:text-right" />
                </EqStation>

                <EqStation progress={eq} delay={0.15} className="flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    {/* soft halo behind the central glyph — the strongest node */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute h-24 w-24 -translate-y-2 rounded-full bg-[--color-primary-glow]"
                      style={reduce ? undefined : { opacity: marksOpacity, scale: lineScale }}
                    />
                    <BridgeGlyph size={46} className="relative text-[--color-primary]" />
                    <span className="mt-4 font-display italic text-xl text-[--color-primary]">bridges</span>
                  </div>
                </EqStation>

                <EqStation progress={eq} delay={0.3} className="flex items-center">
                  <Station top="Brand" bottom="opportunity, reach" mono className="md:text-left" />
                </EqStation>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** One station of the connection, resolving on the shared scroll progress. */
function EqStation({
  progress,
  delay,
  className = '',
  children,
}: {
  progress: MotionValue<number>
  delay: number
  className?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const opacity = useTransform(progress, [delay, delay + 0.5], [0, 1])
  const y = useTransform(progress, [delay, delay + 0.5], [18, 0])
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} style={{ opacity, y, willChange: 'opacity, transform' }}>
      {children}
    </motion.div>
  )
}

function Station({
  top,
  bottom,
  mono = false,
  className = '',
}: {
  top: string
  bottom: string
  mono?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <p className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-none tracking-[-0.02em] text-[--color-ink]">
        {top}
      </p>
      <p
        className={`mt-3 text-[11px] uppercase tracking-[0.22em] ${
          mono ? 'font-mono' : 'font-medium'
        } text-[--color-muted]`}
      >
        {bottom}
      </p>
    </div>
  )
}