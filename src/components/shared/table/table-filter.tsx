'use client'

import { useQueryState } from 'nuqs'

import { Input } from '@/components/ui'

interface TableFilterProps {
  refetch: () => void
  placeholder?: string
  children?: React.ReactNode
}

export function TableFilter({ children, placeholder, refetch }: TableFilterProps) {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })

  const handleSearch = (value: string) => {
    setSearch(value)

    setTimeout(refetch, 300)
  }

  return (
    <>
      <div className="flex justify-between gap-6">
        <Input
          name="search"
          placeholder={placeholder || 'Buscar...'}
          value={search}
          onChange={e => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        {children}
      </div>
    </>
  )
}
