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
  phoneNumber?: number
  verified: boolean
  active: boolean
  roles: Role[]
  iat: number
  exp: number
}

export interface Category {
  id: string
  name: string
  description?: string
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

export interface Order {
  id: string
  date: string
  customer: User
  employee: User
  details: OrderDetail[]
}

export interface OrderDetail {
  id: string
  quantity: number
  salePrice: number
  total: number
  product: Product
}

export interface Summaries {
  usersTotal: number
  usersActive: number
  usersInactive: number
  usersCustomers: number
  usersEmployees: number
  usersAdmins: number
  productsTotal: number
  produtcsActive: number
  produtcsInactive: number
  ordersTotal: number
  topEmployee: string
  topCustomer: string
}
