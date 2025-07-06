'use client'

import { useTransition } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui'

import { UTILS_ACTIONS } from '@/actions'
import { BaseUserFormValues } from '@/schemas'

export function CustomerForm({ form }: { form: UseFormReturn<BaseUserFormValues> }) {
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
    <>
      <FormField
        control={form.control}
        name="dni"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DNI*</FormLabel>
            <FormControl>
              <Input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={8}
                placeholder="76263050"
                disabled={isPending}
                {...field}
                onChange={e => {
                  const value = e.target.value

                  if (/^\d{0,8}$/.test(value)) {
                    field.onChange(value)

                    if (value.length === 8) {
                      fetchCustomerDetails(value)
                    }
                  }
                }}
              />
            </FormControl>
            <FormMessage className="truncate" />
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
            <FormMessage className="truncate" />
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
            <FormMessage className="truncate" />
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
            <FormMessage className="truncate" />
          </FormItem>
        )}
      />
    </>
  )
}
