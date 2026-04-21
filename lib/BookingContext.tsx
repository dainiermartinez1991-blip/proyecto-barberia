'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface BookingContextValue {
  isOpen: boolean
  prefilledServiceId: string
  openModal: (serviceId?: string) => void
  closeModal: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefilledServiceId, setPrefilledServiceId] = useState('')

  function openModal(serviceId = '') {
    setPrefilledServiceId(serviceId)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setPrefilledServiceId('')
  }

  return (
    <BookingContext.Provider value={{ isOpen, prefilledServiceId, openModal, closeModal }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingModal() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookingModal must be used within BookingProvider')
  return ctx
}
