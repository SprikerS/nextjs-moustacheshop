'use server'

import { revalidateTag } from 'next/cache'

import { SearchParams } from '@/constants'
import { Category, PaginatedResponse } from '@/interfaces'
import { del, get, patch, post } from '@/lib/http'
import { CategoryFormValues } from '@/schemas'

export async function revalidateCategories() {
  revalidateTag('categories')
}

function createCategoryPayload(values: CategoryFormValues) {
  return {
    name: values.name,
    description: values.description || null,
  }
}

export async function createCategory(values: CategoryFormValues) {
  const payload = createCategoryPayload(values)
  return await post('categories', payload)
}

export async function updateCategory(id: string, values: CategoryFormValues) {
  const payload = createCategoryPayload(values)
  return await patch(`categories/${id}`, payload)
}

export async function deleteCategory(id: string) {
  return await del(`categories/${id}`)
}

export async function findAllCategories({ search = '', limit = 10, page = 1 }: Partial<SearchParams> = {}) {
  const params = new URLSearchParams({
    search: search.toString(),
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  })

  return get<PaginatedResponse<Category>>('categories', ['categories'], params)
}
