export interface BookingWithRelations {
  id: string
  customerName: string
  customerPhone: string
  date: Date
  timeSlot: string
  notes: string | null
  status: string
  source: string
  paymentExpiry: Date | null
  service: { name: string; price: number }
  barber: { name: string } | null
}

export interface N8NBookingPayload {
  event: 'booking.created' | 'booking.confirmed' | 'booking.cancelled'
  booking: {
    id: string
    customerName: string
    customerPhone: string
    service: string
    servicePrice: number
    barber: string | null
    date: string
    timeSlot: string
    notes: string | null
    status: string
    source: string
    paymentExpiry: string | null
  }
  meta: {
    timestamp: string
    callbackUrl: string
  }
}

export async function triggerN8NWebhook(
  booking: BookingWithRelations,
  event: N8NBookingPayload['event'] = 'booking.created',
): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[N8N] N8N_WEBHOOK_URL not set — skipping webhook')
    return { success: false, error: 'N8N_WEBHOOK_URL not configured' }
  }

  const payload: N8NBookingPayload = {
    event,
    booking: {
      id: booking.id,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      service: booking.service.name,
      servicePrice: booking.service.price,
      barber: booking.barber?.name ?? null,
      date: booking.date.toISOString().split('T')[0],
      timeSlot: booking.timeSlot,
      notes: booking.notes,
      status: booking.status,
      source: booking.source,
      paymentExpiry: booking.paymentExpiry?.toISOString() ?? null,
    },
    meta: {
      timestamp: new Date().toISOString(),
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/webhooks/n8n`,
    },
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-n8n-secret': process.env.N8N_WEBHOOK_SECRET ?? '',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`[N8N] Webhook responded ${res.status}: ${text}`)
      return { success: false, error: `N8N responded ${res.status}` }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[N8N] Webhook failed:', message)
    return { success: false, error: message }
  }
}
