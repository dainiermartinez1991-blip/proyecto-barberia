import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import BarberCard from '@/components/sections/BarberCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function BarbersPage() {
  const barbers = await prisma.barber.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-neutral-900 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-100">Barbers</span>
        </nav>

        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">The Crew</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-50">
            Meet Our <span className="text-primary">Barbers</span>
          </h1>
          <p className="text-neutral-400 mt-4 max-w-xl">
            Experienced professionals passionate about their craft. Hover any card to book directly with your preferred barber.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber, i) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
