import type { BookingFormData } from './types'
import { formatWhatsAppMessage } from './utils'

export function buildWhatsAppURL(data: Partial<BookingFormData>, phone: string, serviceName?: string, barberName?: string): string {
  const message = formatWhatsAppMessage(data, serviceName, barberName)
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function buildDefaultWhatsAppURL(phone: string): string {
  const message = 'Hello! I would like to book an appointment at Noir Barbershop.'
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
