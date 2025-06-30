'use client'

import { useQueryState } from 'nuqs'
import { useState } from 'react'

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from '@/components/ui'
import { PlusCircle } from 'lucide-react'

import { Category } from '@/interfaces'

interface TableTestProps {
  categories: Category[]
  refetch: () => void
}

export function TableFacetedFilter({ categories, refetch }: TableTestProps) {
  const [category, setCategory] = useQueryState('category', { defaultValue: '' })
  const [open, setOpen] = useState(false)

  const handleCategoryToggle = (value: string) => {
    setCategory(value === category ? '' : value)
    setOpen(false)

    setTimeout(refetch, 300)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle />
          Categoría
          {category && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="hidden space-x-1 lg:flex">
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {category}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command value={category}>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Sin resultados</CommandEmpty>
            <CommandGroup className="caca flex flex-col gap-10">
              {categories.map(c => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  disabled={!c.productsCount}
                  onSelect={() => handleCategoryToggle(c.name)}>
                  <span>{c.name}</span>
                  <CommandShortcut>{c.productsCount}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
