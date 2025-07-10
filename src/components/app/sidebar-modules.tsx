'use client'

import Link from 'next/link'

import type { LucideIcon } from 'lucide-react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui'

interface NavModulesProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  name?: string
  data: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}

export function SidebarMain({ name, data, ...props }: NavModulesProps) {
  return (
    <SidebarGroup {...props}>
      {name && <SidebarGroupLabel>{name}</SidebarGroupLabel>}
      <SidebarMenu>
        {data.map(d => (
          <SidebarMenuItem key={d.name}>
            <SidebarMenuButton tooltip={d.name} asChild>
              <Link href={d.url}>
                <d.icon />
                <span>{d.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
