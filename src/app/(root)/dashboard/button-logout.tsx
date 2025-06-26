'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui'

export function ButtonLogout() {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/' })
  }

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  )
}
