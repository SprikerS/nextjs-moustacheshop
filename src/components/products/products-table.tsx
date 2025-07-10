import { PackagePlus } from 'lucide-react'

import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from '@/actions'
import { ProductDialog, ProductRow, ProductSearchParams } from '@/components/products'
import { TableFacetedFilter, TableInputFilter, TablePagination, TableProvider } from '@/components/shared/table'

export async function ProductsTable({ params }: { params: ProductSearchParams }) {
  const { data, total } = await PRODUCT_ACTIONS.findAll(params)
  const { data: categories } = await CATEGORY_ACTIONS.findAll()

  return (
    <TableProvider revalidate={PRODUCT_ACTIONS.revalidate}>
      <div className="flex justify-between gap-6">
        <TableInputFilter placeholder="Buscar producto por nombre o descripción">
          <TableFacetedFilter categories={categories} />
        </TableInputFilter>
        <ProductDialog categories={categories}>
          <Button>
            <PackagePlus />
            Crear producto
          </Button>
        </ProductDialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="w-[100px] text-center">Estado</TableHead>
            <TableHead className="w-16 text-center"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map(product => <ProductRow key={product.id} product={product} categories={categories} />)
          ) : (
            <TableRow className="text-center text-muted-foreground hover:bg-transparent">
              <TableCell className="py-12" colSpan={7}>
                No se encontraron productos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination total={total} />
    </TableProvider>
  )
}
