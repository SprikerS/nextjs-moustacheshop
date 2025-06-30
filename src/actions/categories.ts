'use server'

import { Category } from '@/interfaces'
import { get } from '@/lib/http'

export async function findAllCategories() {
  return get<Category[]>('categories')
}
