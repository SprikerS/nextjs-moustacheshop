'use server'

import { BaseUser, Summaries } from '@/interfaces'
import { get, getSafe } from '@/lib/http'

export async function reniecScraping(dni: string) {
  return getSafe<BaseUser>('user/reniec', ['reniec'], new URLSearchParams({ dni }))
}

export async function summaries() {
  return await get<Summaries>('summaries', ['summaries'])
}
