import { createProduct, deleteProdcut, findAllProducts, revalidateProducts } from './products'

export const PRODUCT_ACTIONS = {
  findAll: findAllProducts,
  create: createProduct,
  revalidate: revalidateProducts,
  delete: deleteProdcut,
}
