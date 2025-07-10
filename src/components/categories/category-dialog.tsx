'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/ui'

import { CATEGORY_ACTIONS } from '@/actions'
import { Category } from '@/interfaces'
import { CategoryFormValues, CategorySchema } from '@/schemas'

interface UserDialogProps {
  children: React.ReactNode
  category?: Category
}

export function CategoryDialog({ children, category }: UserDialogProps) {
  const router = useRouter()

  const [openDialog, setOpenDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  function onSubmit(data: CategoryFormValues) {
    startTransition(async () => {
      const isEdit = !!category
      const res = isEdit ? await CATEGORY_ACTIONS.update(category.id, data) : await CATEGORY_ACTIONS.create(data)

      if (res.error) {
        toast.error(`Error al ${isEdit ? 'actualizar' : 'crear'} la categoría`, {
          description: res.error,
        })
        return
      }

      toast[isEdit ? 'info' : 'success'](`Categoría ${isEdit ? 'actualizada' : 'creada'} exitosamente`)

      setOpenDialog(false)
      router.refresh()
    })
  }

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description || '',
      })
    }
  }, [category, form])

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
        className="sm:max-w-[400px] gap-6"
        onInteractOutside={event => event.preventDefault()}
        onOpenAutoFocus={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{category ? 'Editar categoría' : 'Crear nueva categoría'}</DialogTitle>
          <DialogDescription>
            {category
              ? 'Modifica los datos de la categoría seleccionada'
              : 'Completa el formulario para crear una nueva categoría'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="truncate" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                ) : category ? (
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
