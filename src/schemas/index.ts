import { z } from 'zod'

export const BaseUserSchema = z.object({
  dni: z
    .string({
      required_error: 'Numero de DNI es requerido',
    })
    .trim()
    .regex(/^\d{8}$/, { message: 'El número de DNI debe tener 8 dígitos' }),
  names: z.string().min(1, { message: 'Los nombres son requeridos' }),
  paternal: z.string().min(1, { message: 'El apellido paterno es requerido' }),
  maternal: z.string().min(1, { message: 'El apellido materno es requerido' }),
})

export const ValidRoles = z.enum(['customer', 'employee', 'admin', 'super-user'])

export const UserSchema = BaseUserSchema.extend({
  email: z.string().trim().email({ message: 'El correo electrónico debe ser válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(50, { message: 'La contraseña no debe superar los 50 caracteres' })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/, {
      message: 'La contraseña debe tener una mayúscula, una minúscula y un número o símbolo',
    }),
  phone: z
    .string()
    .trim()
    .regex(/^\d{9}$/, { message: 'El número de teléfono debe tener 9 dígitos' })
    .optional(),
  roles: z
    .array(ValidRoles, {
      invalid_type_error: 'Debe ser un arreglo de roles válidos',
    })
    .nonempty({ message: 'Debes asignar al menos un rol' }),
  active: z.boolean(),
})

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
  ...BaseUserSchema.shape,
  date: z.date({
    required_error: 'La fecha es requerida',
  }),
  products: z.array(SaleProductSchema).min(1, {
    message: 'Debes agregar al menos un producto a la venta',
  }),
})

export type ProductFormValues = z.infer<typeof ProductSchema>
export type SaleFormValues = z.infer<typeof SaleSchema>
export type UserFormValues = z.infer<typeof UserSchema>
export type BaseUserFormValues = z.infer<typeof BaseUserSchema>
