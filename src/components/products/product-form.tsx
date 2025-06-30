'use client'

import { Check, ChevronsUpDown, Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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

import { Category, Product } from '@/interfaces'
import { PRODUCT_ACTIONS } from '@/actions'
import { ProductFormValues, ProductSchema } from '@/schemas'

interface NewProductFormProps {
  categories: Category[]
  product?: Product
}

export function ProductForm({ categories, product }: NewProductFormProps) {
  const [open, setOpen] = useState(false)
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

  async function onSubmit(data: ProductFormValues) {
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
      redirect('/dashboard/products')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Detalles del producto</CardTitle>
            <CardDescription>Completa los detalles del producto para agregarlo a tu tienda</CardDescription>
          </CardHeader>
          <CardContent>
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
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}>
                              {field.value
                                ? categories.find(category => category.id === field.value)?.name
                                : 'Seleccionar categoría'}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar categoría..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No se encontró ninguna categoría</CommandEmpty>
                              <CommandGroup>
                                {categories.map(category => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                      form.setValue('category', category.id === field.value ? '' : category.id)
                                      setOpen(false)
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Cargando...
                </>
              ) : product ? (
                'Actualizar producto'
              ) : (
                'Crear producto'
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
