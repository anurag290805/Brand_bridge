import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Check, Sparkle, UserCheck, Briefcase } from '@phosphor-icons/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

export default function WhoItsFor() {
  const [activeTab, setActiveTab] = useState<'creator' | 'brand'>('creator')
  const reduce = useReducedMotion()
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.35 }

  const creatorPoints = [
    {
      title: 'Focus on authentic content',
      desc: 'Do what you do best. Keep creating content your audience loves without spending hours pitching yourself.',
    },
    {
      title: 'We find relevant opportunities',
      desc: 'No random cold pitches. BrandBridge surfaces brand sponsorships that genuinely fit your profile and niche.',
    },
    {
      title: 'Stop constantly chasing brands',
      desc: 'Say goodbye to unanswered DMs and cold emails. Opportunities are matched to you when a campaign aligns.',
    },
    {
      title: 'Create & get paid fairly',
      desc: 'Transparent commercial terms with 85% of campaign revenue going straight to you with clear timelines.',
    },
  ]

  const brandPoints = [
    {
      title: 'Share campaign & audience needs',
      desc: 'Define your target audience, niche, deliverables, and budget parameters once.',
    },
    {
      title: 'We locate relevant creators',
      desc: 'BrandBridge evaluates creator alignment, engagement, and audience fit before making introductions.',
    },
    {
      title: 'Clear expectations from day one',
      desc: 'No vague promises. Commercial terms, scope, and deliverables are aligned clearly before launching.',
    },
    {
      title: 'Efficient campaign execution',
      desc: 'Move from brief to live content smoothly without administrative overhead or back-and-forth friction.',
    },
  ]

  return (
    <section id="who-its-for" className="relative scroll-mt-24 py-24 md:py-32 overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[--color-primary]">
              Built for both sides
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
              Who is BrandBridge for?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[--color-body]">
              Whether you are a creator looking for meaningful brand partnerships or a brand seeking authentic creator reach.
            </p>
          </div>
        </Reveal>

        {/* Polished Animated Toggle */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex justify-center">
            <div className="relative inline-flex items-center rounded-full border border-[--color-hairline-strong] bg-[--color-surface-dark] p-1 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('creator')}
                className={`relative z-10 flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === 'creator' ? 'text-[--color-cta-text]' : 'text-[--color-muted] hover:text-[--color-ink]'
                }`}
              >
                {activeTab === 'creator' && (
                  <motion.div
                    layoutId="tab-pill"
                    transition={reduce ? { duration: 0.01 } : spring}
                    className="absolute inset-0 z-[-1] rounded-full bg-[--color-cta-bg] shadow-md"
                  />
                )}
                <UserCheck size={18} weight="bold" />
                <span>For Creators</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('brand')}
                className={`relative z-10 flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                  activeTab === 'brand' ? 'text-[--color-cta-text]' : 'text-[--color-muted] hover:text-[--color-ink]'
                }`}
              >
                {activeTab === 'brand' && (
                  <motion.div
                    layoutId="tab-pill"
                    transition={reduce ? { duration: 0.01 } : spring}
                    className="absolute inset-0 z-[-1] rounded-full bg-[--color-cta-bg] shadow-md"
                  />
                )}
                <Briefcase size={18} weight="bold" />
                <span>For Brands</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Tab Content Display */}
        <div className="mt-14 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'creator' ? (
              <motion.div
                key="creator-tab"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={spring}
                className="grid gap-6 md:grid-cols-2"
              >
                {creatorPoints.map((item, idx) => (
                  <div
                    key={item.title}
                    className="glass-panel relative rounded-[16px] p-7 transition-all duration-300 hover:border-[--color-primary]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-primary-soft] text-[--color-primary]">
                        <Check size={20} weight="bold" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-[--color-ink]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[--color-body]">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="brand-tab"
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                transition={spring}
                className="grid gap-6 md:grid-cols-2"
              >
                {brandPoints.map((item, idx) => (
                  <div
                    key={item.title}
                    className="glass-panel relative rounded-[16px] p-7 transition-all duration-300 hover:border-[#6366f1]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-glow-blue] text-[--color-accent-blue]">
                        <Sparkle size={20} weight="bold" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-[--color-ink]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[--color-body]">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
