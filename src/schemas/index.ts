import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'El precio debe ser un número válido con hasta dos decimales' }),
  stock: z.string().regex(/^\d+$/, { message: 'El stock debe ser un número entero válido' }),
  active: z.boolean(),
  category: z.string().optional(),
  description: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof ProductSchema>
