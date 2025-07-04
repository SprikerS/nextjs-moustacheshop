'use client'

import { PRODUCT_ACTIONS } from '@/actions'
import { DeleteConfirmDialog } from '@/components/shared'
import { Badge, Button, Icons, TableCell, TableRow } from '@/components/ui'
import { Category, Product } from '@/interfaces'
import { Loader, PackageX, SquarePen } from 'lucide-react'
import { ProductDialog } from './product-dialog'

interface ProductRow {
  categories: Category[]
  product: Product
}

export function ProductRow({ categories, product }: ProductRow) {
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
          <ProductDialog categories={categories} product={product}>
            <Button size="icon" variant="ghost" className="size-8">
              <SquarePen />
            </Button>
          </ProductDialog>
          <DeleteConfirmDialog id={id} label="producto" action={PRODUCT_ACTIONS.delete}>
            <Button size="icon" variant="ghost" className="size-8">
              <PackageX />
            </Button>
          </DeleteConfirmDialog>
        </TableCell>
      </TableRow>
    </>
  )
}
