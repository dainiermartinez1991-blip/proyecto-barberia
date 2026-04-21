import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BookingFormData, FormErrors } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppMessage(data: Partial<BookingFormData>, serviceName?: string, barberName?: string): string {
  const lines: string[] = ['Hello! I would like to book an appointment at Noir Barbershop.', '']
  if (data.name) lines.push(`*Name:* ${data.name}`)
  if (data.phone) lines.push(`*Phone:* ${data.phone}`)
  if (serviceName || data.service) lines.push(`*Service:* ${serviceName ?? data.service}`)
  if (barberName) lines.push(`*Barber:* ${barberName}`)
  else if (data.barberId) lines.push(`*Barber:* No preference`)
  if (data.date) lines.push(`*Date:* ${data.date}`)
  if (data.time) lines.push(`*Time:* ${data.time}`)
  if (data.notes) lines.push(`*Notes:* ${data.notes}`)
  return lines.join('\n')
}

export function validateBookingForm(data: Partial<BookingFormData>): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }
  if (!data.phone || !/^[+\d][\d\s\-]{6,14}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!data.service) {
    errors.service = 'Please select a service.'
  }
  if (!data.date) {
    errors.date = 'Please select a date.'
  } else {
    const selected = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) {
      errors.date = 'Date cannot be in the past.'
    }
  }
  if (!data.time) {
    errors.time = 'Please select a time.'
  }
  return errors
}

export function validateField(field: keyof BookingFormData, value: string): string {
  const partial: Partial<BookingFormData> = { [field]: value }
  const errors = validateBookingForm({ ...partial, phone: field === 'phone' ? value : '+10000000000', service: field === 'service' ? value : 'placeholder', date: field === 'date' ? value : new Date().toISOString().split('T')[0], time: field === 'time' ? value : '9:00 AM', name: field === 'name' ? value : 'Placeholder' })
  return errors[field] ?? ''
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}
