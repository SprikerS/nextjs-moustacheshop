'use client'

import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui'
import { clearAccessToken } from '@/actions/logout'

export function SignOutButton() {
  const handleLogout = async () => {
    await clearAccessToken()
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      <LogOut />
      Cerrar sesión
    </Button>
  )
}
