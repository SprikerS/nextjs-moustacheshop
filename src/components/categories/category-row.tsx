'use client'

import { Button, TableCell, TableRow } from '@/components/ui'
import { SquarePen, Trash } from 'lucide-react'

import { CATEGORY_ACTIONS } from '@/actions'
import { CategoryDialog } from '@/components/categories'
import { DeleteConfirmDialog } from '@/components/shared'
import { Category } from '@/interfaces'

interface CategoryRow {
  category: Category
}

export function CategoryRow({ category }: CategoryRow) {
  const { id, name, description } = category

  return (
    <>
      <TableRow>
        <TableCell className="text-center">{name}</TableCell>
        <TableCell className="text-center">{description}</TableCell>
        <TableCell>
          <CategoryDialog category={category}>
            <Button size="icon" variant="ghost" className="size-8">
              <SquarePen />
            </Button>
          </CategoryDialog>
          <DeleteConfirmDialog id={id} label="categoría" action={CATEGORY_ACTIONS.delete}>
            <Button size="icon" variant="ghost" className="size-8">
              <Trash />
            </Button>
          </DeleteConfirmDialog>
        </TableCell>
      </TableRow>
    </>
  )
}
