import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

// GET /api/barbers — public
export async function GET() {
  const barbers = await prisma.barber.findMany({
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(barbers)
}

// POST /api/barbers — admin only
export async function POST(req: NextRequest) {
  const admin = await requireAuth(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, specialty, bio, imageUrl, instagram } = body

  if (!name || !specialty || !bio) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const barber = await prisma.barber.create({
    data: { name, specialty, bio, imageUrl: imageUrl ?? '', instagram: instagram ?? null },
  })

  return NextResponse.json(barber, { status: 201 })
}
