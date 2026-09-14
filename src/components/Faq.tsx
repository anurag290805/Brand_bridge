import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { config } from '../config'
import { Container } from '../lib/Container'

const faqs = [
  {
    q: 'What is BrandBridge?',
    a: 'BrandBridge is a focused platform connecting Instagram creators with relevant brand collaboration opportunities. We sit between creators and brands to ensure fit, clear commercial alignment, and smooth campaign delivery.',
  },
  {
    q: 'Who can use it?',
    a: 'Both creators (from micro-influencers to established channels) and brands looking for genuine audience reach. We look at audience fit, engagement, and content style rather than strict follower thresholds.',
  },
  {
    q: 'How does the 15% commission work?',
    a: 'BrandBridge operates on a transparent 85/15 split. The creator receives 85% of the agreed campaign payout, while BrandBridge takes 15% to cover platform coordination, fit evaluation, and campaign support.',
  },
  {
    q: 'Are the figures guaranteed?',
    a: 'No. Sponsorship earnings depend on campaign budgets and mutual agreement. We present honest figures for each brief with zero hidden deductions or inflated promises.',
  },
  {
    q: 'What happens after an introduction?',
    a: 'Once both parties express interest and align on brief deliverables, BrandBridge provides clear terms. The creator produces and posts content, and payout is processed promptly upon campaign completion.',
  },
  {
    q: 'Does it cost anything to express interest?',
    a: 'No. Expressing interest and creating a profile on BrandBridge is completely free. There are no subscription fees or upfront charges.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const id = q.replace(/\W+/g, '-').toLowerCase()

  // Apple default: critically damped spring
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.38 }

  if (reduce) {
    // Reduced-motion: instant cross-fade, no spring, but still needs min-h-11
    return (
      <div className="border-b border-[--color-hairline]">
        <h3 className="font-display text-[19px]">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${id}-panel`}
            className="flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left text-[--color-ink] hover:text-[--color-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
          >
            <span>{q}</span>
            <span className="shrink-0 text-[--color-muted]">
              <Plus size={18} weight="regular" aria-hidden="true" style={{ transform: open ? 'rotate(45deg)' : undefined }} />
            </span>
          </button>
        </h3>
        {open && (
          <div id={`${id}-panel`} role="region">
            <p className="max-w-2xl pb-6 pr-6 text-[15px] leading-relaxed text-[--color-body]">{a}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="border-b border-[--color-hairline]">
      <h3 className="font-display text-[19px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[--color-ink] hover:text-[--color-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
        >
          <span>{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={spring}
            className="shrink-0 text-[--color-muted]"
          >
            <Plus size={18} weight="regular" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`${id}-panel-inner`}
            id={`${id}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            style={{ overflow: 'hidden' }}
          >
            <p className="max-w-2xl pb-6 pr-6 text-[15px] leading-relaxed text-[--color-body]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * FAQ · MINIMAL EXPANDABLE TYPOGRAPHY
 * A sticky leading statement on the left, a clean hairline accordion on the
 * right. The questions are the only labels; nothing else competes.
 */
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.9fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:h-max">
            <h2 className="font-display text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-[--color-ink]">
              The questions you probably have.
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[--color-muted]">
              Still unsure?{' '}
              <a
                href={`mailto:${config.email}`}
                className="rounded-[4px] font-medium text-[--color-ink] underline decoration-[--color-hairline-strong] underline-offset-4 transition-colors hover:text-[--color-primary] hover:decoration-[--color-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
              >
                Email us
              </a>{' '}
              and we will answer directly.
            </p>
          </div>

          <div className="border-t border-[--color-hairline]">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}