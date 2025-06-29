import { createProduct, findAllProducts, revalidateProducts } from './products'

export const PRODUCT_ACTIONS = {
  findAll: findAllProducts,
  create: createProduct,
  revalidate: revalidateProducts,
}
