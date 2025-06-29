import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)

interface SearchParams {
  search: string
  limit: number
  page: number
}

export type { SearchParams }
