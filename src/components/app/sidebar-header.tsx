import { LayoutDashboard } from 'lucide-react'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui'

export function HeaderSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="hover:bg-transparent">
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <LayoutDashboard className="size-4" />
          </div>
          <span className="truncate font-medium">Cheap Store</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
