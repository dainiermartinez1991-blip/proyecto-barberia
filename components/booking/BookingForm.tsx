'use client'

import { useState, useCallback, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import WhatsAppButton from './WhatsAppButton'
import { TIME_SLOTS } from '@/lib/constants'
import { validateBookingForm, getTodayString } from '@/lib/utils'
import type { BookingFormData, FormErrors } from '@/lib/types'
import { api, type Service, type Barber } from '@/lib/api'

const EMPTY_FORM: BookingFormData = {
  name: '', phone: '', service: '', barberId: '', date: '', time: '', notes: '',
}

interface BookingFormProps {
  prefilledServiceId?: string
  onSubmit?: () => void
}

export default function BookingForm({ prefilledServiceId, onSubmit }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormData>({ ...EMPTY_FORM, service: prefilledServiceId ?? '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [barbers, setBarbers] = useState<Barber[]>([])

  useEffect(() => {
    api.services.list().then(setServices).catch(() => {})
    api.barbers.list().then(setBarbers).catch(() => {})
  }, [])

  const set = useCallback((field: keyof BookingFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  function onBlur(field: keyof BookingFormData) {
    const fieldErrors = validateBookingForm({ ...form, [field]: form[field] })
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] ?? '' }))
  }

  // Nombres resueltos para el mensaje de WhatsApp
  const selectedServiceName = services.find(s => s.id === form.service)?.name
  const selectedBarberName = barbers.find(b => b.id === form.barberId)?.name

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')
    const fieldErrors = validateBookingForm(form)
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return }

    setLoading(true)
    try {
      await api.bookings.create({
        customerName: form.name,
        customerPhone: form.phone,
        serviceId: form.service,
        barberId: form.barberId || null,
        date: form.date,
        timeSlot: form.time,
        notes: form.notes || null,
        source: 'FORM',
      })
      setSubmitted(true)
      onSubmit?.()
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const serviceOptions = services.map(s => ({ value: s.id, label: `${s.name} — $${s.price}` }))
  const barberOptions = [
    { value: '', label: 'No preference' },
    ...barbers.filter(b => b.available).map(b => ({ value: b.id, label: b.name })),
  ]
  const timeOptions = TIME_SLOTS.map(t => ({ value: t, label: t }))

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-6">
        <CheckCircle size={52} className="text-primary" />
        <div>
          <h3 className="font-display text-2xl font-bold text-neutral-50">Pre-Booking Received!</h3>
          <p className="text-neutral-400 mt-2">
            Your slot is reserved. Complete your payment to confirm the appointment.
          </p>
        </div>
        <p className="text-neutral-400 text-sm">Need help? Contact us on WhatsApp.</p>
        <WhatsAppButton
          formData={form}
          serviceName={selectedServiceName}
          barberName={selectedBarberName}
          label="Send via WhatsApp"
          size="md"
        />
        <button
          onClick={() => { setSubmitted(false); setForm({ ...EMPTY_FORM, service: prefilledServiceId ?? '' }) }}
          className="text-neutral-400 hover:text-neutral-50 text-sm underline transition-colors"
        >
          Book another appointment
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input label="Full Name" required value={form.name} onChange={e => set('name', e.target.value)} onBlur={() => onBlur('name')} error={errors.name} placeholder="John Smith" />
      <Input label="Phone Number" type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} onBlur={() => onBlur('phone')} error={errors.phone} placeholder="+1 (555) 000-0000" />
      <Select label="Service" required value={form.service} onChange={e => set('service', e.target.value)} onBlur={() => onBlur('service')} error={errors.service} options={serviceOptions} placeholder="Select a service..." />
      <Select label="Barber Preference" value={form.barberId} onChange={e => set('barberId', e.target.value)} options={barberOptions} hint="Optional — leave blank for first available." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Date" type="date" required value={form.date} onChange={e => set('date', e.target.value)} onBlur={() => onBlur('date')} error={errors.date} min={getTodayString()} />
        <Select label="Time" required value={form.time} onChange={e => set('time', e.target.value)} onBlur={() => onBlur('time')} error={errors.time} options={timeOptions} placeholder="Select time..." />
      </div>
      <Textarea label="Notes" value={form.notes ?? ''} onChange={e => set('notes', e.target.value)} placeholder="Anything we should know? (optional)" hint="Allergies, style references, etc." />

      {apiError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3 text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
        Reserve My Slot
      </Button>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral-700" />
        <span className="text-neutral-500 text-xs">OR</span>
        <div className="flex-1 h-px bg-neutral-700" />
      </div>
      <WhatsAppButton
        formData={form}
        serviceName={selectedServiceName}
        barberName={selectedBarberName}
        label="Prefer WhatsApp?"
        size="md"
        className="w-full"
      />
    </form>
  )
}
