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
import { createUser, deleteUser, findAllUsers, revalidateUsers, updateUser } from './users'
import { reniecScraping } from './utils'

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

export const USERS_ACTIONS = {
  create: createUser,
  delete: deleteUser,
  findAll: findAllUsers,
  revalidate: revalidateUsers,
  update: updateUser,
}

export const UTILS_ACTIONS = {
  reniecScraping: reniecScraping,
}
