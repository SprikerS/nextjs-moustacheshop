'use client'

import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
} from '@/components/ui'

import { toast } from 'sonner'

interface DeleteConfirmDialogProps {
  id: string
  label: string
  action: (id: string) => Promise<{ error: string }>
  children: React.ReactNode
}

export function DeleteConfirmDialog({ id, label, action, children }: DeleteConfirmDialogProps) {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await action(id)

    if (res.error) {
      toast.error(`Error al eliminar ${label.toLowerCase()}`, {
        description: res.error,
      })
    } else {
      toast.info(`Existencia eliminada con éxito`)
      router.refresh()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>Esta acción no se puede deshacer</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
