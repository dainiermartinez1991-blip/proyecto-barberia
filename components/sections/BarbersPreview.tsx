import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BarberCard from './BarberCard'
import { prisma } from '@/lib/prisma'

export default async function BarbersPreview() {
  const barbers = await prisma.barber.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">Meet the Team</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
              Our <span className="text-primary">Barbers</span>
            </h2>
          </div>
          <Link
            href="/barbers"
            className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors group"
          >
            Meet All Barbers
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
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
    </section>
  )
}
