import { z } from 'zod'

const baseEmailSchema = z
  .string()
  .min(1, { message: 'Email cannot be empty' })
  .toLowerCase()
  .email({ message: 'Invalid email address' })
  .max(62, { message: 'Email is too long' })
  .trim()

const basePasswordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long.' })
  .max(50, { message: 'Password must be at most 50 characters long.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[\d\W]/, {
    message: 'Password must contain at least one number or special character.',
  })
  .trim()

export const LoginSchema = z.object({
  email: baseEmailSchema,
  password: basePasswordSchema,
})

export type LoginFormValues = z.infer<typeof LoginSchema>
