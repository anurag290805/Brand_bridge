import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { PawPrint, Sparkle, TShirt, ForkKnife, GameController, Airplane, Heartbeat, MusicNotes } from '@phosphor-icons/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'
import { BridgeGlyph } from '../lib/BrandMark'

interface NicheItem {
  id: string
  name: string
  icon: typeof PawPrint
  description: string
  examples: string
  angle: number // 0 (right) .. 360, clockwise; screen y grows downward
}

/**
 * NICHES CONSTELLATION — a regular, symmetric layout.
 *
 * The eight categories sit on a 45-degree octagon around BrandBridge Core. The
 * orbit ring is a quieter, smaller-radius guide so the category pills breathe
 * outside it; faint spokes run from the core to each category, brightening on
 * the selected one. This is a composed network, not a random scatter.
 *
 * Geometry (all in px, centred):
 *   ORBIT_R = 172        the quiet relationship ring
 *   PILL_R = 215         where the category pills sit (clear of the orbit)
 */
const ORBIT_R = 172
const PILL_R = 215

const NICHES: NicheItem[] = [
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: Sparkle,
    description: 'Daily vlogs, home organization, personal growth, productivity, and authentic lifestyle storytelling.',
    examples: 'Home decor, routines, personal planning brands',
    angle: 270, // top
  },
  {
    id: 'music',
    name: 'Music & Entertainment',
    icon: MusicNotes,
    description: 'Creative audio, festival culture, performance art, film reviews, and pop culture commentary.',
    examples: 'Audio gear, streaming services, event ticketing',
    angle: 225,
  },
  {
    id: 'fashion',
    name: 'Fashion & Beauty',
    icon: TShirt,
    description: 'Style lookbooks, skincare routines, makeup tutorials, capsule wardrobes, and apparel styling.',
    examples: 'Apparel brands, skincare labels, accessory designers',
    angle: 315,
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: PawPrint,
    description: 'Pet care, training tips, animal nutrition, cute companion content, and pet lifestyle products.',
    examples: 'Pet nutrition, accessories, grooming products',
    angle: 180, // left
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    icon: ForkKnife,
    description: 'Recipe creation, culinary reviews, coffee culture, specialty beverages, and kitchenware features.',
    examples: 'Gourmet ingredients, kitchen appliances, beverage brands',
    angle: 0, // right
  },
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    icon: Heartbeat,
    description: 'Workout guides, nutrition tips, mental wellbeing, activewear styling, and health supplements.',
    examples: 'Activewear, supplements, wellness apps',
    angle: 135,
  },
  {
    id: 'tech',
    name: 'Tech & Gaming',
    icon: GameController,
    description: 'Setup tours, software reviews, gaming highlights, gadget unboxings, and digital productivity tools.',
    examples: 'Gaming hardware, SaaS apps, consumer electronics',
    angle: 45,
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    icon: Airplane,
    description: 'Destination guides, hotel experiences, travel gear reviews, cultural exploration, and weekend getaways.',
    examples: 'Luggage brands, boutique stays, travel accessories',
    angle: 90, // bottom
  },
]

