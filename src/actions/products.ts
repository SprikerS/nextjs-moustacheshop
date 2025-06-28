'use server'

import { get, post } from '@/lib/http'
import { Product } from '@/interfaces'
import { ProductFormValues } from '@/schemas'

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

export async function AllProducts() {
  return get<Product[]>('products')
}
