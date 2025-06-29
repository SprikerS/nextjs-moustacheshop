import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

import { PRODUCT_ACTIONS } from '@/actions'
import { TablePagination } from '@/components/shared/table'
import { SearchParams } from '@/constants'

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
            <TableHead>Estado</TableHead>
            <TableHead>Categoría</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(product => {
            const category = product.category ? product.category.name : null

            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.active ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>{category}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <TablePagination refetch={PRODUCT_ACTIONS.revalidate} total={total} />
    </>
  )
}
