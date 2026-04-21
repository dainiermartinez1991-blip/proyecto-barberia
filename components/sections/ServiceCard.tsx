'use client'

import { Clock, DollarSign } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useBookingModal } from '@/lib/BookingContext'
import { useI18n } from '@/lib/I18nContext'
import type { Service } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
  className?: string
  style?: React.CSSProperties
}

export default function ServiceCard({ service, className, style }: ServiceCardProps) {
  const { openModal } = useBookingModal()
  const { t } = useI18n()

  return (
    <div
      style={style}
      className={cn(
        'group relative bg-secondary border border-neutral-700 rounded-lg p-6',
        'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5',
        'hover:scale-[1.02] transition-all duration-300',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {service.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-neutral-400">
          <Clock size={12} />
          {service.duration} min
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold text-neutral-50 mt-2 mb-2">{service.name}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.description}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 text-primary font-display font-bold text-2xl">
          <DollarSign size={18} />
          {service.price}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => openModal(service.id)}
        >
          {t('bookThis')}
        </Button>
      </div>
    </div>
  )
}
