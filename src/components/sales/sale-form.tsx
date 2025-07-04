'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ORDER_ACTIONS } from '@/actions'
import { CustomerSalesForm, ProductsSaleform } from '@/components/sales'
import { Button, buttonVariants, Form } from '@/components/ui'
import { SaleFormValues, SaleSchema } from '@/schemas'

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
          <CustomerSalesForm form={form} />
          <ProductsSaleform form={form} />
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
