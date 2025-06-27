'use client'

import { Button } from '@/components/ui'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/' })
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      <LogOut />
      Cerrar sesión
    </Button>
  )
}
