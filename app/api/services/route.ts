import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET /api/services — public
export async function GET() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { category: 'asc' },
  })
  return NextResponse.json(services)
}

// POST /api/services — admin only
export async function POST(req: NextRequest) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, description, price, duration, category } = body

  if (!name || !description || price == null || !duration || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const service = await prisma.service.create({
    data: { name, description, price: Number(price), duration: Number(duration), category },
  })

  return NextResponse.json(service, { status: 201 })
}
