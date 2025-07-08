import Link from 'next/link'

import { Boxes, Calendar, DollarSign, Files, Plus } from 'lucide-react'

import { ORDER_ACTIONS } from '@/actions'
import { SaleRow } from '@/components/sales'
import { TableInputFilter, TablePagination, TableProvider } from '@/components/shared/table'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { SearchParams } from '@/constants'

export async function SalesTable({ params }: { params: SearchParams }) {
  const { data, total } = await ORDER_ACTIONS.findAll(params)

  return (
    <TableProvider revalidate={ORDER_ACTIONS.revalidate}>
      <div className="flex justify-between gap-6">
        <TableInputFilter activeFilter={false} placeholder="Buscar usuario por DNI, nombre o correo"></TableInputFilter>
        <Link href="/dashboard/sales/create">
          <Button>
            <Plus />
            Nueva venta
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center">PDF</TableHead>
            <TableHead className="text-center">Fecha</TableHead>
            <TableHead colSpan={3} className="text-center border-dashed border-r border-l">
              Cliente
            </TableHead>
            <TableHead colSpan={3} className="text-center border-dashed border-r">
              Empleado
            </TableHead>
            <TableHead className="text-center">Unidades</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead></TableHead>
          </TableRow>

          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[64px]">
              <div className="flex justify-center">
                <Files className="size-4" />
              </div>
            </TableHead>
            <TableHead className="w-[100px] border-dashed border-r">
              <div className="flex justify-center">
                <Calendar className="size-4" />
              </div>
            </TableHead>

            <TableHead className="text-center">DNI</TableHead>
            <TableHead className="text-center">Nombres</TableHead>
            <TableHead className="text-center border-dashed border-r">Apellidos</TableHead>

            <TableHead className="text-center">DNI</TableHead>
            <TableHead className="text-center">Nombres</TableHead>
            <TableHead className="text-center border-dashed border-r">Apellidos</TableHead>

            <TableHead className="w-[100px] text-center">
              <div className="flex justify-center">
                <Boxes className="size-4" />
              </div>
            </TableHead>
            <TableHead className="w-[100px] text-center">
              <div className="flex justify-center">
                <DollarSign className="size-4" />
              </div>
            </TableHead>
            <TableHead className="w-16 text-center"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map(order => <SaleRow key={order.id} order={order} />)
          ) : (
            <TableRow className="text-center text-muted-foreground hover:bg-transparent">
              <TableCell className="py-12" colSpan={11}>
                No se encontraron ventas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination total={total} />
    </TableProvider>
  )
}
