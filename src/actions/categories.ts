'use server'

import { Category } from '@/interfaces/category'
import { get } from '@/lib/http'

export default async function getCategories() {
  return get<Category[]>('categories')
}
