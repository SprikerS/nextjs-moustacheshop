'use server'

import { get } from '@/lib/http'

export default async function getCategories() {
  return get('categories')
}
