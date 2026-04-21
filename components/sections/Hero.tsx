'use client'

import Link from 'next/link'
import { ArrowRight, Scissors } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useBookingModal } from '@/lib/BookingContext'
import { useI18n } from '@/lib/I18nContext'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Hero() {
  const { openModal } = useBookingModal()
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FFC300 0px, #FFC300 1px, transparent 1px, transparent 60px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900" />
      </div>

      {/* Decorative gold line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-40 bg-primary hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <Scissors size={16} className="text-primary" />
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">{BUSINESS_INFO.tagline}</span>
            <Scissors size={16} className="text-primary rotate-180" />
            <div className="h-px w-12 bg-primary" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-neutral-50 leading-none mb-6">
            LOOK{' '}
            <span className="text-primary">SHARP</span>
            .{' '}
            <br className="hidden sm:block" />
            FEEL{' '}
            <span className="relative inline-block">
              GREAT
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary" />
            </span>
            .
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openModal()}
              icon={<Scissors size={18} />}
            >
              {t('heroBookBtn')}
            </Button>
            <Link href="/services">
              <Button variant="ghost" size="lg" icon={<ArrowRight size={18} />} className="text-neutral-300">
                {t('heroSeeServices')}
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16 text-center">
            {[
              { value: '10+', label: t('heroYears') },
              { value: '5K+', label: t('heroClients') },
              { value: '4', label: t('heroMasterBarbers') },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-neutral-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent" />
    </section>
  )
}
