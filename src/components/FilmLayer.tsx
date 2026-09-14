import { useMemo, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import type { MotionValue } from 'motion/react'

/**
 * FILM LAYER · THE PERSISTENT WORLD (GPU-OPTIMIZED)
 * =================================================
 * ONE continuous cinematic environment behind the whole page.
 *
 * Three ambient light fields (warm, blue, purple) sit on a fixed, full-viewport
 * layer and drift with the page scroll at slightly different rates, so the
 * atmosphere reads as a single space that keeps evolving rather than per-section
 * gradient blocks. A fine signal thread and a handful of depth dots complete
 * the scene.
 *
 * Performance contract:
 *   - Fixed, pointer-events-none layer — zero interaction cost.
 *   - Only `transform` + `opacity` animate (GPU). No scroll listeners, no
 *     layout reads, no per-frame React state. Motion values drive everything.
 *   - `prefers-reduced-motion` collapses to a static, still-legible atmosphere.
 */

const VB_W = 1440
const VB_H = 900

const TRAJ = {
  x: [16, 20, 32, 50, 63, 74, 68, 57, 50],
  y: [13, 26, 39, 47, 59, 71, 82, 90, 97],
  p: [0, 0.1, 0.22, 0.34, 0.5, 0.66, 0.8, 0.92, 1],
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

function pointAt(p: number): { x: number; y: number } {
  const P = TRAJ.p
  let seg = P.length - 2
  for (let i = 0; i < P.length - 1; i++) {
    if (p <= P[i + 1]) {
      seg = i
      break
    }
  }
  const p0 = P[seg]
  const p1 = P[seg + 1]
  const t = clamp01((p - p0) / (p1 - p0))
  const e = t * t * (3 - 2 * t)
  return {
    x: TRAJ.x[seg] + (TRAJ.x[seg + 1] - TRAJ.x[seg]) * e,
    y: TRAJ.y[seg] + (TRAJ.y[seg + 1] - TRAJ.y[seg]) * e,
  }
}

function buildPath(samples = 80): string {
  let d = ''
  for (let i = 0; i <= samples; i++) {
    const { x, y } = pointAt(i / samples)
    const u = (x / 100) * VB_W
    const v = (y / 100) * VB_H
    d += `${i === 0 ? 'M' : 'L'}${u.toFixed(1)} ${v.toFixed(1)}`
  }
  return d
}

interface DepthDotSpec {
  id: number
  x: number
  y: number
  size: number
  drift: number
  phase: number
  mobile: boolean
}

function makeDots(count: number, salt: number): DepthDotSpec[] {
  const rnd = (i: number, s: number) => {
    const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453
    return v - Math.floor(v)
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 4 + rnd(i, salt + 1) * 92,
    y: 6 + rnd(i, salt + 2) * 88,
    size: 1.5 + rnd(i, salt + 3) * 2,
    drift: (rnd(i, salt + 4) - 0.5) * 16,
    phase: rnd(i, salt + 5),
    mobile: i < 3, // only 3 dots rendered on mobile for high FPS
  }))
}

/**
 * One drifting light field. A soft radial pool that stays part of the same
 * backdrop and translates along the page scroll slower than the foreground
 * content, producing a quiet depth cue without any layout work.
 */
interface GlowSpec {
  key: string
  left: string
  top: string
  width: string // e.g. "110vmax"
  height: string
  radial: string // the color-stop string for the radial-gradient
  /** vertical drift in px across full page scroll */
  yDrift: [number, number]
  /** horizontal drift in px across full page scroll */
  xDrift: [number, number]
  /** opacity across scroll; commas readable */
  opacity: [number, number, number, number, number]
}

const GLOWS: GlowSpec[] = [
  {
    key: 'warm',
    left: '50%',
    top: '-18%',
    width: '120vmax',
    height: '120vmax',
    radial: 'var(--color-primary-glow), transparent 60%',
    yDrift: [0, 120],
    xDrift: [0, 20],
    opacity: [0.7, 0.5, 0.4, 0.55, 0.7],
  },
  {
    key: 'blue',
    left: '112%',
    top: '-12%',
    width: '86vmax',
    height: '86vmax',
    radial: 'var(--color-glow-blue), transparent 62%',
    yDrift: [30, 190],
    xDrift: [0, -60],
    opacity: [0.5, 0.45, 0.55, 0.6, 0.5],
  },
  {
    key: 'purple',
    left: '-14%',
    top: '66%',
    width: '96vmax',
    height: '96vmax',
    radial: 'var(--color-glow-purple), transparent 62%',
    yDrift: [0, 240],
    xDrift: [30, 70],
    opacity: [0.55, 0.6, 0.5, 0.45, 0.6],
  },
]

