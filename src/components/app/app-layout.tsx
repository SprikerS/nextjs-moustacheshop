import Link from 'next/link'

import { buttonVariants, Icons, Separator, ThemeToggle } from '@/components/ui'

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
