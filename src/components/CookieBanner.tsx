import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

const COOKIE_KEY = 'brandbridge-cookie-consent'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(COOKIE_KEY)
      if (!saved) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, 'accepted')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  const dismiss = () => {
    try {
      window.localStorage.setItem(COOKIE_KEY, 'dismissed')
    } catch {
      /* ignore */
    }
    setShow(false)
  }

  if (!show) return null

  // Apple default: critically damped spring, response ~0.4s
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.4 }

  return (
    <AnimatePresence>
      <motion.div
        key="cookie-banner"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        transition={reduce ? { duration: 0.01 } : spring}
        className="fixed bottom-4 left-4 right-4 z-[90] sm:bottom-6 sm:left-auto sm:right-6 sm:w-[360px]"
        style={{
          // Safe area insets for iOS
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
        role="dialog"
        aria-label="Cookie notice"
      >
        <div className="overflow-hidden rounded-[12px] border border-[--color-hairline] bg-[--color-canvas] shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
          <div className="p-4 sm:p-5">
            <p className="text-[14px] leading-relaxed text-[--color-body]">
              We use a small cookie to remember your theme preference and cookie choice. No
              analytics, no tracking, no third parties.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-[--color-hairline] p-3 sm:p-4">
            <motion.button
              type="button"
              onClick={accept}
              whileTap={reduce ? undefined : { scale: 0.98, transition: spring }}
              className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-[--color-cta-bg] px-4 text-[14px] font-medium text-[--color-cta-text] hover:bg-[--color-cta-bg-hover] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
            >
              Accept
            </motion.button>
            <motion.button
              type="button"
              onClick={dismiss}
              whileTap={reduce ? undefined : { scale: 0.98, transition: spring }}
              className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[8px] border border-[--color-hairline] bg-[--color-canvas] px-4 text-[14px] font-medium text-[--color-ink] hover:border-[--color-muted-soft] hover:bg-[--color-surface-soft] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]"
            >
              Decline
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}