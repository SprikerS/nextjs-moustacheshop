'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@/components/ui'

import { PRODUCT_ACTIONS } from '@/actions'
import { Category, Product } from '@/interfaces'
import { cn } from '@/lib/utils'
import { ProductFormValues, ProductSchema } from '@/schemas'

interface NewProductFormProps {
  categories: Category[]
  children: React.ReactNode
  product?: Product
}

export function ProductDialog({ categories, product, children }: NewProductFormProps) {
  const router = useRouter()

  const [openCategory, setOpenCategory] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name ?? '',
      price: String(product?.price ?? ''),
      stock: String(product?.stock ?? ''),
      active: product?.active ?? true,
      category: product?.category?.id ?? '',
      description: product?.description ?? '',
    },
  })

  function onSubmit(data: ProductFormValues) {
    startTransition(async () => {
      const isEdit = !!product
      const res = isEdit ? await PRODUCT_ACTIONS.update(product.id, data) : await PRODUCT_ACTIONS.create(data)

      if (res.error) {
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} el producto`, {
          description: res.error,
        })
        return
      }

      toast[isEdit ? 'info' : 'success'](`Producto ${isEdit ? 'actualizado' : 'creado'} exitosamente`)

      setOpenDialog(false)
      router.refresh()
    })
  }

  useEffect(() => {
    if (!openDialog) {
      setTimeout(() => {
        form.reset()
      }, 100)
    }
  }, [openDialog])

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px] gap-6"
        onInteractOutside={event => event.preventDefault()}
        onOpenAutoFocus={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Detalles del producto</DialogTitle>
          <DialogDescription>Completa los detalles del producto para agregarlo a tu tienda</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Fresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3.27" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock*</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="27" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Categoría</FormLabel>
                      <Popover open={openCategory} onOpenChange={setOpenCategory}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCategory}
                              className={cn('w-[122px] justify-between', !field.value && 'text-muted-foreground')}>
                              {field.value
                                ? categories.find(category => category.id === field.value)?.name
                                : 'Seleccionar'}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[122px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No se encontró ninguna categoría</CommandEmpty>
                              <CommandGroup>
                                {categories.map(category => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                      form.setValue('category', category.id === field.value ? '' : category.id)
                                      setOpenCategory(false)
                                    }}>
                                    {category.name}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        category.id === field.value ? 'opacity-100' : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Fresa fresca y dulce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {product && (
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Estado</FormLabel>
                        <FormDescription>Controla si el producto sera visible en la tienda</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="w-[120px]" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Cargando...
                  </>
                ) : product ? (
                  'Actualizar'
                ) : (
                  'Registrar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
