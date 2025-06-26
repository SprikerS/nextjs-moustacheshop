import 'server-only'

import type { Session } from 'next-auth'

import { auth } from '@/auth'

export const currentSessionUser = async (): Promise<Session['user'] | undefined> => {
  const session = await auth()
  return session?.user
}
