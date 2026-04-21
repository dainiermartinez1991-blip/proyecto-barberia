import { prisma } from '@/lib/prisma'
import BarbersView from '@/components/sections/BarbersView'

export const dynamic = 'force-dynamic'

export default async function BarbersPage() {
  const barbers = await prisma.barber.findMany({
    orderBy: { name: 'asc' },
  })

  return <BarbersView barbers={barbers} />
}
