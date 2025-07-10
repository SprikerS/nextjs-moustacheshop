'use client'

import Link from 'next/link'

import { Box, House, LifeBuoy, Palette, Send, ShoppingCart, Tags, User } from 'lucide-react'

import { FooterSidebar, HeaderSidebar, SidebarMain } from '@/components/app'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  ThemeToggle,
} from '@/components/ui'
import { User as UserSession } from '@/interfaces'

const data = {
  system: [
    {
      name: 'Ventas',
      url: '/dashboard/sales',
      icon: ShoppingCart,
    },
    {
      name: 'Usuarios',
      url: '/dashboard/users',
      icon: User,
    },
  ],
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
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inicio" asChild>
                <Link href="/dashboard">
                  <House />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarMain name="Sistema" data={system} />
        <SidebarMain name="Módulos" data={modules} />
        <SidebarMain className="mt-auto" data={footer} />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Palette className="size-4" />
                  <span className="text-sm">Tema</span>
                </div>
                <ThemeToggle />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
