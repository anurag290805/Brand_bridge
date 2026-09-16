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
export function BrandLogo({ size = 32, className = '', label }: MarkProps) {
  return (
    <img
      src="/logo.jpg"
      alt={label || 'BrandBridge logo'}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`rounded-[8px] object-cover ${className}`}
      aria-hidden={label ? undefined : true}
    />
  )
}

/**
 * The bridge glyph alone.
 */
export function BridgeGlyph({
  size = 48,
  className = '',
  label,
}: MarkProps & { tone?: string }) {
  return (
    <img
      src="/logo.jpg"
      alt={label || 'BrandBridge logo'}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`rounded-[8px] object-cover ${className}`}
      aria-hidden={label ? undefined : true}
    />
  )
}