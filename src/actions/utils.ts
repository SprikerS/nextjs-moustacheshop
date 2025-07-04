'use server'

import { BaseUser } from '@/interfaces'
import { getSafe } from '@/lib/http'

export async function reniecScraping(dni: string) {
  return getSafe<BaseUser>('user/reniec', ['reniec'], new URLSearchParams({ dni }))
}
