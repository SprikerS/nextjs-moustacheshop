import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from '@/components/ui'

interface ProductAvailabilityProps {
  active: number
  total: number
}

export function ProductAvailability({ active, total }: ProductAvailabilityProps) {
  const activePercentage = total > 0 ? (active / total) * 100 : 0

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Disponibilidad de Productos</CardTitle>
        <CardDescription>Ratio de productos activos vs inactivos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Productos Activos</span>
            <span className="font-medium">
              {active}/{total}
            </span>
          </div>
          <Progress value={activePercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{activePercentage.toFixed(1)}% disponible</span>
            <span>{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
