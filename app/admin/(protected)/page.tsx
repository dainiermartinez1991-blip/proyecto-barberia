import { prisma } from '@/lib/prisma'
import { CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react'

type BookingRow = Awaited<ReturnType<typeof prisma.booking.findMany<{ include: { service: true; barber: true } }>>>[number]

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [total, pending, confirmed, cancelled] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'CANCELLED' } }),
  ])

  const recentBookings = await prisma.booking.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { service: true, barber: true },
  })

  const stats = [
    { label: 'Total Bookings', value: total, icon: CalendarCheck, color: 'text-neutral-300' },
    { label: 'Pending Payment', value: pending, icon: Clock, color: 'text-yellow-400' },
    { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Cancelled', value: cancelled, icon: XCircle, color: 'text-red-400' },
  ]

  const statusColors: Record<string, string> = {
    PENDING: 'text-yellow-400 bg-yellow-400/10',
    CONFIRMED: 'text-green-400 bg-green-400/10',
    CANCELLED: 'text-red-400 bg-red-400/10',
    COMPLETED: 'text-blue-400 bg-blue-400/10',
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-50 mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-secondary border border-neutral-700 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-neutral-400 text-sm">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <p className={`font-display text-4xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary border border-neutral-700 rounded-lg">
        <div className="px-6 py-4 border-b border-neutral-700">
          <h2 className="font-display font-semibold text-neutral-50">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700">
                {['Customer', 'Service', 'Barber', 'Date', 'Time', 'Source', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-neutral-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(recentBookings as BookingRow[]).map(b => (
                <tr key={b.id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                  <td className="px-4 py-3 text-neutral-100">{b.customerName}</td>
                  <td className="px-4 py-3 text-neutral-300">{b.service.name}</td>
                  <td className="px-4 py-3 text-neutral-300">{b.barber?.name ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-300">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-neutral-300">{b.timeSlot}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">{b.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-neutral-500">No bookings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
