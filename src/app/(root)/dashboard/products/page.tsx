import Link from 'next/link'
import { Suspense } from 'react'

import { PackagePlus, RotateCcw } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'

import { PRODUCT_ACTIONS, CATEGORY_ACTIONS } from '@/actions'
import { productSearchParams, ProductsTable, ProductsTableLoading } from '@/components/products'
import { TableFacetedFilter, TableFilter } from '@/components/shared/table'
import { Button, Card, CardContent } from '@/components/ui'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await productSearchParams(searchParams)
  const categories = await CATEGORY_ACTIONS.findAll()

  return (
    <div className="flex flex-col gap-5">
      <Card className="container mx-auto bg-transparent">
        <CardContent className="flex flex-col gap-6">
          <div className="flex justify-between gap-6">
            <div className="flex items-center gap-3 w-full">
              <TableFilter
                placeholder="Buscar producto por nombre o descripción"
                refetch={PRODUCT_ACTIONS.revalidate}
              />
              <TableFacetedFilter categories={categories} refetch={PRODUCT_ACTIONS.revalidate} />
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard/products">
                <Button variant="ghost">
                  <RotateCcw />
                </Button>
              </Link>
              <Link href="/dashboard/products/create">
                <Button>
                  <PackagePlus />
                  Crear producto
                </Button>
              </Link>
            </div>
          </div>
          <Suspense fallback={<ProductsTableLoading />}>
            <ProductsTable params={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
