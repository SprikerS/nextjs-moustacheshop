'use client'

import * as React from 'react'

import { Box, Tags, User } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui'
import { FooterSidebar, HeaderSidebar, SidebarModules } from '@/components/dashboard'
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
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: UserSession
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarModules modules={data.modules} />
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
