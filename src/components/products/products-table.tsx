import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui'

import { PRODUCT_ACTIONS } from '@/actions'
import { TablePagination } from '@/components/shared/table'
import { SearchParams } from '@/constants'
import { ProductRow } from './product-row'

interface Props {
  params: SearchParams
}

export async function ProductsTable({ params }: Props) {
  const { data, total } = await PRODUCT_ACTIONS.findAll(params)

  return (
    <>
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

      <TablePagination refetch={PRODUCT_ACTIONS.revalidate} total={total} />
    </>
  )
}
