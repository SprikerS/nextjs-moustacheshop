import Link from 'next/link'

import { buttonVariants, ThemeToggle } from '@/components/ui'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <ThemeToggle />
      <h1 className="text-2xl font-bold">Authentication</h1>
      <Link href="/login" className={buttonVariants({ variant: 'secondary' })}>
        Login
      </Link>
    </div>
  )
}
