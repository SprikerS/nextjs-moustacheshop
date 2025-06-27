'use server'

import { cookies } from 'next/headers'
import { signOut } from '@/auth'

export const clearAccessToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')

  await signOut()
}
