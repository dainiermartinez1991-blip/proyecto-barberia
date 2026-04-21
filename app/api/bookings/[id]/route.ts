import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { triggerN8NWebhook } from '@/lib/n8n'

type Params = { params: Promise<{ id: string }> }

// GET /api/bookings/:id — admin only
export async function GET(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true, barber: true },
  })

  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(booking)
}

// PATCH /api/bookings/:id — admin + N8N callback
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()

  // Permitir que N8N actualice con su secret, o que el admin use JWT
  const n8nSecret = req.headers.get('x-n8n-secret')
  const isN8N = n8nSecret && n8nSecret === process.env.N8N_WEBHOOK_SECRET
  const isAdmin = await requireAuth(req)

  if (!isN8N && !isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true, barber: true },
  })
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { status, paymentStatus, paymentId, n8nExecutionId, webhookStatus } = body

  const updated = await prisma.booking.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(paymentStatus ? { paymentStatus } : {}),
      ...(paymentId ? { paymentId } : {}),
      ...(n8nExecutionId ? { n8nExecutionId } : {}),
      ...(webhookStatus ? { webhookStatus } : {}),
    },
    include: { service: true, barber: true },
  })

  // Si N8N confirma el pago, disparar evento de confirmación
  if (status === 'CONFIRMED' && booking.status !== 'CONFIRMED') {
    triggerN8NWebhook(updated, 'booking.confirmed').catch(console.error)
  }

  if (status === 'CANCELLED' && booking.status !== 'CANCELLED') {
    triggerN8NWebhook(updated, 'booking.cancelled').catch(console.error)
  }

  return NextResponse.json(updated)
}

// DELETE /api/bookings/:id — admin only
export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.booking.update({
    where: { id },
    data: { status: 'CANCELLED' },
  })

  return NextResponse.json({ message: 'Booking cancelled' })
}
