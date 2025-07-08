import { Boxes, Calendar, DollarSign, Files } from 'lucide-react'

import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

export function SalesTableLoading() {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-9 w-[320px]" />
        </div>
        <div>
          <Skeleton className="h-9 w-[128px]" />
        </div>
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[70px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
