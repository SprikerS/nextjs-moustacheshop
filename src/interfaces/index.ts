export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

export type Role = 'customer' | 'employee' | 'admin' | 'super-user'

export interface User {
  id: string
  names: string
  paternalSurname: string
  maternalSurname: string
  dni: string
  email: string
  phoneNumber?: number
  active: boolean
  roles: Role[]
  token: string
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