export default function Niches() {
  const [selectedId, setSelectedId] = useState<string>('lifestyle')
  const reduce = useReducedMotion()
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.3 }

  const selectedNiche = NICHES.find((n) => n.id === selectedId) || NICHES[0]

  return (
    <section id="niches" className="relative scroll-mt-20 py-20 md:py-28 overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[--color-primary]">
              Focus Areas
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
              Niches & Categories
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[--color-body]">
              BrandBridge connects sponsorships across a spectrum of creator categories. Select a category to explore opportunities.
            </p>
          </div>
        </Reveal>

        {/* Desktop constellation */}
        <Reveal delay={0.06}>
          <div className="mt-12 hidden lg:block relative h-[480px] w-full max-w-3xl mx-auto">
            {/* Ambient aura behind the whole system */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-primary-glow] opacity-20 blur-3xl"
            />

            {/* Quiet orbit ring — a guide with breathing room, never on the pills */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[--color-hairline-strong] opacity-40"
              style={{
                width: ORBIT_R * 2,
                height: ORBIT_R * 2,
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Faint spokes to each category; the selected one lights */}
            {NICHES.map((niche) => {
              const active = selectedId === niche.id
              return (
                <span
                  key={`spoke-${niche.id}`}
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 block h-px origin-left transition-[opacity,background-color] duration-300 ${
                    active ? 'bg-[--color-primary] opacity-50' : 'bg-[--color-hairline] opacity-25'
                  }`}
                  style={{
                    width: PILL_R,
                    transform: `rotate(${niche.angle}deg)`,
                    transformOrigin: 'left center',
                  }}
                />
              )
            })}

            {/* BrandBridge Core — the visual centre */}
            <div className="absolute left-1/2 top-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full">
              {/* soft halo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute h-[150px] w-[150px] rounded-full bg-[--color-primary-soft] opacity-60"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute h-[150px] w-[150px] rounded-full border border-[--color-primary]/25"
              />
              <div className="relative flex h-[122px] w-[122px] flex-col items-center justify-center rounded-full border border-[--color-primary]/60 bg-[--color-surface-dark] shadow-[0_0_34px_rgba(208,154,78,0.22)]">
                <span className="font-display text-[15px] font-medium tracking-[-0.01em] text-[--color-ink]">
                  BrandBridge
                </span>
                <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.24em] text-[--color-primary]">
                  Core
                </span>
              </div>
            </div>

            {/* Category pills on the outer octagon */}
            {NICHES.map((niche) => {
              const Icon = niche.icon
              const isSelected = selectedId === niche.id
              const rad = (niche.angle * Math.PI) / 180
              const x = Math.cos(rad) * PILL_R
              const y = Math.sin(rad) * PILL_R

              return (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => setSelectedId(niche.id)}
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
                    willChange: 'transform',
                  }}
                  className={`absolute left-1/2 top-1/2 z-30 flex h-10 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-[transform,border-color,background-color,color,box-shadow] duration-300 cursor-pointer ${
                    isSelected
                      ? 'scale-105 border-[--color-primary] bg-[--color-cta-bg] text-[--color-cta-text] shadow-[0_4px_18px_rgba(208,154,78,0.32)]'
                      : 'border-[--color-hairline] bg-[--color-surface-soft]/80 text-[--color-body] hover:scale-[1.03] hover:border-[--color-primary]/40 hover:text-[--color-ink]'
                  }`}
                >
                  <Icon size={16} weight={isSelected ? 'bold' : 'regular'} />
                  <span>{niche.name}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile & tablet: a clean category-selection strip, anchored by the mark */}
          <div className="mt-10 lg:hidden">
            <div className="flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-px w-10 bg-[--color-hairline]" />
              <BridgeGlyph size={22} />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[--color-primary]">
                BrandBridge Core
              </span>
              <span className="h-px w-10 bg-[--color-hairline]" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {NICHES.map((niche) => {
                const Icon = niche.icon
                const isSelected = selectedId === niche.id
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setSelectedId(niche.id)}
                    className={`flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-[transform,border-color,background-color,color] duration-300 cursor-pointer ${
                      isSelected
                        ? 'scale-105 border-[--color-primary] bg-[--color-cta-bg] text-[--color-cta-text] shadow-[0_2px_10px_rgba(208,154,78,0.25)]'
                        : 'border-[--color-hairline] bg-[--color-surface-soft] text-[--color-body] hover:text-[--color-ink]'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{niche.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Selected niche detail panel — stable height so switching is frictionless */}
        <div className="mx-auto mt-8 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNiche.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={spring}
              className="glass-panel relative min-h-[228px] overflow-hidden rounded-[18px] border border-[--color-hairline-strong] p-7 shadow-lg"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[--color-primary-soft] text-[--color-primary]">
                {(() => {
                  const Icon = selectedNiche.icon
                  return <Icon size={22} weight="bold" />
                })()}
              </div>

              <h3 className="mt-4 font-display text-2xl text-[--color-ink]">{selectedNiche.name}</h3>
              <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-[--color-body]">
                {selectedNiche.description}
              </p>

              <div className="mx-auto mt-5 flex max-w-sm items-start gap-3 border-t border-[--color-hairline] pt-4 font-mono text-[11px] text-[--color-muted]">
                <span className="shrink-0 uppercase tracking-[0.14em]">Typical</span>
                <span className="text-[--color-body-strong]">{selectedNiche.examples}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}