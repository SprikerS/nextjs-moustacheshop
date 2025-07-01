import Link from 'next/link'

import { buttonVariants } from '@/components/ui'
import { LayoutDashboard, LogIn } from 'lucide-react'

import { Footer, Header, SignOutButton } from '@/components/shared'
import { getUserAuthentication } from '@/lib/session'

export default async function AppPage() {
  const user = await getUserAuthentication()
  if (!user) return null

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center justify-center gap-y-10">
        <div className="flex gap-x-5">
          {user ? (
            <>
              <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
                <LayoutDashboard />
                Panel de control
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: 'secondary' })}>
              <LogIn />
              Iniciar sesión
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
