import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

import { Product } from '@/interfaces'

interface Props {
  products: Product[]
}

export async function ProductsTable({ products }: Props) {
  return (
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
        {products.map(product => {
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
  )
}
