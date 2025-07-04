import { Users } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
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
import { SaleSchema } from '@/schemas'

export function CustomerSalesForm({ form }: { form: UseFormReturn<z.infer<typeof SaleSchema>> }) {
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
                <Input type="number" placeholder="76263050" {...field} />
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
                <Input type="text" placeholder="Jeremy" {...field} />
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
                <Input type="text" placeholder="Estelo" {...field} />
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
                <Input type="text" placeholder="Arismendiz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
