import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui'

import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from '@/actions'
import { ProductRow, ProductSearchParams } from '@/components/products'
import {
  TableFacetedFilter,
  TableFilter,
  TablePagination,
  TableProvider,
  TableToggleFilter,
} from '@/components/shared/table'

export async function ProductsTable({ params }: { params: ProductSearchParams }) {
  const { data, total } = await PRODUCT_ACTIONS.findAll(params)
  const categories = await CATEGORY_ACTIONS.findAll()

  return (
    <TableProvider revalidate={PRODUCT_ACTIONS.revalidate}>
      <TableFilter placeholder="Buscar producto por nombre o descripción">
        <TableFacetedFilter categories={categories} />
        <TableToggleFilter />
      </TableFilter>

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
          {data.map(product => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>

      <TablePagination total={total} />
    </TableProvider>
  )
}
