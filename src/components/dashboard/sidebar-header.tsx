import Link from 'next/link'

import { LayoutDashboard } from 'lucide-react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui'

export function HeaderSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Link href="/dashboard">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="truncate font-medium">Moustache Shop</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
