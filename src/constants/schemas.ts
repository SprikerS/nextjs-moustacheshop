import * as zod from 'zod'

const baseEmailSchema = zod
  .string()
  .min(1, { message: 'Email cannot be empty' })
  .trim()
  .toLowerCase()
  .email({ message: 'Invalid email address' })
  .max(62, { message: 'Email is too long' })

const basePasswordSchema = zod
  .string()
  .min(1, { message: 'Password cannot be empty' })
  .trim()
  .min(6, { message: 'Password must be at least 6 characters' })
  .max(62, { message: 'Password is too long' })
  .regex(/\S/, { message: 'Password cannot be only whitespaces' })
  .transform(value => value.trim())

export const LoginSchema = zod.object({
  email: baseEmailSchema,
  password: basePasswordSchema,
  twoFactorCode: zod
    .string()
    .trim()
    .regex(/^\d{6}$/, { message: 'Code must be 6 digits' })
    .optional(),
})