/** Progress breakpoints (lookup table for per-glow opacity curves). */
const OP_BREAKS = [0, 0.2, 0.6, 0.85, 1]

function Glow({ spec, progress, reduce }: { spec: GlowSpec; progress: MotionValue<number>; reduce: boolean }) {
  const y = useTransform(progress, [0, 1], spec.yDrift)
  const x = useTransform(progress, [0, 1], spec.xDrift)
  const opacity = useTransform(progress, OP_BREAKS, spec.opacity)

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        left: spec.left,
        top: spec.top,
        width: spec.width,
        height: spec.height,
        marginLeft: `calc(${spec.width} / -2)`,
        background: `radial-gradient(circle at center, ${spec.radial})`,
        ...(reduce
          ? {}
          : { y, x, opacity, willChange: 'transform, opacity' }),
      }}
    />
  )
}

export default function FilmLayer() {
  const reduce = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll()
  const gRef = useRef<SVGGElement>(null)

  const d = useMemo(() => buildPath(), [])
  const dots = useMemo(() => makeDots(10, 7), [])

  const dash = useTransform(scrollYProgress, [0, 1], [1, 0])

  // GPU translate3d hardware position update for head signal
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!gRef.current) return
    const { x, y } = pointAt(clamp01(p))
    const u = (x / 100) * VB_W
    const v = (y / 100) * VB_H
    gRef.current.style.transform = `translate3d(${u}px, ${v}px, 0)`
  })

  return (
    <div className="film-layer pointer-events-none" aria-hidden="true">
      {/* The single continuous atmosphere — three light fields that drift
          with scroll as one space, at slightly different rates for depth. */}
      {GLOWS.map((g) => (
        <Glow key={g.key} spec={g} progress={scrollYProgress} reduce={reduce} />
      ))}

      {/* Depth signals */}
      {dots.map((dot) => (
        <DepthDot key={dot.id} dot={dot} progress={scrollYProgress} reduce={reduce} />
      ))}

      {/* Signal thread */}
      <svg
        className="film-thread"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={d} vectorEffect="non-scaling-stroke" className="stroke-[--color-hairline]" strokeWidth="1" />
        {!reduce && (
          <>
            <motion.path
              d={d}
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: dash, willChange: 'stroke-dashoffset' }}
              vectorEffect="non-scaling-stroke"
              className="stroke-[--color-primary]/35"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* GPU-translated signal head */}
            <g ref={gRef} style={{ transform: 'translate3d(230px, 117px, 0)', willChange: 'transform' }}>
              <circle r="14" cx="0" cy="0" className="fill-[--color-primary-glow]" />
              <circle r="3" cx="0" cy="0" className="fill-[--color-primary]" />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}

function DepthDot({
  dot,
  progress,
  reduce,
}: {
  dot: DepthDotSpec
  progress: MotionValue<number>
  reduce: boolean
}) {
  const x = useTransform(progress, [0, 1], [0, dot.drift])
  const y = useTransform(progress, [0, 1], [0, dot.drift * (dot.phase < 0.5 ? 1.2 : -1)])

  if (reduce) {
    return (
      <span
        className={`film-dot ${dot.mobile ? '' : 'hidden md:block'}`}
        style={{
          left: `${dot.x}%`,
          top: `${dot.y}%`,
          width: dot.size,
          height: dot.size,
        }}
      />
    )
  }

  return (
    <motion.span
      className={`film-dot ${dot.mobile ? '' : 'hidden md:block'}`}
      style={{
        left: `${dot.x}%`,
        top: `${dot.y}%`,
        width: dot.size,
        height: dot.size,
        x,
        y,
        willChange: 'transform',
      }}
    />
  )
}