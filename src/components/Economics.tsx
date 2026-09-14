import { useState, useId } from 'react'
import { CurrencyInr, CurrencyDollar, Info, Percent } from '@phosphor-icons/react'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

/** The split is fixed — creators keep 85%, BrandBridge takes 15%. Users
 *  cannot change it; this is displayed as static information. */
const CREATOR_PCT = 85
const PLATFORM_PCT = 100 - CREATOR_PCT

export default function Economics() {
  const [amount, setAmount] = useState<number>(50000)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const sliderId = useId()

  const creatorShare = Math.round(amount * (CREATOR_PCT / 100))
  const platformShare = Math.round(amount * (PLATFORM_PCT / 100))

  const formatMoney = (val: number) => {
    if (currency === 'INR') {
      return `₹${val.toLocaleString('en-IN')}`
    }
    return `$${val.toLocaleString('en-US')}`
  }

  const minVal = currency === 'INR' ? 10000 : 500
  const maxVal = currency === 'INR' ? 500000 : 25000
  const stepVal = currency === 'INR' ? 5000 : 250

  const handleCurrencyToggle = (c: 'INR' | 'USD') => {
    if (c === currency) return
    setCurrency(c)
    if (c === 'USD') {
      setAmount(2000)
    } else {
      setAmount(50000)
    }
  }

  return (
    <section id="economics" className="relative scroll-mt-24 overflow-hidden py-14 md:py-20">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[--color-primary]">
              Transparent Economics
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
              See exactly where it goes.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[--color-body] sm:text-[15px]">
              No hidden fees, no surprise deductions. BrandBridge operates on an industry-leading 85/15 model.
            </p>
          </div>
        </Reveal>

        {/* Breakdown Card */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="glass-panel relative rounded-[20px] p-5 sm:p-7">
            {/* Top bar: fixed split label + currency toggle */}
            <div className="flex items-center justify-between gap-3 border-b border-[--color-hairline] pb-4">
              <div className="flex min-w-0 items-center gap-2">
                <Percent size={16} className="shrink-0 text-[--color-primary]" />
                <span className="truncate font-mono text-[11px] uppercase tracking-wider text-[--color-ink]">
                  {CREATOR_PCT}% Creator / {PLATFORM_PCT}% BrandBridge
                </span>
              </div>

              <div className="flex shrink-0 items-center rounded-full border border-[--color-hairline] bg-[--color-surface-soft] p-0.5">
                <button
                  type="button"
                  onClick={() => handleCurrencyToggle('INR')}
                  className={`flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    currency === 'INR'
                      ? 'bg-[--color-cta-bg] text-[--color-cta-text]'
                      : 'text-[--color-muted] hover:text-[--color-ink]'
                  }`}
                >
                  <CurrencyInr size={13} /> INR (₹)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyToggle('USD')}
                  className={`flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    currency === 'USD'
                      ? 'bg-[--color-cta-bg] text-[--color-cta-text]'
                      : 'text-[--color-muted] hover:text-[--color-ink]'
                  }`}
                >
                  <CurrencyDollar size={13} /> USD ($)
                </button>
              </div>
            </div>

            {/* Campaign value + amount slider */}
            <div className="pt-5">
              <div className="text-center">
                <label htmlFor={sliderId} className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                  Sample Campaign Value
                </label>
                <div className="mt-1 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none tracking-tight text-[--color-ink]">
                  {formatMoney(amount)}
                </div>
              </div>

              <div className="relative z-20 mx-auto mt-4 max-w-md px-3">
                <input
                  id={sliderId}
                  type="range"
                  min={minVal}
                  max={maxVal}
                  step={stepVal}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="custom-slider pointer-events-auto"
                />
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[--color-muted]">
                  <span>{formatMoney(minVal)}</span>
                  <span>{formatMoney(maxVal)}</span>
                </div>
              </div>
            </div>

            {/* Static 85 / 15 split */}
            <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-6 rounded-[12px] border border-[--color-hairline] bg-[--color-surface-soft]/50 px-5 py-3">
              <div className="text-center">
                <span className="font-display text-2xl leading-none text-[--color-primary]">{CREATOR_PCT}%</span>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[--color-muted]">Creator</div>
              </div>
              <span className="h-8 w-px bg-[--color-hairline]" aria-hidden="true" />
              <div className="text-center">
                <span className="font-display text-2xl leading-none text-[--color-muted]">{PLATFORM_PCT}%</span>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[--color-muted]">BrandBridge</div>
              </div>
            </div>

            {/* Creator / BrandBridge payout cards */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Creator Share */}
              <div className="flex flex-col justify-between rounded-[14px] border border-[--color-primary]/40 bg-[--color-surface-soft]/80 p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-primary]">
                    Creator Share
                  </span>
                  <span className="rounded-full bg-[--color-primary-soft] px-2 py-0.5 font-mono text-[11px] font-semibold text-[--color-primary]">
                    {CREATOR_PCT}%
                  </span>
                </div>
                <div className="mt-3 font-display text-2xl leading-none text-[--color-ink] sm:text-3xl">
                  {formatMoney(creatorShare)}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-[--color-body]">
                  Direct payout to creator upon successful campaign completion.
                </p>
              </div>

              {/* BrandBridge Commission */}
              <div className="flex flex-col justify-between rounded-[14px] border border-[--color-hairline] bg-[--color-surface-dark] p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                    BrandBridge Commission
                  </span>
                  <span className="rounded-full border border-[--color-hairline] bg-[--color-surface] px-2 py-0.5 font-mono text-[11px] font-semibold text-[--color-muted]">
                    {PLATFORM_PCT}%
                  </span>
                </div>
                <div className="mt-3 font-display text-2xl leading-none text-[--color-ink] sm:text-3xl">
                  {formatMoney(platformShare)}
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-[--color-body]">
                  Covers fit evaluation, contract alignment, campaign coordination & support.
                </p>
              </div>
            </div>

            {/* Illustrative note */}
            <div className="mt-5 flex items-start gap-2.5 rounded-[10px] border border-[--color-hairline-soft] bg-[--color-canvas-soft]/50 p-3.5 text-[12.5px] text-[--color-muted]">
              <Info size={16} className="mt-0.5 shrink-0 text-[--color-primary]" />
              <p>
                Figures are illustrative and scale directly with agreed commercial campaign budgets. No hidden fees or onboarding costs.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}