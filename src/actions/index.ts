import { findAllCategories } from './categories'
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findOneProduct,
  revalidateProducts,
  updateProduct,
} from './products'

export const CATEGORY_ACTIONS = {
  findAll: findAllCategories,
}

export const PRODUCT_ACTIONS = {
  create: createProduct,
  delete: deleteProduct,
  findAll: findAllProducts,
  findOneById: findOneProduct,
  revalidate: revalidateProducts,
  update: updateProduct,
}
