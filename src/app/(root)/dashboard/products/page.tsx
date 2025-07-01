import Link from 'next/link'
import { Suspense } from 'react'

import { PackagePlus, RotateCcw } from 'lucide-react'
import type { SearchParams } from 'nuqs/server'

import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from '@/actions'
import { productSearchParams, ProductsTable, ProductsTableLoading } from '@/components/products'
import { TableFacetedFilter, TableFilter, TableToggleFilter } from '@/components/shared/table'
import { Button, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await productSearchParams(searchParams)
  const categories = await CATEGORY_ACTIONS.findAll()

  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>
            Administra los productos de tu tienda, crea nuevos productos, edita o elimina los existentes
          </CardDescription>
          <CardAction>
            <Link href="/dashboard/products/create">
              <Button>
                <PackagePlus />
                Crear producto
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex justify-between gap-6">
            <div className="flex items-center gap-3 w-full">
              <TableFilter
                placeholder="Buscar producto por nombre o descripción"
                refetch={PRODUCT_ACTIONS.revalidate}
              />
              <TableFacetedFilter categories={categories} refetch={PRODUCT_ACTIONS.revalidate} />
              <TableToggleFilter refetch={PRODUCT_ACTIONS.revalidate} />
            </div>
            <Link href="/dashboard/products">
              <Button variant="ghost" size="sm" className="h-8">
                <RotateCcw />
              </Button>
            </Link>
          </div>
          <Suspense fallback={<ProductsTableLoading />}>
            <ProductsTable params={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
