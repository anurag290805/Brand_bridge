import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

const meta = [
  { label: 'Campaign type', value: 'Product and lifestyle feature' },
  { label: 'Creator niche', value: 'Fitness and wellness' },
  { label: 'Deliverables', value: 'A short feature on your feed' },
  { label: 'Collaboration format', value: 'Details shared with you first' },
]

/**
 * OPPORTUNITY PREVIEW · A DESIGNED CAMPAIGN BRIEF
 * Presented as an editorial brief, not a dashboard card. A large serif
 * statement on one side, a sparse metadata system on the other, a tone row
 * beneath. The four metadata points read together as one connected block, and
 * each row responds quietly on hover. Clearly labelled illustrative.
 */
export default function OpportunityPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <Container className="relative">
        <Reveal>
          <div className="flex flex-col gap-8 border-t border-[--color-hairline] pt-14 md:flex-row md:items-end md:justify-between md:pt-20">
            <div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[--color-primary]">
                Illustrative campaign
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[1.04] tracking-[-0.02em] text-[--color-ink]">
                What a collaboration looks like.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[--color-muted]">
              Example only. Not a live campaign. Real briefs are shared when they fit your profile.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            {/* The brief statement */}
            <div className="pt-10">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[--color-muted]">
                The campaign
              </p>
              <p className="mt-5 max-w-xl font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[--color-ink]">
                Product and lifestyle feature
              </p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[--color-body]">
                A short-feature collaboration with an activewear brand, for fitness and wellness
                creators who can carry the product authentically.
              </p>
            </div>

            {/* Brief metadata — four points as one connected system */}
            <dl className="border-t border-[--color-hairline-strong]">
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={`group relative flex items-center justify-between gap-6 py-5 transition-colors duration-300 ${
                    i < meta.length - 1 ? 'border-b border-[--color-hairline]' : ''
                  }`}
                >
                  {/* quiet primary rule appears as the row is engaged */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 top-0 left-0 w-px origin-top bg-[--color-primary] opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  />
                  <dt className="transition-colors duration-300 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[--color-muted] group-hover:text-[--color-primary]">
                    {m.label}
                  </dt>
                  <dd className="text-right text-[16px] text-[--color-body-strong] transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-[--color-ink]">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Illustrative visual — a restrained campaign card */}
          <Reveal delay={0.15}>
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[--color-primary-glow] via-transparent to-[--color-glow-blue] rounded-[20px] opacity-50 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[20px] border border-[--color-hairline-strong] bg-[--color-surface-soft]/60 backdrop-blur-sm p-6 sm:p-8">
                {/* Example badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[--color-primary]/40 bg-[--color-primary-soft] px-4 py-1.5 mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[--color-primary]">
                    Illustrative example
                  </span>
                </div>

                {/* Campaign visual - editorial layout */}
                <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] md:items-center">
                  {/* Visual placeholder - editorial style */}
                  <div className="relative aspect-square rounded-[16px] bg-gradient-to-br from-[--color-surface-dark] via-[--color-surface-soft] to-[--color-surface-dark] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 200 200" className="w-[60%] h-[60%] opacity-30 text-[--color-primary]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        {/* Abstract lifestyle/product composition */}
                        <rect x="20" y="20" width="160" height="160" rx="8" className="stroke-[--color-hairline-strong]" />
                        <circle cx="100" cy="85" r="28" className="stroke-[--color-primary]/60" />
                        <path d="M100 113v40M80 133h40" className="stroke-[--color-primary]/40" strokeLinecap="round" />
                        <rect x="35" y="155" width="130" height="8" rx="2" className="stroke-[--color-hairline]/50" />
                        <rect x="35" y="170" width="80" height="6" rx="2" className="stroke-[--color-hairline]/50" />
                        {/* Accent elements */}
                        <circle cx="65" cy="55" r="6" className="fill-[--color-primary]/30" />
                        <circle cx="135" cy="55" r="4" className="fill-[--color-accent-blue]/30" />
                        <circle cx="65" cy="115" r="4" className="fill-[--color-accent-purple]/30" />
                        <circle cx="135" cy="115" r="5" className="fill-[--color-primary]/20" />
                      </svg>
                    </div>
                    {/* Subtle corner accent */}
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[--color-primary]/10 blur-xl" aria-hidden="true" />
                  </div>

                  {/* Campaign details */}
                  <div className="space-y-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                        Illustrative opportunity
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.02em] text-[--color-ink]">
                        Activewear campaign
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[--color-body]">
                      <span className="flex items-center gap-1.5 font-medium text-[--color-ink]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-primary]" aria-hidden="true" />
                        Fitness & wellness
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-accent-blue]" aria-hidden="true" />
                        Short feed feature
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--color-accent-purple]" aria-hidden="true" />
                        Details shared with you first
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-[--color-muted] border-t border-[--color-hairline] pt-5">
                      A lifestyle brand seeks creators who naturally integrate activewear into daily routines —
                      morning runs, studio sessions, weekend hikes. The brief emphasizes authentic product
                      integration over staged content. You receive the full brief, timeline, and compensation
                      details before deciding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tone row */}
          <div className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-[--color-hairline] pt-6 text-[14px] text-[--color-muted]">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-primary]">Concept</span>
            <span aria-hidden="true" className="text-[--color-hairline-strong]">/</span>
            <span>Open to discussion</span>
            <span aria-hidden="true" className="text-[--color-hairline-strong]">/</span>
            <span>Fit-based</span>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}