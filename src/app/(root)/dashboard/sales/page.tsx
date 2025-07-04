import Link from 'next/link'

import { Button, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { Plus } from 'lucide-react'

export default async function SalesPage() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Ventas</CardTitle>
          <CardDescription>
            Administra las ventas de tu tienda, revisa el historial de ventas y gestiona los pedidos
          </CardDescription>
          <CardAction>
            <Link href="/dashboard/sales/create">
              <Button>
                <Plus />
                Nueva venta
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6"></CardContent>
      </Card>
    </div>
  )
}
