import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'muted' | 'danger'
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary/20 text-primary',
  success: 'bg-green-500/20 text-green-400',
  muted: 'bg-neutral-700 text-neutral-300',
  danger: 'bg-red-500/20 text-red-400',
}

export default function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
