'use client'

import { Scissors } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useBookingModal } from '@/lib/BookingContext'
import { useI18n } from '@/lib/I18nContext'

export default function CTABanner() {
  const { openModal } = useBookingModal()
  const { t } = useI18n()

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #0D0D0D 0px, #0D0D0D 1px, transparent 1px, transparent 50px)',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Scissors size={40} className="text-neutral-900/30 mx-auto mb-6" />
        <h2 className="font-display text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
          {t('ctaTitle')}
        </h2>
        <p className="mt-6 text-neutral-900/70 text-lg max-w-xl mx-auto">
          {t('ctaDesc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openModal()}
            className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-primary"
          >
            {t('bookAppointment')}
          </Button>
        </div>
      </div>
    </section>
  )
}
