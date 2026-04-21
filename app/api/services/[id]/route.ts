import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, description, price, duration, category, active } = body

  const service = await prisma.service.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(price !== undefined ? { price: Number(price) } : {}),
      ...(duration !== undefined ? { duration: Number(duration) } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(active !== undefined ? { active } : {}),
    },
  })

  return NextResponse.json(service)
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  // Soft delete — desactiva en vez de borrar
  const service = await prisma.service.update({
    where: { id },
    data: { active: false },
  })

  return NextResponse.json(service)
}
