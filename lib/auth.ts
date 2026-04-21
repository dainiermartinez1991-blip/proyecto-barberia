import { SignJWT, jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret')
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '8h'

export interface JWTPayload {
  adminId: string
  username: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(EXPIRES_IN)
    .setIssuedAt()
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return req.cookies.get('admin_token')?.value ?? null
}

export async function requireAuth(req: NextRequest): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(req)
  if (!token) return null
  return verifyToken(token)
}
