import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * STARFIELD · CANVAS-BASED 3D DEPTH BACKGROUND
 * ============================================
 * A quiet, full-screen starfield behind the whole page. Stars are projected
 * from a 3D camera volume onto a 2D canvas and drift toward the viewer, so
 * the scene reads as space moving past the lens. Each star has its own size,
 * opacity and independent twinkle phase; a soft mouse parallax tilts the
 * whole volume for a subtle depth cue.
 *
 * Brought over from the reference Final.html — the starfield ONLY. It shares
 * the same contract as the FilmLayer below it:
 *   - Fixed, pointer-events-none layer · zero interaction cost.
 *   - One rAF loop; re-seeds only when the mobile/desktop bucket changes on
 *     resize. No React state in the render path.
 *   - `prefers-reduced-motion` disables the effect entirely — the existing
 *     static atmosphere still carries the scene.
 */

interface Star {
  x: number
  y: number
  z: number
  size: number
  a: number
  p: number
  s: number
}

const WIDTH = 2000
const DEPTH = 1000
/** Camera-to-projection-plane distance in px; smaller = stronger perspective. */
const PERSPECTIVE = 300

/** Fewer stars on small screens to hold frame-rate (matches reference). */
function countFor(mobile: boolean): number {
  return mobile ? 140 : 280
}

function makeStars(mobile: boolean): Star[] {
  return Array.from({ length: countFor(mobile) }, () => ({
    x: (Math.random() - 0.5) * WIDTH,
    y: (Math.random() - 0.5) * WIDTH,
    z: Math.random() * DEPTH,
    size: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.7 + 0.3,
    p: Math.random() * Math.PI * 2,
    s: Math.random() * 0.03 + 0.005,
  }))
}

export default function Starfield() {
  const reduce = Boolean(useReducedMotion())

  // The whole effect is motion; with reduced motion we render nothing and
  // rely on the existing static atmosphere, mirroring the FilmLayer's collapse.
  if (reduce) return null

  return <StarCanvas />
}

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let stars = makeStars(false)
    let mobile = matchMedia('(max-width: 760px)').matches
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let rafId = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      // Re-seed only when the star-count bucket changes, so the field is
      // stable across ordinary window resizes.
      const nextMobile = matchMedia('(max-width: 760px)').matches
      if (nextMobile !== mobile) {
        mobile = nextMobile
        stars = makeStars(mobile)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.08
      targetY = (e.clientY - window.innerHeight / 2) * 0.08
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05
      for (const s of stars) {
        s.z -= 0.6
        if (s.z <= 0) {
          s.z = DEPTH
          s.x = (Math.random() - 0.5) * WIDTH
          s.y = (Math.random() - 0.5) * WIDTH
        }
        s.p += s.s
        const scale = PERSPECTIVE / (PERSPECTIVE + s.z)
        const x = (s.x + mouseX * (DEPTH - s.z) * 0.001) * scale + width / 2
        const y = (s.y + mouseY * (DEPTH - s.z) * 0.001) * scale + height / 2
        if (x < 0 || x > width || y < 0 || y > height) continue
        const alpha = (1 - s.z / DEPTH) * s.a * (0.7 + 0.3 * Math.sin(s.p))
        const radius = Math.max(0.4, s.size * scale * 1.8)
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(238, 241, 246, ${alpha})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="starfield-layer" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}