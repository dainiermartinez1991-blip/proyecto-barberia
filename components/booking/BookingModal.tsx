'use client'

import Modal from '@/components/ui/Modal'
import BookingForm from './BookingForm'
import { useBookingModal } from '@/lib/BookingContext'

export default function BookingModal() {
  const { isOpen, prefilledServiceId, closeModal } = useBookingModal()

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Book Your Appointment" className="max-w-xl">
      {/* key fuerza remount al cambiar de servicio, reiniciando el form */}
      <BookingForm
        key={prefilledServiceId}
        prefilledServiceId={prefilledServiceId}
        onSubmit={closeModal}
      />
    </Modal>
  )
}
