import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const res = await fetch('http://localhost:3003/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    credentials: 'include',
  })

  const data = await res.json()
  const cookie = res.headers.getSetCookie().find(c => c.startsWith('access_token='))

  if (cookie) {
    ;(await cookies()).set({
      name: 'access_token',
      value: cookie.split(';')[0].split('=')[1],
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    })
  }

  return NextResponse.json(data)
}
