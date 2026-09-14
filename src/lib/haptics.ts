/**
 * HAPTICS UTILITY
 * Lightweight wrapper around the Vibration API for meaningful, non-intrusive
 * tactile feedback on supported devices.
 *
 * Only fires on genuine commit/success/error moments — never on hover,
 * focus, or routine interactions.
 */
type HapticPattern = 'success' | 'error' | 'selection' | 'impact-light' | 'impact-medium' | 'impact-heavy'

const patterns: Record<HapticPattern, number | number[]> = {
  success: [10, 50, 10],
  error: [30, 30, 30, 30, 30],
  selection: 5,
  'impact-light': 10,
  'impact-medium': 20,
  'impact-heavy': 30,
}

let supportsVibration = false

if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
  supportsVibration = true
}

/**
 * Triggers a haptic pattern if supported and not disabled by user preferences.
 * Respects `prefers-reduced-motion` as a proxy for "reduce sensory feedback".
 */
export function haptic(pattern: HapticPattern): void {
  if (!supportsVibration) return

  // Respect reduced motion as a signal to reduce all sensory feedback
  if (typeof window !== 'undefined') {
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return
    } catch {
      /* ignore */
    }
  }

  const patternValue = patterns[pattern]
  navigator.vibrate(patternValue)
}

/**
 * React hook for easy access to haptic feedback in components.
 */
export function useHaptics() {
  return { haptic }
}