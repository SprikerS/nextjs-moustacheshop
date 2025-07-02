'use server'

import { revalidateTag } from 'next/cache'

import { del, get, getSafe, patch, post } from '@/lib/http'
import { PaginatedResponse, Product } from '@/interfaces'
import { ProductFormValues } from '@/schemas'
import { ProductSearchParams } from '@/components/products'

export async function createProduct(values: ProductFormValues) {
  const payload = {
    name: values.name,
    price: parseFloat(values.price),
    stock: parseInt(values.stock, 10),
    active: values.active || false,
    categoryId: values.category?.trim() || null,
    description: values.description?.trim() || null,
  }

  return await post('products', payload)
}

export async function updateProduct(id: string, values: ProductFormValues) {
  const payload = {
    name: values.name,
    price: parseFloat(values.price),
    stock: parseInt(values.stock, 10),
    active: values.active || false,
    categoryId: values.category?.trim() || null,
    description: values.description?.trim() || null,
  }

  return await patch(`products/${id}`, payload)
}

export async function revalidateProducts() {
  revalidateTag('products')
}

export async function findAllProducts({ search, limit, page, category, active }: ProductSearchParams) {
  const params = new URLSearchParams({
    search: search.toString(),
    category: category.toString(),
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  })

  if (typeof active === 'boolean') params.set('active', active.toString())

  return get<PaginatedResponse<Product>>('products', ['products'], params)
}

export async function findProductsBySearch(search: string, limit: number = 50) {
  const params = new URLSearchParams({
    search,
    limit: limit.toString(),
  })

  return get<PaginatedResponse<Product>>('products', ['products'], params)
}

export async function findOneProduct(id: string) {
  return await getSafe<Product>(`products/${id}`)
}

export async function deleteProduct(id: string) {
  return await del(`products/${id}`)
}
