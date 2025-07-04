'use server'

import { BaseUser } from '@/interfaces'
import { get } from '@/lib/http'

export async function reniecScraping(dni: string) {
  return get<BaseUser>('user/reniec', ['reniec'], new URLSearchParams({ dni }))
}
