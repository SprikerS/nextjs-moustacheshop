import { getToken } from 'next-auth/jwt'
import { jwtDecode } from 'jwt-decode'
import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/constants'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth(async req => {
  const { nextUrl } = req

  const isLoggedIn = !!req.auth
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const res = NextResponse.next()
  const secret = process.env.AUTH_SECRET
  const token = await getToken({ req, secret, secureCookie: process.env.NODE_ENV === 'production' })

  // ✅ Set cookie only if logged in and the cookie does not yet exist
  if (isLoggedIn && !req.cookies.get('access_token')) {
    const access_token = token?.token
    if (access_token) {
      const { exp } = jwtDecode<{ exp: number }>(access_token)

      res.cookies.set('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(exp * 1000),
        path: '/',
      })
    }
  }

  // 🔁 Normal redirects
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
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
