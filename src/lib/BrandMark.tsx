/**
 * BRANDBRIDGE · OFFICIAL LOGO
 * ===========================
 * The B/bridge mark: two signal nodes joined by a bridge. This is the
 * official BrandBridge logo - do NOT redesign, distort, or recolour it.
 *
 * Two exports:
 *   <BrandLogo />    the full lockup (mark inside its rounded tile) - nav, footer, favicon.
 *   <BridgeGlyph />  the bridge glyph alone - hero narrative and connection moments.
 *
 * The geometry mirrors public/favicon.svg exactly. Stroke/fill inherit the
 * design tokens so the mark stays legible on any surface and theme. On a dark
 * stage (the footer, which is always dark), pass `onDark` so the tile inverts
 * to a light tile with a dark glyph instead of vanishing into the surface.
 */

interface MarkProps {
  /** Render size in px. Default 32 (favicon/nav size). */
  size?: number
  className?: string
  /** Optional accessible label. When omitted the mark is decorative. */
  label?: string
  /** Render for a dark stage that stays dark in light mode (footer). */
  onDark?: boolean
}

/** Full lockup: the mark on its rounded ink tile. */
export function BrandLogo({ size = 32, className = '', label, onDark = false }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      className={className}
    >
      {label ? <title>{label}</title> : null}
      <rect
        width="32"
        height="32"
        rx="8"
        className={onDark ? 'fill-[--color-on-dark]' : 'fill-[--color-ink]'}
      />
      <g
        fill="none"
        className={onDark ? 'stroke-[--color-surface-dark]' : 'stroke-[--color-canvas]'}
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M8 16h6M18 16h6" />
        <path d="M14 12l-3.5 4 3.5 4" />
        <path d="M18 12l3.5 4-3.5 4" />
      </g>
      <circle cx="8" cy="16" r="1.7" className="fill-[--color-primary]" />
      <circle cx="24" cy="16" r="1.7" className="fill-[--color-primary]" />
    </svg>
  )
}

/**
 * The bridge glyph alone (no tile). Used large in the hero as the central
 * connection mechanism. `tone` lets it match the surface it sits on.
 */
export function BridgeGlyph({
  size = 48,
  className = '',
  tone = 'stroke-[--color-primary]',
  label,
}: MarkProps & { tone?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      className={className}
    >
      {label ? <title>{label}</title> : null}
      <g fill="none" className={tone} strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 16h7M19 16h7" />
        <path d="M13 12l-3.5 4 3.5 4" />
        <path d="M19 12l3.5 4-3.5 4" />
      </g>
      <circle cx="6" cy="16" r="1.5" className="fill-[--color-primary]" />
      <circle cx="26" cy="16" r="1.5" className="fill-[--color-primary]" />
    </svg>
  )
}