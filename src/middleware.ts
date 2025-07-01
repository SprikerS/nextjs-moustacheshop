import { NextRequest, NextResponse } from 'next/server'

import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/constants'
import { getUserAuthentication } from './lib/session'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  const isLoggedIn = await getUserAuthentication()
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const res = NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return res
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
