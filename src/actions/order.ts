'use server'

import { format } from 'date-fns'
import { revalidateTag } from 'next/cache'

import { SearchParams } from '@/constants'
import { Order, PaginatedResponse } from '@/interfaces'
import { del, get, patch, post } from '@/lib/http'
import { SaleFormValues } from '@/schemas'

export async function revalidateUsers() {
  revalidateTag('orders')
}

function buildOrderPayload(values: SaleFormValues) {
  return {
    date: format(values.date, 'yyyy-MM-dd'),
    dni: values.dni,
    names: values.names,
    paternalSurname: values.paternal,
    maternalSurname: values.maternal,
    products: values.products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
    })),
  }
}

export async function createOrder(values: SaleFormValues) {
  const payload = buildOrderPayload(values)
  return await post('orders', payload)
}

export async function updateOrder(id: string, values: SaleFormValues) {
  const payload = buildOrderPayload(values)
  return await patch(`orders/${id}`, payload)
}

export async function findAllOrders({ search, limit, page }: SearchParams) {
  const params = new URLSearchParams({
    search: search.toString(),
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  })

  return get<PaginatedResponse<Order>>('orders', ['orders'], params)
}

export async function deleteOrder(id: string) {
  return await del(`orders/${id}`)
}
