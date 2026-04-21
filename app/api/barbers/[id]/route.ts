import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, specialty, bio, imageUrl, instagram, available } = body

  const barber = await prisma.barber.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(specialty !== undefined ? { specialty } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(instagram !== undefined ? { instagram } : {}),
      ...(available !== undefined ? { available } : {}),
    },
  })

  return NextResponse.json(barber)
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.barber.update({ where: { id }, data: { available: false } })

  return NextResponse.json({ message: 'Barber deactivated' })
}
