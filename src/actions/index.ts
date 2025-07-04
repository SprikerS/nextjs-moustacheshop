import { findAllCategories } from './categories'
import { createOrder, updateOrder } from './order'
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findOneProduct,
  findProductsBySearch,
  revalidateProducts,
  updateProduct,
} from './products'

export const CATEGORY_ACTIONS = {
  findAll: findAllCategories,
}

export const ORDER_ACTIONS = {
  create: createOrder,
  update: updateOrder,
}

export const PRODUCT_ACTIONS = {
  create: createProduct,
  delete: deleteProduct,
  findAll: findAllProducts,
  findOneById: findOneProduct,
  findProductsBySearch: findProductsBySearch,
  revalidate: revalidateProducts,
  update: updateProduct,
}
