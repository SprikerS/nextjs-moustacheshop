import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findOneProduct,
  revalidateProducts,
  updateProduct,
} from './products'

export const PRODUCT_ACTIONS = {
  create: createProduct,
  delete: deleteProduct,
  findAll: findAllProducts,
  findOneById: findOneProduct,
  revalidate: revalidateProducts,
  update: updateProduct,
}
