import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[16px] border-0 bg-transparent p-4 shadow-raised backdrop-blur-xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
