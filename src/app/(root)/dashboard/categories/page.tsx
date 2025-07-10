import { Suspense } from 'react'

import { SearchParams } from 'nuqs'

import { CategoriesTable, CategoriesTableLoading } from '@/components/categories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { loadSearchParams } from '@/constants'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams)

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Categorías</CardTitle>
        <CardDescription>Aquí puedes administrar las categorías de tu tienda</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Suspense fallback={<CategoriesTableLoading />}>
          <CategoriesTable params={params} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
