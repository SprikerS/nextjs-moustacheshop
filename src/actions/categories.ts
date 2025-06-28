'use server'

import { Category } from '@/interfaces/category'
import { get } from '@/lib/http'

export async function getCategories() {
  return get<Category[]>('categories')
}
