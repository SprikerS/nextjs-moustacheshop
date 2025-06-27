import NextAuth, { type DefaultSession } from 'next-auth'

import { UserRole } from '@/constants'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      names: string
      paternalSurname: string
      maternalSurname: string
      dni: string
      email: string
      phoneNumber?: string
      active: boolean
      roles: UserRole[]
      token: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    names: string
    email: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // Default
    name?: string | null
    email?: string | null
    picture?: string | null
    sub?: string
    // standard
    iat?: number
    exp?: number
    jti?: string
    // custom
    id?: string
    email?: string
    token?: string
  }
}
