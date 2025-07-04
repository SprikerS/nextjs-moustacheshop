'use server'

import { patch, post } from '@/lib/http'
import { SaleFormValues } from '@/schemas'
import { format } from 'date-fns'

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
  return await post('products', payload)
}

export async function updateOrder(id: string, values: SaleFormValues) {
  const payload = buildOrderPayload(values)
  return await patch(`orders/${id}`, payload)
}
