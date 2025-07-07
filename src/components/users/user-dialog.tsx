'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@/components/ui'

import { USERS_ACTIONS } from '@/actions'
import { CustomerForm } from '@/components/shared/forms'
import { Role, ROLES_DATA } from '@/constants'
import { User } from '@/interfaces'
import { BaseUserFormValues, UserFormValues, UserSchema } from '@/schemas'

interface UserDialogProps {
  children: React.ReactNode
  user?: User
}

export function UserDialog({ children, user }: UserDialogProps) {
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      dni: '',
      names: '',
      paternal: '',
      maternal: '',
      email: '',
      phone: '',
      role: 'employee',
      active: true,
    },
  })

  function onSubmit(data: UserFormValues) {
    startTransition(async () => {
      const isEdit = !!user
      const res = isEdit ? await USERS_ACTIONS.update(user.id, data) : await USERS_ACTIONS.create(data)

      if (res.error) {
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} el usuario`, {
          description: res.error,
        })
        return
      }

      toast[isEdit ? 'info' : 'success'](`Usuario ${isEdit ? 'actualizado' : 'creado'} exitosamente`)

      setOpenDialog(false)
      router.refresh()
    })
  }

  useEffect(() => {
    if (user) {
      const lastRole = user.roles[user.roles.length - 1] as Role

      form.reset({
        dni: user.dni,
        names: user.names,
        paternal: user.paternalSurname,
        maternal: user.maternalSurname,
        email: user.email || '',
        phone: user.phoneNumber != null ? String(user.phoneNumber) : '',
        role: lastRole,
        active: user.active,
      })
    }
  }, [user, form])

  useEffect(() => {
    if (!openDialog) {
      setTimeout(() => {
        form.reset()
      }, 100)
    }
  }, [openDialog, form])

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[650px] gap-6"
        onInteractOutside={event => event.preventDefault()}
        onOpenAutoFocus={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{user ? 'Editar usuario' : 'Crear nuevo usuario'}</DialogTitle>
          <DialogDescription>
            {user
              ? 'Actualiza la información del usuario y guarda los cambios'
              : 'Completa el formulario para crear un nuevo usuario'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <CustomerForm form={form as unknown as UseFormReturn<BaseUserFormValues>} />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="truncate" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="987654321"
                        maxLength={9}
                        {...field}
                        onChange={e => {
                          const value = e.target.value

                          if (/^\d{0,9}$/.test(value)) {
                            field.onChange(value)
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} name={field.name}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES_DATA.map(role => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {user && (
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="mt-6 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Estado</FormLabel>
                      <FormDescription>Controla si el usuario puede acceder o no al sistema</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="sm:w-[120px]" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Cargando...
                  </>
                ) : user ? (
                  'Actualizar'
                ) : (
                  'Registrar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
