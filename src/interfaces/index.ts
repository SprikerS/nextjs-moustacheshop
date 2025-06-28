interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  active: boolean
  category?: Category
  description?: string
}

export type { Category, Product }
