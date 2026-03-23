import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json(null, { status: 401 })
  }
  // Return the raw JWT string so Apollo can use it as Bearer token
  const rawToken = req.cookies.get(
    process.env.NEXTAUTH_URL?.startsWith('https://')
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
  )?.value

  return NextResponse.json(rawToken ?? null)
}
