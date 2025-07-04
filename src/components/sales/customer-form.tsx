'use client'

import { useTransition } from 'react'

import { Users } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'

import { UTILS_ACTIONS } from '@/actions'
import { SaleSchema } from '@/schemas'

export function CustomerSalesForm({ form }: { form: UseFormReturn<z.infer<typeof SaleSchema>> }) {
  const [isPending, startTransition] = useTransition()

  function decodeHtmlEntities(text: string): string {
    const parser = new DOMParser()
    const decoded = parser.parseFromString(text, 'text/html').body.textContent
    return decoded || text
  }

  function fetchCustomerDetails(dni: string) {
    startTransition(async () => {
      const { error, data } = await UTILS_ACTIONS.reniecScraping(dni)
      if (error || !data) {
        toast.error(error)
        return
      }

      const { names, paternalSurname, maternalSurname } = data

      form.setValue('names', decodeHtmlEntities(names), { shouldValidate: true })
      form.setValue('paternal', decodeHtmlEntities(paternalSurname), { shouldValidate: true })
      form.setValue('maternal', decodeHtmlEntities(maternalSurname), { shouldValidate: true })

      toast.info('Datos obtenidos exitosamente')
    })
  }

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Datos del Cliente
        </CardTitle>
        <CardDescription>Ingresa la información del cliente para esta venta</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="76263050"
                  disabled={isPending}
                  {...field}
                  onChange={e => {
                    const value = e.target.value
                    field.onChange(value)

                    if (/^\d{8}$/.test(value)) {
                      fetchCustomerDetails(value)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="names"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Jeremy" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paternal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Paterno*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Estelo" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maternal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido Materno*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Arismendiz" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
