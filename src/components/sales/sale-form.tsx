'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
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
import { BaseUserFormValues, SaleFormValues, SaleSchema } from '@/schemas'

export function SaleForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      date: new Date(),
      dni: '',
      names: '',
      paternal: '',
      maternal: '',
      products: [],
    },
  })

  function onSubmit(data: SaleFormValues) {
    startTransition(async () => {
      const isEdit = false
      const res = await ORDER_ACTIONS.create(data)

      if (res.error) {
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} la venta`, {
          description: res.error,
        })
        return
      }

      toast[isEdit ? 'info' : 'success'](`Venta ${isEdit ? 'actualizada' : 'creada'} exitosamente`)
      redirect('/dashboard/sales')
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Cargando...
                </>
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
