'use client'

import { useQueryState } from 'nuqs'

import { Input } from '@/components/ui'

interface TableFilterProps {
  refetch: () => void
  placeholder?: string
}

export function TableFilter({ placeholder, refetch }: TableFilterProps) {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })

  const handleSearch = (value: string) => {
    setSearch(value)

    setTimeout(refetch, 300)
  }

  return (
    <Input
      name="search"
      placeholder={placeholder || 'Buscar...'}
      value={search}
      onChange={e => handleSearch(e.target.value)}
      className="max-w-sm"
    />
  )
}
