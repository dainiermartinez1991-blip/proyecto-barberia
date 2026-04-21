'use client'

import { AtSign, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useBookingModal } from '@/lib/BookingContext'
import type { Barber } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BarberCardProps {
  barber: Barber
  className?: string
  style?: React.CSSProperties
}

export default function BarberCard({ barber, className, style }: BarberCardProps) {
  const { openModal } = useBookingModal()

  return (
    <div
      style={style}
      className={cn(
        'group relative bg-secondary border border-neutral-700 rounded-lg overflow-hidden',
        'hover:border-primary/50 transition-all duration-300',
        className,
      )}
    >
      {/* Photo area */}
      <div className="relative h-64 bg-neutral-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <User size={64} className="text-neutral-600" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neutral-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {barber.available ? (
            <Button variant="primary" size="md" onClick={() => openModal()}>
              Book with {barber.name.split(' ')[0]}
            </Button>
          ) : (
            <span className="text-neutral-400 font-medium">Currently Unavailable</span>
          )}
        </div>
        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={barber.available ? 'success' : 'danger'}>
            {barber.available ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-neutral-50">{barber.name}</h3>
        <p className="text-primary text-sm font-medium mt-0.5">{barber.specialty}</p>
        <p className="text-neutral-400 text-sm mt-3 leading-relaxed line-clamp-2">{barber.bio}</p>

        {barber.instagram && (
          <a
            href={`https://instagram.com/${barber.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-primary transition-colors mt-4"
          >
            <AtSign size={14} />@{barber.instagram}
          </a>
        )}
      </div>
    </div>
  )
}
