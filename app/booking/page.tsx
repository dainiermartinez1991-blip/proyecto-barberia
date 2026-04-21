import Link from 'next/link'
import { ChevronRight, Scissors } from 'lucide-react'
import BookingForm from '@/components/booking/BookingForm'
import WhatsAppButton from '@/components/booking/WhatsAppButton'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-neutral-900 pt-8 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-100">Book Appointment</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors size={24} className="text-primary" />
          </div>
          <h1 className="font-display text-5xl font-bold text-neutral-50">
            Book Your <span className="text-primary">Appointment</span>
          </h1>
          <p className="text-neutral-400 mt-3">
            Fill in your details and we&apos;ll confirm your spot. Or reach us directly on WhatsApp.
          </p>
        </div>

        {/* WhatsApp quick option */}
        <div className="bg-secondary border border-neutral-700 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-semibold text-neutral-100">Prefer a quick booking?</p>
            <p className="text-neutral-400 text-sm">Message us directly on WhatsApp and we&apos;ll sort it out.</p>
          </div>
          <WhatsAppButton label="Chat on WhatsApp" size="md" />
        </div>

        {/* Form */}
        <div className="bg-secondary border border-neutral-700 rounded-lg p-8">
          <BookingForm />
        </div>
      </div>
    </div>
  )
}
