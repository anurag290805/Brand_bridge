import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

const points = [
  { title: 'No exaggerated promises', body: 'If we cannot do it, we do not claim it. You get an honest picture of how we work.' },
  { title: 'You review first', body: 'Every opportunity is shown to you before you decide whether to take part.' },
  { title: 'Clear details', body: 'Campaign information is communicated plainly, so you know what you are considering.' },
  { title: 'You stay in control', body: 'You choose which collaborations to pursue. Nothing is signed without your go-ahead.' },
  { title: 'We facilitate the connection', body: 'BrandBridge helps bring creator and brand together. The fit always comes first.' },
]

/**
 * TRUST · EDITORIAL STATEMENTS, SCROLL-PROGRESSIVE
 * Not a flat list and not feature cards. Five principles that read as a
 * deliberate editorial sequence: as each line enters the reading band it steps
 * to full emphasis (current), holds at a settled readable state once passed
 * (completed), and the ones ahead stay softly muted but never invisible
 * (upcoming).
 *
 * Per-line scroll linkage with entirely independent triggers — no shared DOM
 * measurement, none of the fade that leaves text unreadable.
 */
export default function TrustSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-[--color-ink]">
              Straightforward by design.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[--color-body]">
              You were probably unsure whether to reply to a cold message. That is fair. Here is
              how we actually treat you.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {points.map((p, i) => (
            <PrincipleRow
              key={p.title}
              index={i}
              offset={i % 2 === 1}
              title={p.title}
              body={p.body}
            />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-lg border-t border-[--color-hairline] pt-8 font-display text-xl italic leading-relaxed text-[--color-body]">
            If we cannot find a fit, we will say so. No promises we cannot keep.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

function PrincipleRow({
  index,
  offset,
  title,
  body,
}: {
  index: number
  offset: boolean
  title: string
  body: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const num = String(index + 1).padStart(2, '0')

  // Row travels 0 → 1 as its top moves from just below the fold to the reading band.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.96', 'start 0.28'],
  })

  // upcoming → current → completed (settled, never invisible)
  const rowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.45, 1, 1, 0.86])
  // a short primary pulse that peaks only while the row is the one in focus
  const focus = useTransform(scrollYProgress, [0.2, 0.5, 0.85], [0, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity: rowOpacity, willChange: 'opacity' }}
      className={`border-t border-[--color-hairline] ${offset ? 'md:ml-[10%]' : ''}`}
    >
      <div className={`relative flex gap-6 py-9 md:gap-10 ${offset ? 'md:pr-[10%]' : ''}`}>
        {/* leading current-mark — appears only on the line in focus */}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            style={{ opacity: focus, scaleY: focus }}
            className="absolute bottom-3 left-0 top-3 w-px origin-top bg-[--color-primary]"
          />
        )}

        <span className="relative w-8 shrink-0 pt-1 font-mono text-[11px] tabular-nums text-[--color-muted]">
          <span className="relative block">
            {num}
            {/* primary duplicate cross-fades to mark the focused step */}
            <motion.span
              aria-hidden="true"
              style={{ opacity: reduce ? 0 : focus }}
              className="absolute inset-0 text-[--color-primary]"
            >
              {num}
            </motion.span>
          </span>
        </span>

        <div>
          <h3 className="font-display text-2xl leading-tight tracking-[-0.01em] text-[--color-ink] md:text-3xl">
            {title}
          </h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[--color-muted]">{body}</p>
        </div>
      </div>
    </motion.div>
  )
}