'use client'

import { useQueryState } from 'nuqs'

import { Input } from '@/components/ui'
import { useTable } from './table-provider'

interface TableFilterProps {
  placeholder?: string
  children?: React.ReactNode
}

export function TableFilter({ children, placeholder }: TableFilterProps) {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const { revalidate } = useTable()

  const handleSearch = (value: string) => {
    setSearch(value)

    setTimeout(revalidate, 300)
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <Input
        name="search"
        placeholder={placeholder || 'Buscar...'}
        value={search}
        onChange={e => handleSearch(e.target.value)}
        className="max-w-xs"
      />
      {children}
    </div>
  )
}
