import { Suspense } from 'react'

import type { SearchParams } from 'nuqs/server'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { UsersTable, UsersTableLoading } from '@/components/users'
import { loadSearchParams } from '@/constants'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams)

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Administra los usuarios de tu aplicación, crea nuevos usuarios, edita o elimina los existentes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Suspense fallback={<UsersTableLoading />}>
          <UsersTable params={params} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
