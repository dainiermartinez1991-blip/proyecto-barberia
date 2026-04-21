'use client'

import { Scissors } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useBookingModal } from '@/lib/BookingContext'

export default function CTABanner() {
  const { openModal } = useBookingModal()

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
          Ready for a Fresh Cut?
        </h2>
        <p className="mt-6 text-neutral-900/70 text-lg max-w-xl mx-auto">
          Book your appointment today and walk out looking and feeling your absolute best.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => openModal()}
            className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-primary"
          >
            Book Your Appointment
          </Button>
        </div>
      </div>
    </section>
  )
}
