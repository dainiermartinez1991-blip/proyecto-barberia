import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/webhooks/n8n
 * Endpoint exclusivo para que N8N actualice el estado de una reserva.
 * N8N debe enviar el header x-n8n-secret con el valor de N8N_WEBHOOK_SECRET.
 *
 * Body esperado:
 * {
 *   bookingId: string
 *   status?: 'CONFIRMED' | 'CANCELLED'
 *   paymentStatus?: 'PAID' | 'REFUNDED'
 *   paymentId?: string
 *   n8nExecutionId?: string
 * }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-n8n-secret')
  if (!secret || secret !== process.env.N8N_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { bookingId, status, paymentStatus, paymentId, n8nExecutionId } = body

  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      ...(status ? { status } : {}),
      ...(paymentStatus ? { paymentStatus } : {}),
      ...(paymentId ? { paymentId } : {}),
      ...(n8nExecutionId ? { n8nExecutionId } : {}),
      webhookStatus: 'ACKNOWLEDGED',
    },
    include: { service: true, barber: true },
  })

  return NextResponse.json({ success: true, booking: updated })
}
