'use client'

import { Box, LifeBuoy, Send, ShoppingCart, Tags, User } from 'lucide-react'

import { FooterSidebar, HeaderSidebar, SidebarMain } from '@/components/dashboard'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui'
import { User as UserSession } from '@/interfaces'

const data = {
  modules: [
    {
      name: 'Productos',
      url: '/dashboard/products',
      icon: Box,
    },
    {
      name: 'Categorías',
      url: '/dashboard/categories',
      icon: Tags,
    },
    {
      name: 'Usuarios',
      url: '/dashboard/users',
      icon: User,
    },
  ],
  system: [
    {
      name: 'Ventas',
      url: '/dashboard/sales',
      icon: ShoppingCart,
    },
  ],
  footer: [
    {
      name: 'Soporte',
      url: '#',
      icon: LifeBuoy,
    },
    {
      name: 'Sugerencias',
      url: '#',
      icon: Send,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: UserSession
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { system, modules, footer } = data

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain name="Sistema" data={system} />
        <SidebarMain name="Módulos" data={modules} />
        <SidebarMain className="mt-auto" data={footer} />
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
