'use client'

import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui'
import { signOut } from '@/actions/auth'

export function SignOutButton() {
  return (
    <Button onClick={signOut} variant="destructive">
      <LogOut />
      Cerrar sesión
    </Button>
  )
}
