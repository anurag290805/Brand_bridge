import { Envelope, InstagramLogo, ArrowRight } from '@phosphor-icons/react'
import { config } from '../config'
import { Container } from '../lib/Container'
import { Reveal } from '../lib/Reveal'

/**
 * Contact section.
 * Direct, no-form outreach: email + Instagram, both clickable. Values stay
 * config-driven (src/config.ts) so the inbox and handle live in one place.
 */

function ContactCard({
  href,
  external,
  icon,
  label,
  value,
  hint,
}: {
  href: string
  external?: boolean
  icon: React.ReactNode
  label: string
  value: string
  hint: string
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group relative block overflow-hidden rounded-[20px] border border-[--color-hairline] bg-[--color-surface-dark]/50 p-7 transition-all duration-300 hover:border-[--color-hairline-strong] hover:bg-[--color-surface-soft] sm:p-8"
    >
      {/* soft top accent that thins out — echoes the section focus light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[--color-primary]/40 to-transparent"
      />

      <div className="flex h-full flex-col items-start justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[--color-hairline] bg-[--color-canvas] text-[--color-primary] transition-colors group-hover:border-[--color-primary]/30">
              {icon}
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[--color-muted]">
              {label}
            </span>
          </div>

          <p className="mt-6 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-tight tracking-[-0.01em] text-[--color-ink]">
            {value}
          </p>
          <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[--color-body]">
            {hint}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-[14px] font-medium text-[--color-primary]">
          {external ? 'Open profile' : 'Send an email'}
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden pt-14 pb-20 md:pt-16 md:pb-24">
      {/* A soft centered focus light behind the contact cards — otherwise the
          atmosphere comes from the persistent FilmLayer so the section stays
          continuous. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[--color-primary-glow] opacity-30 blur-3xl"
      />

      <Container className="relative max-w-4xl">
        <Reveal>
          <div className="text-center">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[--color-primary]">
              Start a Conversation
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.05] tracking-[-0.02em] text-[--color-ink]">
              Interested in working with BrandBridge?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[--color-body]">
              Reach out directly and tell us a little about yourself or your brand.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <ContactCard
              href={`mailto:${config.email}`}
              icon={<Envelope size={20} />}
              label="Email"
              value={config.email}
              hint="Best for a longer introduction, partnership ideas, or campaign briefs."
            />
            <ContactCard
              href={config.instagram}
              external
              icon={<InstagramLogo size={20} />}
              label="Instagram"
              value={`@${config.instagramHandle}`}
              hint="Best for a quick DM, a look at what we share, or to start a casual conversation."
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}