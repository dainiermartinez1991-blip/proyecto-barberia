import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

// POST /api/auth — login
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { username, password } = body

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
  }

  const admin = await prisma.admin.findUnique({ where: { username } })
  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signToken({ adminId: admin.id, username: admin.username })

  const response = NextResponse.json({ token, username: admin.username })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
    path: '/',
  })

  return response
}

// DELETE /api/auth — logout
export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.delete('admin_token')
  return response
}
