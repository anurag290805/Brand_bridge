import { useEffect, useState, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { X } from '@phosphor-icons/react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (type: ToastType, message: string) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastList toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function ToastList({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  const reduce = useReducedMotion()
  // Critically damped spring for toasts - response ~0.35s, no bounce
  const spring = { type: 'spring' as const, bounce: 0, duration: 0.35 }

  return (
    <AnimatePresence initial={false}>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
          transition={reduce ? { duration: 0.01 } : spring}
          className="fixed bottom-6 right-6 z-[100] max-w-sm pointer-events-auto"
          style={{
            // Safe area inset for iOS notch/home indicator
            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
          }}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <ToastItem toast={toast} onClose={() => onRemove(toast.id)} />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const style = {
    success: 'border-[--color-success]/30 bg-[--color-success]/10 text-[--color-success]',
    error: 'border-[--color-error]/30 bg-[--color-error]/10 text-[--color-error]',
    info: 'border-[--color-primary]/30 bg-[--color-primary]/10 text-[--color-primary]',
  }[toast.type]

  const icon = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="10" cy="10" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 10l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="10" cy="10" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v8M10 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="10" cy="10" r="9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v8M10 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  }[toast.type]

  return (
    <div
      className={`flex items-start gap-3 rounded-[10px] border px-4 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${style}`}
      style={prefersReduced ? {} : { willChange: 'transform, opacity' }}
    >
      <div className="flex-shrink-0 mt-0.5" style={{ color: 'currentColor' }}>
        {icon}
      </div>
      <p className="flex-1 text-[14px] leading-relaxed pr-6">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="flex-shrink-0 p-1 rounded text-current opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: 'currentColor' }}
      >
        <X size={16} weight="regular" aria-hidden="true" />
      </button>
    </div>
  )
}