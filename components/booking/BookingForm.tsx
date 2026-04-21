'use client'

import { useState, useCallback, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import WhatsAppButton from './WhatsAppButton'
import { TIME_SLOTS } from '@/lib/constants'
import { validateBookingForm, getTodayString } from '@/lib/utils'
import type { BookingFormData, FormErrors } from '@/lib/types'
import { api, type Service, type Barber } from '@/lib/api'
import { useI18n } from '@/lib/I18nContext'

const EMPTY_FORM: BookingFormData = {
  name: '', phone: '', service: '', barberId: '', date: '', time: '', notes: '',
}

interface BookingFormProps {
  prefilledServiceId?: string
  onSubmit?: () => void
}

export default function BookingForm({ prefilledServiceId, onSubmit }: BookingFormProps) {
  const { t, locale } = useI18n()
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
      setApiError(err instanceof Error ? err.message : t('somethingWrong'))
    } finally {
      setLoading(false)
    }
  }

  const serviceOptions = services.map(s => ({ value: s.id, label: `${s.name} — $${s.price}` }))
  const barberOptions = [
    { value: '', label: t('noPreference') },
    ...barbers.filter(b => b.available).map(b => ({ value: b.id, label: b.name })),
  ]
  const timeOptions = TIME_SLOTS.map(slot => ({ value: slot, label: slot }))

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-6">
        <CheckCircle size={52} className="text-primary" />
        <div>
          <h3 className="font-display text-2xl font-bold text-neutral-50">{t('preBookingReceived')}</h3>
          <p className="text-neutral-400 mt-2">{t('slotReserved')}</p>
        </div>
        <p className="text-neutral-400 text-sm">{t('needHelp')}</p>
        <WhatsAppButton
          formData={form}
          serviceName={selectedServiceName}
          barberName={selectedBarberName}
          label={t('sendViaWhatsApp')}
          size="md"
        />
        <button
          onClick={() => { setSubmitted(false); setForm({ ...EMPTY_FORM, service: prefilledServiceId ?? '' }) }}
          className="text-neutral-400 hover:text-neutral-50 text-sm underline transition-colors cursor-pointer"
        >
          {t('bookAnother')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input label={t('fullName')} required value={form.name} onChange={e => set('name', e.target.value)} onBlur={() => onBlur('name')} error={errors.name} placeholder="John Smith" />
      <Input label={t('phoneNumber')} type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} onBlur={() => onBlur('phone')} error={errors.phone} placeholder="+1 (555) 000-0000" />
      <Select label={t('service')} required value={form.service} onChange={e => set('service', e.target.value)} onBlur={() => onBlur('service')} error={errors.service} options={serviceOptions} placeholder={t('selectService')} />
      <Select label={t('barberPreference')} value={form.barberId} onChange={e => set('barberId', e.target.value)} options={barberOptions} hint={t('optionalBarber')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DatePicker
          label={t('date')}
          required
          value={form.date}
          onChange={val => set('date', val)}
          min={getTodayString()}
          error={errors.date}
          placeholder={t('selectDate')}
          locale={locale}
        />
        <Select label={t('time')} required value={form.time} onChange={e => set('time', e.target.value)} onBlur={() => onBlur('time')} error={errors.time} options={timeOptions} placeholder={t('selectTime')} />
      </div>
      <Textarea label={t('notes')} value={form.notes ?? ''} onChange={e => set('notes', e.target.value)} placeholder={t('optionalNotes')} hint={t('notesHint')} />

      {apiError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-md px-4 py-3 text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
        {t('reserveSlot')}
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
        label={t('preferWhatsApp')}
        size="md"
        className="w-full"
      />
    </form>
  )
}
