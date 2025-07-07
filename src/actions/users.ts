'use server'

import { revalidateTag } from 'next/cache'

import { PaginatedResponse, User } from '@/interfaces'
import { del, get, patch, post } from '@/lib/http'
import { SearchParams } from '@/constants'
import { UserFormValues } from '@/schemas'
import { getAccumulatedRoles } from '@/utils/roles'

export async function revalidateUsers() {
  revalidateTag('users')
}

function buildOrderPayload(values: UserFormValues) {
  return {
    names: values.names,
    paternalSurname: values.paternal,
    maternalSurname: values.maternal,
    dni: values.dni,
    email: values.email,
    phoneNumber: parseInt(values.phone, 10),
    roles: getAccumulatedRoles(values.role),
    active: values.active,
  }
}

export async function createUser(values: UserFormValues) {
  const payload = buildOrderPayload(values)
  return await post('user/register-dashboard', payload)
}

export async function updateUser(id: string, values: UserFormValues) {
  const payload = buildOrderPayload(values)
  return await patch(`user/${id}`, payload)
}

export async function deleteUser(id: string) {
  return await del(`user/${id}`)
}

export async function findAllUsers({ search, active, limit, page }: SearchParams) {
  const params = new URLSearchParams({
    search: search.toString(),
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  })

  if (typeof active === 'boolean') params.set('active', active.toString())

  return get<PaginatedResponse<User>>('user', ['user'], params)
}
