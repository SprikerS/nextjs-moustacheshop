import { createLoader, parseAsString } from 'nuqs/server'

import { coordinatesSearchParams, SearchParams } from '@/constants'

interface ProductSearchParams extends SearchParams {
  category: string
}

const searchFilterParams = {
  ...coordinatesSearchParams,
  category: parseAsString.withDefault(''),
}

export const productSearchParams = createLoader(searchFilterParams)
export type { ProductSearchParams }
