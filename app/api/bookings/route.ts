import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { triggerN8NWebhook } from '@/lib/n8n'

// GET /api/bookings — admin only
export async function GET(req: NextRequest) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const date = searchParams.get('date')

  const bookings = await prisma.booking.findMany({
    where: {
      ...(status ? { status: status as 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' } : {}),
      ...(date ? { date: { gte: new Date(date), lt: new Date(new Date(date).getTime() + 86400000) } } : {}),
    },
    include: { service: true, barber: true },
    orderBy: [{ date: 'asc' }, { timeSlot: 'asc' }],
  })

  return NextResponse.json(bookings)
}

// POST /api/bookings — public (form) + N8N (whatsapp)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    customerName, customerPhone, serviceId, barberId,
    date, timeSlot, notes, source = 'FORM',
  } = body

  if (!customerName || !customerPhone || !serviceId || !date || !timeSlot) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Validar que el servicio existe
  const service = await prisma.service.findUnique({ where: { id: serviceId } })
  if (!service || !service.active) {
    return NextResponse.json({ error: 'Service not found or inactive' }, { status: 404 })
  }

  const bookingDate = new Date(date)

  // Detectar duplicados:
  // - Con barbero específico: ese barbero ya tiene ese slot
  // - Sin preferencia de barbero: todos los barberos están ocupados en ese slot
  if (barberId) {
    const duplicate = await prisma.booking.findFirst({
      where: { date: bookingDate, timeSlot, barberId, status: { in: ['PENDING', 'CONFIRMED'] } },
    })
    if (duplicate) {
      return NextResponse.json(
        { error: 'This barber is already booked for that slot. Please choose another time.' },
        { status: 409 },
      )
    }
  } else {
    const totalBarbers = await prisma.barber.count({ where: { available: true } })
    const bookedSlots = await prisma.booking.count({
      where: { date: bookingDate, timeSlot, barberId: { not: null }, status: { in: ['PENDING', 'CONFIRMED'] } },
    })
    if (bookedSlots >= totalBarbers) {
      return NextResponse.json(
        { error: 'No barbers available for that time slot. Please choose another time.' },
        { status: 409 },
      )
    }
  }

  const timeoutMinutes = parseInt(process.env.BOOKING_PAYMENT_TIMEOUT_MINUTES ?? '30')
  const paymentExpiry = new Date(Date.now() + timeoutMinutes * 60 * 1000)

  const booking = await prisma.booking.create({
    data: {
      customerName,
      customerPhone,
      serviceId,
      barberId: barberId || null,
      date: bookingDate,
      timeSlot,
      notes: notes || null,
      status: 'PENDING',
      source: (source === 'WHATSAPP' ? 'WHATSAPP' : 'FORM') as 'FORM' | 'WHATSAPP',
      paymentExpiry,
    },
    include: { service: true, barber: true },
  })

  // Disparar N8N de forma no bloqueante
  triggerN8NWebhook(booking, 'booking.created').then(async ({ success, error }) => {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        webhookSentAt: new Date(),
        webhookStatus: success ? 'SENT' : 'FAILED',
      },
    })
    if (!success) console.error('[N8N] Webhook failed for booking', booking.id, error)
  })

  return NextResponse.json(booking, { status: 201 })
}
