'use client'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui'

interface NavModulesProps {
  modules: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}

export function SidebarModules({ modules }: NavModulesProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {modules.map(module => (
          <SidebarMenuItem key={module.name}>
            <SidebarMenuButton tooltip={module.name} asChild>
              <Link href={module.url}>
                <module.icon />
                <span>{module.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
