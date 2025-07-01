import 'server-only'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import { AUTHENTICATION_COOKIE } from '@/constants'
import { User } from '@/interfaces'

export async function getUserAuthentication(): Promise<User | null> {
  const cookieStore = await cookies()

  const session = cookieStore.get(AUTHENTICATION_COOKIE)?.value
  if (!session) return null

  return jwtDecode(session)
}
