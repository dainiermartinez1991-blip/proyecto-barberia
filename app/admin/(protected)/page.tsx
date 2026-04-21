import { prisma } from '@/lib/prisma'
import { DashboardView } from '@/components/admin/views/DashboardView'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [total, pending, confirmed, cancelled, recentBookings] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'CANCELLED' } }),
    prisma.booking.findMany({ take: 8, orderBy: { createdAt: 'desc' }, include: { service: true, barber: true } }),
  ])

  const serializable = recentBookings.map(b => ({
    ...b,
    date: b.date.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    paymentExpiry: b.paymentExpiry?.toISOString() ?? null,
    webhookSentAt: b.webhookSentAt?.toISOString() ?? null,
  }))

  return <DashboardView total={total} pending={pending} confirmed={confirmed} cancelled={cancelled} recentBookings={serializable} />
}
