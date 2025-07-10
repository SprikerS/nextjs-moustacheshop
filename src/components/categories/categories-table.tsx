import { Plus } from 'lucide-react'

import { CATEGORY_ACTIONS } from '@/actions'
import { CategoryDialog, CategoryRow } from '@/components/categories'
import { TableInputFilter, TablePagination, TableProvider } from '@/components/shared/table'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { SearchParams } from '@/constants'

export async function CategoriesTable({ params }: { params: SearchParams }) {
  const { data, total } = await CATEGORY_ACTIONS.findAll(params)

  return (
    <TableProvider revalidate={CATEGORY_ACTIONS.revalidate}>
      <div className="flex justify-between gap-6">
        <TableInputFilter activeFilter={false} placeholder="Buscar categoría por nombre" />
        <CategoryDialog>
          <Button>
            <Plus />
            Crear categoría
          </Button>
        </CategoryDialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Descripción</TableHead>
            <TableHead className="w-16 text-center"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map(category => <CategoryRow key={category.id} category={category} />)
          ) : (
            <TableRow className="text-center text-muted-foreground hover:bg-transparent">
              <TableCell className="py-12" colSpan={2}>
                No se encontraron categorías
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination total={total} />
    </TableProvider>
  )
}
