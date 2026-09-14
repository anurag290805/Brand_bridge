import type { ReactNode, ElementType } from 'react'

/**
 * Shared layout container. Constrains content to a readable max width and
 * applies consistent horizontal padding at every breakpoint.
 */
export function Container({
  children,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  className?: string
}) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  )
}