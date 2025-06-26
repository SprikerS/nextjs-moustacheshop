import NextAuth, { type DefaultSession } from 'next-auth'

import { UserRole } from '@/constants'

declare module 'next-auth' {
  interface Session {
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
}
