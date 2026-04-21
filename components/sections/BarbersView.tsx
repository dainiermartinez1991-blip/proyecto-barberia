'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import BarberCard from './BarberCard'
import { useI18n } from '@/lib/I18nContext'
import type { Barber } from '@/lib/types'

interface BarbersViewProps {
  barbers: Barber[]
}

export default function BarbersView({ barbers }: BarbersViewProps) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-neutral-900 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-100">{t('barbers')}</span>
        </nav>

        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">{t('theCrew')}</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-50">
            {t('meetOurBarbers').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('meetOurBarbers').split(' ').slice(-1)[0]}</span>
          </h1>
          <p className="text-neutral-400 mt-4 max-w-xl">
            {t('barbersDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber, i) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
