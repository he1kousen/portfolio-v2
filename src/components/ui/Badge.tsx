import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
}

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[12px] border border-[#3D3D3D] bg-gray-100 dark:bg-bg-secondary px-3 py-1.5 text-xs font-medium text-black/80 dark:text-white/80',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
