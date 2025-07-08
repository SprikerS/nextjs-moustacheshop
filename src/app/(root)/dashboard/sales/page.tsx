import { Suspense } from 'react'

import type { SearchParams } from 'nuqs/server'

import { SalesTable } from '@/components/sales'
import { SalesTableLoading } from '@/components/sales/sales-table-loading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { loadSearchParams } from '@/constants'

export default async function SalesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await loadSearchParams(searchParams)

  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Ventas</CardTitle>
          <CardDescription>
            Administra las ventas de tu tienda, revisa el historial de ventas y gestiona los pedidos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Suspense fallback={<SalesTableLoading />}>
            <SalesTable params={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
