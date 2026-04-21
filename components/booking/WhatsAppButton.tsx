'use client'

import { MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { buildWhatsAppURL, buildDefaultWhatsAppURL } from '@/lib/whatsapp'
import { WHATSAPP_PHONE } from '@/lib/constants'
import type { BookingFormData } from '@/lib/types'

interface WhatsAppButtonProps {
  formData?: Partial<BookingFormData>
  // Nombres resueltos — BookingForm los pasa directo para evitar lookup por ID
  serviceName?: string
  barberName?: string
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

export default function WhatsAppButton({
  formData,
  serviceName,
  barberName,
  size = 'md',
  label = 'Continue on WhatsApp',
  className,
}: WhatsAppButtonProps) {
  function handleClick() {
    const url =
      formData && (formData.name || formData.service)
        ? buildWhatsAppURL(formData, WHATSAPP_PHONE, serviceName, barberName)
        : buildDefaultWhatsAppURL(WHATSAPP_PHONE)

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant="whatsapp"
      size={size}
      onClick={handleClick}
      icon={<MessageCircle size={18} />}
      className={className}
    >
      {label}
    </Button>
  )
}
