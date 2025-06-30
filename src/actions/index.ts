import {
  createProduct,
  deleteProdcut,
  findAllProducts,
  findOneProduct,
  revalidateProducts,
  updateProduct,
} from './products'

export const PRODUCT_ACTIONS = {
  create: createProduct,
  delete: deleteProdcut,
  findAll: findAllProducts,
  findOneById: findOneProduct,
  revalidate: revalidateProducts,
  update: updateProduct,
}
