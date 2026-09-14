import { useCallback, useEffect, useState } from 'react'

/**
 * BRANDBRIDGE · THEME (light / dark)
 * Real site-level theme switch, not browser-preference detection alone.
 *
 * - The current theme lives on <html data-theme="light|dark">.
 * - Initial default: saved preference, else prefers-color-scheme.
 * - The user's explicit choice persists to localStorage.
 * - Every color in the design is a CSS variable that flips under
 *   [data-theme="dark"], so one attribute re-themes the whole site.
 */

export type Theme = 'light' | 'dark'

const THEME_KEY = 'brandbridge-theme'

function prefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = window.localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage unavailable — fall through to system */
  }
  return prefersDark() ? 'dark' : 'light'
}

/**
 * Apply a theme to <html>. `save` persists it as the user's explicit choice.
 * `animate` briefly enables cross-fade of every color-carrying property.
 */
export function applyTheme(theme: Theme, save: boolean, animate = true): void {
  const root = document.documentElement
  if (animate) root.classList.add('theme-anim')
  root.setAttribute('data-theme', theme)
  if (animate) {
    window.setTimeout(() => root.classList.remove('theme-anim'), 420)
  }
  if (save) {
    try {
      window.localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* ignore */
    }
  }
}

export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next, true)
      return next
    })
  }, [])

  // Keep the DOM in sync. On first mount this re-applies the value main.tsx
  // already set (no-op); after a toggle it's redundant but harmless.
  useEffect(() => {
    applyTheme(theme, false, false)
  }, [theme])

  return { theme, toggle }
}
