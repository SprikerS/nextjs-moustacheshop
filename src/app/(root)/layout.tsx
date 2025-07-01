import { AppSidebar, AppHeader } from '@/components/shared'
import { currentSessionUser } from '@/lib/auth'
import { SidebarInset, SidebarProvider } from '@/components/ui'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await currentSessionUser()
  if (!user) return null

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <AppHeader />
          <div className="container h-full mx-auto px-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
