import { Suspense } from 'react'

import type { SearchParams } from 'nuqs/server'

import { productSearchParams, ProductsTable, ProductsTableLoading } from '@/components/products'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await productSearchParams(searchParams)

  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>
            Administra los productos de tu tienda, crea nuevos productos, edita o elimina los existentes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Suspense fallback={<ProductsTableLoading />}>
            <ProductsTable params={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
