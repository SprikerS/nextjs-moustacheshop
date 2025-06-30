'use client'

import { Badge, Button, Icons, TableCell, TableRow } from '@/components/ui'
import { Product } from '@/interfaces'
import { Loader, PackageX, SquarePen } from 'lucide-react'

interface ProductRow {
  product: Product
}

export function ProductRow({ product }: ProductRow) {
  const { id, name, price, stock, description, active } = product
  const category = product.category ? product.category.name : null

  return (
    <>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{stock}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{category}</TableCell>
        <TableCell className="text-center">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {active ? <Icons.circleCheck className="fill-green-500 dark:fill-green-400" /> : <Loader />}
            {active ? 'Activo' : 'Inactivo'}
          </Badge>
        </TableCell>
        <TableCell>
          <Button size="icon" variant="ghost" className="size-8" onClick={() => console.log('Edit product', id)}>
            <SquarePen />
          </Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={() => console.log('Delete product', id)}>
            <PackageX />
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}
