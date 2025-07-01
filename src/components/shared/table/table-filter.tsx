'use client'

import Link from 'next/link'
import { useQueryState } from 'nuqs'

import { Button, Input } from '@/components/ui'
import { RotateCcw } from 'lucide-react'
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
    <>
      <div className="flex justify-between gap-6">
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
        <Link href="/dashboard/products">
          <Button variant="ghost" size="sm" className="h-8">
            <RotateCcw />
          </Button>
        </Link>
      </div>
    </>
  )
}
