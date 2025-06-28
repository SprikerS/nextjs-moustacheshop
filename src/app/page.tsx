import Link from 'next/link'

import { LayoutDashboard, LogIn } from 'lucide-react'
import { buttonVariants, Icons, Separator, ThemeToggle } from '@/components/ui'

import { SignOutButton } from '@/components/shared'
import { currentSessionUser } from '@/lib/auth'

function IconButton({ href, name }: { href: string; name: keyof typeof Icons }) {
  const SelectedIcon = Icons[name]

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
      <SelectedIcon />
    </Link>
  )
}

export function Header() {
  return (
    <header>
      <div className="container mx-auto p-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="font-semibold">🛠 Cheap Store</span>
          </Link>
          <div className="flex space-x-1 h-5 items-center text-muted-foreground">
            <IconButton href="https://github.com/SprikerS" name="github" />
            <Separator orientation="vertical" />
            <ThemeToggle />
            <Separator orientation="vertical" />
            <IconButton href="https://instagram.com/jere17ar" name="instagram" />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  )
}

export function Footer() {
  return (
    <footer>
      <Separator />
      <div className="container mx-auto text-center p-5">
        <span className="text-xs text-gray-400">code by sprikers &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default async function Home() {
  const user = await currentSessionUser()

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
