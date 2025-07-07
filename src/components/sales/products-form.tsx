'use client'

import { useEffect, useMemo, useState } from 'react'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, CalendarIcon, Minus, Plus, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Badge,
  Button,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

import { PRODUCT_ACTIONS } from '@/actions'
import { Product } from '@/interfaces'
import { SaleSchema } from '@/schemas'

interface SelectedProduct {
  id: string
  name: string
  price: number
  stock: number
  quantity: number
  subtotal: number
}

export function ProductsSaleform({ form }: { form: UseFormReturn<z.infer<typeof SaleSchema>> }) {
  const [open, setOpen] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)

  const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  const { errors, isSubmitted } = form.formState
  const productsTotal = selectedProducts.reduce((sum, p) => sum + p.subtotal, 0)

  const productDetailsMap = useMemo(() => {
    const map = new Map<string, Product>()
    searchedProducts.forEach(p => {
      if (!map.has(p.id)) {
        map.set(p.id, p)
      }
    })
    return map
  }, [searchedProducts])

  const addProduct = (product: Product) => {
    if (product.stock <= 0) {
      toast.error('Este producto no tiene stock disponible')
      return
    }

    const foundProduct = selectedProducts.find(p => p.id === product.id)

    if (foundProduct) {
      updateQuantity(product.id, foundProduct.quantity + 1)
    } else {
      setSelectedProducts(prev => [
        ...prev,
        {
          quantity: 1,
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock - 1,
          subtotal: product.price,
        },
      ])
    }

    setOpen(false)
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    const productDetail = productDetailsMap.get(id)
    if (!productDetail) return

    if (newQuantity <= 0) {
      removeProduct(id)
      return
    }

    if (newQuantity > productDetail.stock) {
      toast.error(`Ha alcanzado el límite de unidades`, {
        description: `Stock disponible ${productDetail.stock}`,
      })
      return
    }

    setSelectedProducts(prev => {
      return prev.map(p => {
        if (p.id === id) {
          const isIncreasing = newQuantity > p.quantity

          return {
            ...p,
            quantity: isIncreasing ? p.quantity + 1 : p.quantity - 1,
            stock: isIncreasing ? p.stock - 1 : p.stock + 1,
            subtotal: (isIncreasing ? p.quantity + 1 : p.quantity - 1) * p.price,
          }
        }

        return p
      })
    })
  }

  const removeProduct = (id: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id))
  }

  const fetchProducts = async () => {
    try {
      const { data } = await PRODUCT_ACTIONS.findProductsBySearch()
      setSearchedProducts(data)
    } catch (err) {
      toast.error('Error al cargar productos')
    }
  }

  useEffect(() => {
    form.setValue('products', selectedProducts, { shouldValidate: true })
  }, [selectedProducts])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Datos de la Venta
        </CardTitle>
        <CardDescription>Configura los detalles de la venta</CardDescription>
        <CardAction>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-[248px] pl-3 text-left font-normal">
                        {field.value && format(field.value, "eeee, d 'de' MMMM 'de' yyyy", { locale: es })}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown"
                      defaultMonth={field.value}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      locale={es}
                      mode="single"
                      selected={field.value}
                      onSelect={date => {
                        if (date) {
                          setOpenCalendar(false)
                          field.onChange(date)
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Productos</Label>
          <Button type="button" variant="ghost" onClick={() => setOpen(true)}>
            <Plus />
            Agregar Producto
          </Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Buscar productos..." />
            <CommandList>
              <CommandEmpty>No se encontraron productos</CommandEmpty>
              <CommandGroup>
                {searchedProducts.map(product => (
                  <CommandItem
                    key={product.id}
                    disabled={product.stock <= 0 || product.active === false}
                    onSelect={() => addProduct(product)}>
                    <div className="flex flex-row items-center gap-2 w-full justify-between">
                      <div className="flex flex-col">
                        <span>{product.name}</span>
                        <span className="text-sm text-muted-foreground">
                          S/ {product.price.toFixed(2)} - Stock: {product.stock}
                        </span>
                      </div>
                      {!product.active && (
                        <Badge variant="outline" className="block text-muted-foreground px-1.5">
                          inactivo
                        </Badge>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>

        {isSubmitted && errors.products && (
          <p className="text-sm font-medium text-destructive">{errors.products.message}</p>
        )}

        {selectedProducts.length > 0 && (
          <>
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio Unit.</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="w-[128px] text-center">Cantidad</TableHead>
                    <TableHead className="text-center">Subtotal</TableHead>
                    <TableHead className="w-[48px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProducts.map(({ id, name, price, stock, quantity, subtotal }) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>S/ {price.toFixed(2)}</TableCell>
                      <TableCell>{stock}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => updateQuantity(id, quantity - 1)}>
                            <Minus />
                          </Button>
                          <span className="w-8 text-center">{quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="size-8"
                            onClick={() => updateQuantity(id, quantity + 1)}>
                            <Plus />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">S/ {subtotal.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => removeProduct(id)}>
                          <Trash2 className="text-red-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator />
            </div>

            <div className="flex justify-end">
              <div className="text-right space-y-2">
                <div className="text-xl font-bold">Total: S/ {productsTotal.toFixed(2)}</div>
                <Badge variant="secondary">
                  {selectedProducts.length} producto{selectedProducts.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
