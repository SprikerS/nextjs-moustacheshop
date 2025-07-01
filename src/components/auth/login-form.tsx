'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui'
import { toast } from 'sonner'

import { signIn } from '@/actions/auth'
import { CardWrapper } from '@/components/auth'
import { LoginFormValues, LoginSchema } from '@/constants'

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormValues) {
    const { error, user } = await signIn(data)

    if (error || !user) {
      toast.error(error)
      return
    }

    toast.success(`Inicio de sesión exitoso ${user.names}`)
    redirect('/dashboard')
  }

  return (
    <CardWrapper title="Inicia sesión en tu cuenta" description="Ingrese sus datos para continuar">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Iniciar sesión</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { LoginForm }
