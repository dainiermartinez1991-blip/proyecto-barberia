import BarberCard from './BarberCard'
import PreviewSectionHeader from './PreviewSectionHeader'
import { prisma } from '@/lib/prisma'

export default async function BarbersPreview() {
  const barbers = await prisma.barber.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PreviewSectionHeader
          labelKey="meetTheTeam"
          linkHref="/barbers"
          linkLabelKey="meetAllBarbers"
          titleFirstWord="Our"
          titleHighlight="Barbers"
        />

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
