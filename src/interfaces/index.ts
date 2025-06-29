export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface Category {
  id: string
  name: string
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
