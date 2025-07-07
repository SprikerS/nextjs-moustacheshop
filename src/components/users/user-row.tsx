'use client'

import {
  Badge,
  Button,
  Icons,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui'
import { Loader, ShieldCheck, ShieldX, UserRoundPen, UserRoundX } from 'lucide-react'

import { USERS_ACTIONS } from '@/actions'
import { DeleteConfirmDialog } from '@/components/shared'
import { UserDialog } from '@/components/users'
import { User } from '@/interfaces'
import { getRoleLabel } from '@/utils/roles'

interface UserRow {
  user: User
}

export function UserRow({ user }: UserRow) {
  const { dni, names, paternalSurname: paternal, maternalSurname: maternal, email, phoneNumber, roles, active } = user

  return (
    <>
      <TableRow>
        <TableCell className="text-center">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                {user.verified ? (
                  <ShieldCheck className="size-4" />
                ) : (
                  <ShieldX className="size-4 text-muted-foreground" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.verified ? 'cuenta verificada' : 'verificación pendiente'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-center">{dni}</TableCell>
        <TableCell className="text-center">{names}</TableCell>
        <TableCell className="text-center">{paternal}</TableCell>
        <TableCell className="text-center">{maternal}</TableCell>
        <TableCell className="text-center">{email}</TableCell>
        <TableCell className="text-center">{phoneNumber}</TableCell>
        <TableCell className="text-center">
          {roles.length > 0 && (
            <div className="text-xs text-muted-foreground font-bold px-1.5">
              {getRoleLabel(roles[roles.length - 1])}
            </div>
          )}
        </TableCell>
        <TableCell className="text-center">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {active ? <Icons.circleCheck className="fill-green-500 dark:fill-green-400" /> : <Loader />}
            {active ? 'Activo' : 'Inactivo'}
          </Badge>
        </TableCell>
        <TableCell>
          <UserDialog user={user}>
            <Button size="icon" variant="ghost" className="size-8">
              <UserRoundPen />
            </Button>
          </UserDialog>
          <DeleteConfirmDialog id={user.id} label="usuario" action={USERS_ACTIONS.delete}>
            <Button size="icon" variant="ghost" className="size-8">
              <UserRoundX />
            </Button>
          </DeleteConfirmDialog>
        </TableCell>
      </TableRow>
    </>
  )
}
