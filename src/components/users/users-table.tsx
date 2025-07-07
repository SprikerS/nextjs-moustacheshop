import { UserRoundPlus } from 'lucide-react'

import { USERS_ACTIONS } from '@/actions'
import { TableInputFilter, TablePagination, TableProvider } from '@/components/shared/table'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { UserDialog, UserRow } from '@/components/users'
import { SearchParams } from '@/constants'

export async function UsersTable({ params }: { params: SearchParams }) {
  const { data, total } = await USERS_ACTIONS.findAll(params)

  return (
    <TableProvider revalidate={USERS_ACTIONS.revalidate}>
      <div className="flex justify-between gap-6">
        <TableInputFilter placeholder="Buscar usuario por DNI, nombre o correo"></TableInputFilter>
        <UserDialog>
          <Button>
            <UserRoundPlus />
            Crear usuario
          </Button>
        </UserDialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[32px] text-center"></TableHead>
            <TableHead className="w-[100px] text-center">DNI</TableHead>
            <TableHead className="w-[200px] text-center">Nombres</TableHead>
            <TableHead className="w-[150px] text-center">A. Paterno</TableHead>
            <TableHead className="w-[150px] text-center">A. Materno</TableHead>
            <TableHead className="text-center">Correo</TableHead>
            <TableHead className="w-[100px] text-center">Teléfono</TableHead>
            <TableHead className="w-[125px] text-center">Roles</TableHead>
            <TableHead className="w-[100px] text-center">Estado</TableHead>
            <TableHead className="w-16 text-center"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map(user => <UserRow key={user.id} user={user} />)
          ) : (
            <TableRow className="text-center text-muted-foreground hover:bg-transparent">
              <TableCell className="py-12" colSpan={7}>
                No se encontraron usuarios
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination total={total} />
    </TableProvider>
  )
}
