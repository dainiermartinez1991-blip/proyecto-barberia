import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
  style?: React.CSSProperties
}

export default function TestimonialCard({ testimonial, className, style }: TestimonialCardProps) {
  return (
    <div
      style={style}
      className={cn(
        'bg-secondary border border-neutral-700 rounded-lg p-6',
        'hover:border-primary/30 transition-all duration-300',
        className,
      )}
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? 'text-primary fill-primary' : 'text-neutral-600'}
          />
        ))}
      </div>
      <p className="text-neutral-300 leading-relaxed italic">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex items-center justify-between mt-5">
        <p className="font-semibold text-neutral-100">{testimonial.customerName}</p>
        <p className="text-neutral-500 text-xs">{testimonial.date}</p>
      </div>
    </div>
  )
}
