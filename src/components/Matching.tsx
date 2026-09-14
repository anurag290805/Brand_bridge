import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Users, Faders, CheckCircle, ArrowRight, ShieldCheck, Target } from '@phosphor-icons/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

interface Criteria {
  id: string
  title: string
  subtitle: string
  description: string
  icon: typeof Users
  metrics: string[]
}

const CRITERIA: Criteria[] = [
  {
    id: 'audience',
    title: 'Audience Fit',
    subtitle: 'Relevance over follower count',
    description:
      'We look past vanity metrics. The key is whether the creator’s real audience demographic and geographic focus align with the brand target.',
    icon: Users,
    metrics: ['Demographic relevance', 'Geographic distribution', 'Genuine engagement rate'],
  },
  {
    id: 'content',
    title: 'Content Fit',
    subtitle: 'Style, tone and aesthetic',
    description:
      'A collaboration should feel natural on the creator’s feed. We match brands with creators whose existing visual style and tone fit organically.',
    icon: Faders,
    metrics: ['Visual aesthetic match', 'Tone & storytelling style', 'Previous brand harmony'],
  },
  {
    id: 'campaign',
    title: 'Campaign Fit',
    subtitle: 'Scope and commercial terms',
    description:
      'Both sides must align on deliverables, timelines, usage rights, and compensation before anything moves forward. No ambiguities.',
    icon: Target,
    metrics: ['Deliverable clarity', 'Timeline feasibility', 'Fair commercial terms'],
  },
]

export default function Matching() {
  const [selectedCriteria, setSelectedCriteria] = useState<string>('audience')
  const reduce = useReducedMotion()
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.35 }

  const activeObj = CRITERIA.find((c) => c.id === selectedCriteria) || CRITERIA[0]

  return (
    <section id="matching" className="relative scroll-mt-24 py-24 md:py-32 overflow-hidden">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[--color-primary]">
              Matching Philosophy
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
              Context before connection.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[--color-body]">
              BrandBridge evaluates every potential sponsorship on three core pillars of fit before introducing a creator to a brand.
            </p>
          </div>
        </Reveal>

        {/* Visual Flow diagram: Creator -> BrandBridge -> Evaluation -> Relevant Matches */}
        <Reveal delay={0.08}>
          <div className="mt-14 glass-panel rounded-[20px] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2">
              {/* Node 1: Creator */}
              <div className="flex w-full lg:w-1/4 flex-col items-center text-center p-4 rounded-[12px] bg-[--color-surface-soft]/40 border border-[--color-hairline]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[--color-primary-soft] text-[--color-primary] mb-3">
                  <Users size={24} weight="regular" />
                </div>
                <span className="font-display text-xl text-[--color-ink]">Creator Profile</span>
                <span className="mt-1 font-mono text-[11px] text-[--color-muted]">Audience & Niche</span>
              </div>

              {/* Arrow 1 */}
              <div className="hidden lg:flex items-center text-[--color-muted]">
                <ArrowRight size={20} className="animate-pulse" />
              </div>

              {/* Node 2: BrandBridge Evaluation */}
              <div className="flex w-full lg:w-1/3 flex-col items-center text-center p-5 rounded-[14px] bg-[--color-surface-dark] border border-[--color-primary]/40 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[--color-primary-glow] to-transparent opacity-20" />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[--color-primary] text-[--color-cta-text] mb-3 shadow-md">
                  <ShieldCheck size={28} weight="fill" />
                </div>
                <span className="font-display text-2xl text-[--color-ink]">Fit Evaluation</span>
                <span className="mt-1 font-mono text-[11px] text-[--color-primary]">BrandBridge Platform</span>
              </div>

              {/* Arrow 2 */}
              <div className="hidden lg:flex items-center text-[--color-muted]">
                <ArrowRight size={20} className="animate-pulse" />
              </div>

              {/* Node 3: Matches */}
              <div className="flex w-full lg:w-1/4 flex-col items-center text-center p-4 rounded-[12px] bg-[--color-surface-soft]/40 border border-[--color-hairline]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[--color-glow-blue] text-[--color-accent-blue] mb-3">
                  <CheckCircle size={24} weight="regular" />
                </div>
                <span className="font-display text-xl text-[--color-ink]">Relevant Match</span>
                <span className="mt-1 font-mono text-[11px] text-[--color-muted]">Mutual Alignment</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Criteria Interactive Selector */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          {/* List of criteria selectors */}
          <div className="space-y-3">
            {CRITERIA.map((item) => {
              const Icon = item.icon
              const isSelected = selectedCriteria === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedCriteria(item.id)}
                  className={`w-full text-left transition-all duration-300 rounded-[14px] p-5 cursor-pointer flex items-start gap-4 border ${
                    isSelected
                      ? 'bg-[--color-surface-soft] border-[--color-primary] shadow-md'
                      : 'bg-transparent border-[--color-hairline] hover:border-[--color-hairline-strong]'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isSelected ? 'bg-[--color-primary] text-[--color-cta-text]' : 'bg-[--color-surface] text-[--color-muted]'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-[--color-ink]">{item.title}</h3>
                    <p className="mt-0.5 font-mono text-[11px] text-[--color-muted]">{item.subtitle}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Detail Display Card */}
          <div className="glass-panel min-h-[300px] rounded-[20px] p-8 relative flex flex-col justify-between">
            <motion.div
              key={activeObj.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-primary]">
                  Evaluation Pillar
                </span>
                <h3 className="mt-2 font-display text-3xl text-[--color-ink]">{activeObj.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[--color-body]">{activeObj.description}</p>
              </div>

              <div className="border-t border-[--color-hairline] pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted] mb-3">
                  Key Evaluation Markers
                </p>
                <div className="space-y-2.5">
                  {activeObj.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[--color-primary]" />
                      <span className="text-[14px] text-[--color-body-strong]">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
