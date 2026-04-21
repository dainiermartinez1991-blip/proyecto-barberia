'use client'

import { CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useI18n } from '@/lib/I18nContext'

interface Booking {
  id: string
  customerName: string
  service: { name: string }
  barber?: { name: string } | null
  date: string | Date
  timeSlot: string
  source: string
  status: string
}

interface Props {
  total: number
  pending: number
  confirmed: number
  cancelled: number
  recentBookings: Booking[]
}

const statusColors: Record<string, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10',
  CONFIRMED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
  COMPLETED: 'text-blue-400 bg-blue-400/10',
}

export function DashboardView({ total, pending, confirmed, cancelled, recentBookings }: Props) {
  const { t } = useI18n()

  const stats = [
    { label: t('totalBookings'), value: total, icon: CalendarCheck, color: 'text-neutral-300' },
    { label: t('pendingPayment'), value: pending, icon: Clock, color: 'text-yellow-400' },
    { label: t('confirmed'), value: confirmed, icon: CheckCircle, color: 'text-green-400' },
    { label: t('cancelled'), value: cancelled, icon: XCircle, color: 'text-red-400' },
  ]

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-display text-2xl md:text-3xl font-bold text-neutral-50 mb-6 md:mb-8">{t('dashboard')}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-secondary border border-neutral-700 rounded-lg p-4 md:p-5">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <span className="text-neutral-400 text-xs md:text-sm leading-tight">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <p className={`font-display text-3xl md:text-4xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary border border-neutral-700 rounded-lg">
        <div className="px-4 md:px-6 py-4 border-b border-neutral-700">
          <h2 className="font-display font-semibold text-neutral-50">{t('recentBookings')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700">
                {[t('customer'), t('service'), t('barber'), t('date'), t('time'), t('source'), t('status')].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-neutral-400 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(b => (
                <tr key={b.id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3 text-neutral-100">{b.customerName}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.service.name}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.barber?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-neutral-300 whitespace-nowrap">{b.timeSlot}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">{b.source}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-neutral-500">{t('noBookingsYet')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
