import type { Metadata } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import PublicShell from '@/components/layout/PublicShell'
import { I18nProvider } from '@/lib/I18nContext'

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
        <I18nProvider>
          <PublicShell>{children}</PublicShell>
        </I18nProvider>
      </body>
    </html>
  )
}
