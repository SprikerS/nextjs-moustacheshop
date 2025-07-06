import { Role } from '@/constants/roles'

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export interface BaseUser {
  dni: string
  names: string
  paternalSurname: string
  maternalSurname: string
}

export interface User extends BaseUser {
  id: string
  email: string
  phoneNumber: number
  verified: boolean
  active: boolean
  roles: Role[]
  iat: number
  exp: number
}

export interface Category {
  id: string
  name: string
  productsCount?: number
}

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  active: boolean
  category?: Category
  description?: string
}
