import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: 'El precio debe ser un número válido con hasta dos decimales' }),
  stock: z.string().regex(/^\d+$/, { message: 'El stock debe ser un número entero válido' }),
  active: z.boolean(),
  category: z.string().optional(),
  description: z.string().optional(),
})

const SaleProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  quantity: z.number().min(1, 'La cantidad debe ser al menos 1'),
  subtotal: z.number(),
})

export const SaleSchema = z.object({
  date: z.date({
    required_error: 'La fecha es requerida',
  }),
  dni: z
    .string({
      required_error: 'Numero de DNI es requerido',
    })
    .trim()
    .regex(/^\d{8}$/, { message: 'El número de DNI debe tener 8 dígitos' }),
  names: z.string().min(1, { message: 'Los nombres son requeridos' }),
  paternal: z.string().min(1, { message: 'El apellido paterno es requerido' }),
  maternal: z.string().min(1, { message: 'El apellido materno es requerido' }),
  products: z.array(SaleProductSchema).min(1, {
    message: 'Debes agregar al menos un producto a la venta',
  }),
})

export type ProductFormValues = z.infer<typeof ProductSchema>
export type SaleFormValues = z.infer<typeof SaleSchema>
