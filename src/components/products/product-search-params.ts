import { createLoader, parseAsBoolean, parseAsString } from 'nuqs/server'

import { coordinatesSearchParams, SearchParams } from '@/constants'

interface ProductSearchParams extends SearchParams {
  category: string
  active: boolean | null
}

const searchFilterParams = {
  ...coordinatesSearchParams,
  category: parseAsString.withDefault(''),
  active: parseAsBoolean,
}

export const productSearchParams = createLoader(searchFilterParams)
export type { ProductSearchParams }
