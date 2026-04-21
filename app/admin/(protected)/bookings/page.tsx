import { prisma } from '@/lib/prisma'
import { BookingsView } from '@/components/admin/views/BookingsView'

export const dynamic = 'force-dynamic'

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: [{ date: 'desc' }, { timeSlot: 'asc' }],
    include: { service: true, barber: true },
  })

  const serializable = bookings.map(b => ({
    ...b,
    date: b.date.toISOString(),
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
    paymentExpiry: b.paymentExpiry?.toISOString() ?? null,
    webhookSentAt: b.webhookSentAt?.toISOString() ?? null,
  }))

  return <BookingsView bookings={serializable} />
}
