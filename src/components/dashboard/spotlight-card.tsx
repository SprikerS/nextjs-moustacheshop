import type { LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

interface SpotlightCardProps {
  title: string
  name: string
  subtitle: string
  icon: LucideIcon
}

export function SpotlightCard({ title, name, subtitle, icon: Icon }: SpotlightCardProps) {
  return (
    <Card className="bg-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-yellow-400" />
          <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold mb-1">{name}</div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
