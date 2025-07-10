import { AppHeader, AppSidebar } from '@/components/app'
import { SidebarInset, SidebarProvider } from '@/components/ui'
import { getUserAuthentication } from '@/lib/session'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserAuthentication()
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
