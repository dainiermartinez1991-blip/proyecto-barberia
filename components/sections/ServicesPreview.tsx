import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ServiceCard from './ServiceCard'
import { prisma } from '@/lib/prisma'

export default async function ServicesPreview() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { category: 'asc' },
    take: 4,
  })

  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">What We Offer</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
              Our <span className="text-primary">Services</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors group"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
