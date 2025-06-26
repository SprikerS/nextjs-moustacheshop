import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export default {
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
    updateAge: 86400,
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          if (!res.ok) return null

          // Important: NextAuth does not automatically save cookies from other domains
          // We use a proxy to have NestJS return the cookie to the browser

          const user = await res.json()
          return user
        } catch (error) {
          console.error('Error parsing credentials:', error)
          return null
        }
      },
    }),
  ],
  debug: false,
  trustHost: true,
} satisfies NextAuthConfig
