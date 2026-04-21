import ServiceCard from './ServiceCard'
import PreviewSectionHeader from './PreviewSectionHeader'
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
        <PreviewSectionHeader
          labelKey="whatWeOffer"
          linkHref="/services"
          linkLabelKey="viewAllServices"
          titleFirstWord="Our"
          titleHighlight="Services"
        />

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
