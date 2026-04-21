'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import BookingModal from '@/components/booking/BookingModal'
import { BookingProvider } from '@/lib/BookingContext'
import type { ReactNode } from 'react'

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <BookingProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  )
}
