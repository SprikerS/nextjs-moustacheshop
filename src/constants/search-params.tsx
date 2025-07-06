import { createLoader, parseAsBoolean, parseAsInteger, parseAsString } from 'nuqs/server'

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  active: parseAsBoolean,
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)

interface SearchParams {
  search: string
  limit: number
  page: number
  active: boolean | null
}

export type { SearchParams }
