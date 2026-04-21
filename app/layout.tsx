import type { Metadata } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BookingModal from '@/components/booking/BookingModal'
import { BookingProvider } from '@/lib/BookingContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Noir Barbershop — Precision. Style. Confidence.',
  description: 'Premium barbershop experience. Expert cuts, classic shaves, and beard artistry. Book your appointment today.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  )
}
