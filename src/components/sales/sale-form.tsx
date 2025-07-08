'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon, Users } from 'lucide-react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { ORDER_ACTIONS } from '@/actions'
import { SaleProductsForm } from '@/components/sales'
import { CustomerForm } from '@/components/shared/forms'
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
} from '@/components/ui'
import { Order } from '@/interfaces'
import { BaseUserFormValues, SaleFormValues, SaleSchema } from '@/schemas'

interface SaleFormProps {
  order?: Order
}

export function SaleForm({ order }: SaleFormProps) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const initialProducts =
    order?.details.map(detail => ({
      id: detail.product.id,
      name: detail.product.name,
      price: detail.salePrice,
      stock: detail.product.stock,
      quantity: detail.quantity,
      subtotal: detail.total,
    })) || []

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      date: order ? new Date(order.date) : new Date(),
      dni: order?.customer.dni || '',
      names: order?.customer.names || '',
      paternal: order?.customer.paternalSurname || '',
      maternal: order?.customer.maternalSurname || '',
      products: initialProducts,
    },
  })

  function onSubmit(data: SaleFormValues) {
    startTransition(async () => {
      const isEdit = !!order
      const res = isEdit ? await ORDER_ACTIONS.update(order.id, data) : await ORDER_ACTIONS.create(data)

      if (res.error) {
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} la venta`, {
          description: res.error,
        })
        return
      }

      toast[isEdit ? 'info' : 'success'](`Venta ${isEdit ? 'actualizada' : 'creada'} exitosamente`)
      router.push('/dashboard/sales')
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Datos del Cliente
              </CardTitle>
              <CardDescription>Ingresa la información del cliente para esta venta</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <CustomerForm form={form as unknown as UseFormReturn<BaseUserFormValues>} />
            </CardContent>
          </Card>

          <SaleProductsForm form={form} />
          <div className="flex gap-4 justify-end">
            <Link href="/dashboard/sales" className={buttonVariants({ variant: 'outline' })}>
              Cancelar
            </Link>
            <Button type="submit" className="sm:w-[120px]" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Cargando...
                </>
              ) : order ? (
                'Actualizar'
              ) : (
                'Registrar'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
