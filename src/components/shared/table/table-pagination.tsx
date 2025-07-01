'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'

import { useTable } from './table-provider'

interface TablePaginationProps {
  total: number
}

export function TablePagination({ total }: TablePaginationProps) {
  const { revalidate } = useTable()

  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10))
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const totalPages = Math.ceil(total / limit)

  const handleLimitChange = (value: string) => {
    setLimit(Number(value))
    setPage(1)

    setTimeout(revalidate, 300)
  }

  const goToPage = (newPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, newPage))
    setPage(clamped)

    setTimeout(revalidate, 300)
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Total de registros <span className="font-medium">({total})</span>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select value={limit.toString()} onValueChange={value => handleLimitChange(value)}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {page} de {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="outline"
            className="size-8 hidden lg:flex"
            onClick={() => goToPage(1)}
            disabled={page <= 1}>
            <ChevronsLeft />
            <span className="sr-only">Go to first page</span>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="size-8"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}>
            <ChevronLeft />
            <span className="sr-only">Go to previous page</span>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="size-8"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}>
            <ChevronRight />
            <span className="sr-only">Go to next page</span>
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="size-8 hidden lg:flex"
            onClick={() => goToPage(totalPages)}
            disabled={page >= totalPages}>
            <ChevronsRight />
            <span className="sr-only">Go to last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
