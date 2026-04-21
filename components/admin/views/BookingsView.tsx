'use client'

import { useI18n } from '@/lib/I18nContext'

interface Booking {
  id: string
  customerName: string
  customerPhone: string
  service: { name: string }
  barber?: { name: string } | null
  date: string | Date
  timeSlot: string
  source: string
  paymentStatus: string
  status: string
}

const statusColors: Record<string, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10',
  CONFIRMED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
  COMPLETED: 'text-blue-400 bg-blue-400/10',
}
const paymentColors: Record<string, string> = {
  UNPAID: 'text-neutral-400 bg-neutral-700',
  PAID: 'text-green-400 bg-green-400/10',
  REFUNDED: 'text-orange-400 bg-orange-400/10',
}

export function BookingsView({ bookings }: { bookings: Booking[] }) {
  const { t } = useI18n()

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-neutral-50">{t('bookings')}</h1>
        <span className="text-neutral-400 text-sm">{bookings.length} {t('total')}</span>
      </div>

      <div className="bg-secondary border border-neutral-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700 bg-neutral-800/50">
                {[t('customer'), t('phone'), t('service'), t('barber'), t('date'), t('time'), t('source'), t('payment'), t('status')].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-neutral-400 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b border-neutral-800 hover:bg-neutral-800/40 transition-colors">
                  <td className="px-4 py-3 text-neutral-100 font-medium whitespace-nowrap">{b.customerName}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.customerPhone}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.service.name}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.barber?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.timeSlot}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">{b.source}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentColors[b.paymentStatus]}`}>{b.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-neutral-500">{t('noBookingsYet')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
