import { config } from '../config'
import { Container } from '../lib/Container'
import { BrandLogo } from '../lib/BrandMark'
import { InstagramLogo, Envelope } from '@phosphor-icons/react'

const quickLinks = [
  { label: 'Home', href: '#top' },
  { label: 'How it works', href: '#process' },
  { label: 'For creators', href: '#who-its-for' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

/**
 * FOOTER · DARK STAGE
 * A balanced editorial close to the page: the brand block up front, then
 * three evenly-spaced link columns, then an intentional copyright bar.
 * The brand block and the closing line restate the bridge.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[--color-hairline] bg-[--color-surface-dark] text-[--color-on-dark-soft]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1.3fr_1fr] lg:gap-8 xl:gap-12">
          {/* Brand block */}
          <div>
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-3 rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
              aria-label="BrandBridge home"
            >
              <BrandLogo size={34} onDark />
              <span className="font-display text-2xl text-[--color-on-dark]">BrandBridge</span>
            </a>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Connecting creators with the brand opportunities that fit.
            </p>
          </div>

          {/* Explore column */}
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[--color-on-dark-soft]">
              Explore
            </p>
            <ul className="mt-4 space-y-1">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-flex items-center rounded-[4px] px-1 py-1 text-[15px] text-[--color-on-dark] transition-colors hover:text-[--color-on-dark-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column — wide enough for the email to stay on one line */}
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[--color-on-dark-soft]">
              Contact
            </p>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="inline-flex items-center gap-2 rounded-[4px] px-1 py-1 text-[15px] leading-snug text-[--color-on-dark] transition-colors hover:text-[--color-on-dark-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                >
                  <Envelope size={16} weight="regular" aria-hidden="true" className="shrink-0 text-[--color-on-dark-soft]" />
                  <span className="break-words">{config.email}</span>
                </a>
              </li>
              {config.instagram && (
                <li>
                  <a
                    href={config.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[4px] px-1 py-1 text-[15px] leading-snug text-[--color-on-dark] transition-colors hover:text-[--color-on-dark-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                  >
                    <InstagramLogo size={16} weight="regular" aria-hidden="true" className="shrink-0 text-[--color-on-dark-soft]" />
                    {config.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal column */}
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[--color-on-dark-soft]">
              Legal
            </p>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Privacy policy coming soon"
                  className="inline-flex items-center rounded-[4px] px-1 py-1 text-[15px] text-[--color-on-dark] transition-colors hover:text-[--color-on-dark-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Terms coming soon"
                  className="inline-flex items-center rounded-[4px] px-1 py-1 text-[15px] text-[--color-on-dark] transition-colors hover:text-[--color-on-dark-primary] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[13px] sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} BrandBridge. All rights reserved.</p>
          <p className="font-display text-[15px] italic text-[--color-on-dark]">Creator, bridge, brand.</p>
        </div>
      </Container>
    </footer>
  )
}