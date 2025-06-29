import Link from 'next/link'

import { PackagePlus } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'

import { PRODUCT_ACTIONS } from '@/actions'
import { ProductsTable } from '@/components/products'
import { TableFilter, TablePagination } from '@/components/shared/table'
import { Button, Card, CardContent } from '@/components/ui'
import { loadSearchParams } from '@/constants'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams)
  const { data, total } = await PRODUCT_ACTIONS.findAll(params)

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent className="flex flex-col gap-6">
          <TableFilter placeholder="Buscar por nombre o descripción..." refetch={PRODUCT_ACTIONS.revalidate}>
            <Link href="/dashboard/products/create">
              <Button>
                <PackagePlus />
                Crear producto
              </Button>
            </Link>
          </TableFilter>

          <ProductsTable products={data} />

          <TablePagination refetch={PRODUCT_ACTIONS.revalidate} total={total} />
        </CardContent>
      </Card>
    </div>
  )
}
