import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { Container } from '../lib/Container'

const processSteps = [
  {
    n: '01',
    title: 'Tell us what you need',
    body: 'Share your campaign, creator profile or collaboration requirements in a few quick steps.',
  },
  {
    n: '02',
    title: 'We find the fit',
    body: 'BrandBridge connects the brief with relevant creators and brands based on true audience and content alignment.',
  },
  {
    n: '03',
    title: 'You align',
    body: 'Deliverables, timelines and commercial terms are agreed clearly before anything goes live. No surprises.',
  },
  {
    n: '04',
    title: 'The campaign runs',
    body: 'The creator delivers the agreed authentic content directly to their engaged audience.',
  },
  {
    n: '05',
    title: 'Create. Get paid.',
    body: 'The campaign closes with the agreed creator payout (85%) and BrandBridge commission (15%).',
  },
]

const SCENE_FADE_IN = [0.02, 0.22, 0.44, 0.66, 0.86]

export default function Process() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let idx = 0
    while (idx < SCENE_FADE_IN.length - 1 && v >= SCENE_FADE_IN[idx + 1]) idx++
    setActive((prev) => (prev === idx ? prev : idx))
  })

  // Fades for each of the 5 scenes
  const s0o = useTransform(scrollYProgress, [SCENE_FADE_IN[0], 0.12, 0.18, 0.24], [0, 1, 1, 0])
  const s1o = useTransform(scrollYProgress, [SCENE_FADE_IN[1], 0.32, 0.38, 0.44], [0, 1, 1, 0])
  const s2o = useTransform(scrollYProgress, [SCENE_FADE_IN[2], 0.54, 0.6, 0.66], [0, 1, 1, 0])
  const s3o = useTransform(scrollYProgress, [SCENE_FADE_IN[3], 0.76, 0.82, 0.88], [0, 1, 1, 0])
  const s4o = useTransform(scrollYProgress, [SCENE_FADE_IN[4], 0.94, 1, 1], [0, 1, 1, 1])

  const sceneOps = [s0o, s1o, s2o, s3o, s4o]
  const stageRail = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

  if (reduce) return <StaticProcess />

  const nextTitle = active < processSteps.length - 1 ? processSteps[active + 1].title : null

  return (
    <section id="process" ref={ref} className="relative scroll-mt-24" style={{ height: '250vh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-[--color-surface-dark]">
        <div className="vignette absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="flex items-end justify-between pt-16 md:pt-20">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-primary]">
                The Journey
              </span>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight tracking-[-0.01em] text-[--color-on-dark]">
                A simple path from introduction to payout.
              </h2>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-on-dark-soft] md:block">
              5 Steps
            </span>
          </div>

          {/* Dynamic Scene display */}
          <div className="relative flex min-h-0 flex-1 items-center">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.n}
                style={{ opacity: sceneOps[i], willChange: 'opacity' }}
                className="absolute inset-0 flex items-center"
                aria-hidden={i !== active}
              >
                <div className="max-w-3xl">
                  <span className="font-mono text-[12px] uppercase tracking-[0.26em] text-[--color-on-dark-primary]">
                    Step {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.03] tracking-[-0.02em] text-[--color-on-dark]">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-[--color-on-dark-soft]">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right vertical step rail */}
          <div
            className="absolute right-5 top-1/2 hidden w-px -translate-y-1/2 bg-white/10 sm:right-8 lg:right-10 lg:flex flex-col"
            style={{ height: '48vh' }}
            aria-hidden="true"
          >
            {processSteps.map((s, i) => (
              <div key={s.n} className="relative flex-1">
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
                  <span
                    className={`h-2 w-2 rounded-full transition-all duration-200 ${
                      i <= active ? 'bg-[--color-on-dark-primary] scale-110' : 'bg-white/20'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer progress bar */}
          <div className="flex items-center justify-between border-t border-white/10 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-on-dark-soft]">
              {nextTitle ? `Next: Step 0${active + 2} — ${nextTitle}` : 'Process complete — scroll to explore niches'}
            </p>
            <div className="relative h-px w-28 bg-white/10 sm:w-44">
              <motion.span
                style={{ scaleX: stageRail, willChange: 'transform' }}
                className="absolute inset-0 origin-left bg-[--color-on-dark-primary]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StaticProcess() {
  return (
    <section id="process" className="scroll-mt-24 bg-[--color-surface-dark] py-24 md:py-32">
      <Container>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-primary]">
          The Journey
        </span>
        <h2 className="mt-2 max-w-xl font-display text-3xl leading-tight tracking-[-0.01em] text-[--color-on-dark] md:text-4xl">
          A simple path from introduction to payout.
        </h2>
        <div className="mt-14 space-y-10">
          {processSteps.map((s) => (
            <div key={s.n} className="grid gap-4 border-t border-white/10 pt-8 md:grid-cols-[auto_1fr] md:gap-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[--color-on-dark-primary]">
                {s.n}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl text-[--color-on-dark]">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[--color-on-dark-soft]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
