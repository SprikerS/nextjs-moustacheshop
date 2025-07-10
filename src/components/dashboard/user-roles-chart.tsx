'use client'

import { useTheme } from 'next-themes'

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui'

const chartConfig = {
  clientes: { label: 'Clientes', color: '#3b82f6' },
  empleados: { label: 'Empleados', color: '#10b981' },
  admins: { label: 'Administradores', color: '#f59e0b' },
} satisfies ChartConfig

interface UserRole {
  name: string
  value: number
  fill: string
}

interface UserRolesChartProps {
  data: UserRole[]
}

export function UserRolesChart({ data }: UserRolesChartProps) {
  const { theme } = useTheme()
  const strokeColor = theme === 'dark' ? '#020817' : '#ffffff'

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Distribución de Roles</CardTitle>
        <CardDescription>Breakdown de usuarios por tipo de rol</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} stroke={strokeColor}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex justify-center flex-wrap gap-6 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-sm">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
