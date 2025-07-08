'use client'

import { useState } from 'react'

import { Download, Loader2Icon, Printer, SquarePen, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { ORDER_ACTIONS } from '@/actions'
import { DeleteConfirmDialog } from '@/components/shared'
import { Button, TableCell, TableRow } from '@/components/ui'
import { Order } from '@/interfaces'
import { CurrencyFormatter, downloadReport, printPreviewReport } from '@/utils'
import Link from 'next/link'

export function SaleRow({ order }: { order: Order }) {
  const { id, date, customer, employee, details } = order

  const [printerLoading, setPrinterLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)

  const subTotal = details.reduce((acc, detail) => acc + detail.salePrice * detail.quantity, 0).toFixed(2)
  const total = CurrencyFormatter.formatCurrency(parseFloat(subTotal) * 1.18)

  const handlePrint = async () => {
    setPrinterLoading(true)

    try {
      await printPreviewReport(id)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ocurrió un error inesperado')
    } finally {
      setPrinterLoading(false)
    }
  }

  const handleDownload = async () => {
    setDownloadLoading(true)

    try {
      await downloadReport(id, `${date}-${customer.dni}.pdf`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ocurrió un error inesperado')
    } finally {
      setDownloadLoading(false)
    }
  }

  return (
    <>
      <TableRow>
        <TableCell className="text-center">
          <Button size="icon" variant="ghost" className="size-8" onClick={handlePrint}>
            {printerLoading ? <Loader2Icon className="size-4 animate-spin" /> : <Printer />}
          </Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={handleDownload}>
            {downloadLoading ? <Loader2Icon className="size-4 animate-spin" /> : <Download />}
          </Button>
        </TableCell>
        <TableCell className="text-center border-dashed border-r">{date}</TableCell>

        <TableCell className="text-center">{customer.dni}</TableCell>
        <TableCell className="text-center">{customer.names}</TableCell>
        <TableCell className="text-center border-dashed border-r">{`${customer.paternalSurname} ${customer.maternalSurname}`}</TableCell>

        <TableCell className="text-center">{employee.dni}</TableCell>
        <TableCell className="text-center">{employee.names}</TableCell>
        <TableCell className="text-center border-dashed border-r">{`${employee.paternalSurname} ${employee.maternalSurname}`}</TableCell>

        <TableCell className="text-center">{details.length}</TableCell>
        <TableCell className="text-center">{total}</TableCell>
        <TableCell>
          <Link href={`/dashboard/sales/${id}`}>
            <Button size="icon" variant="ghost" className="size-8">
              <SquarePen />
            </Button>
          </Link>
          <DeleteConfirmDialog id={id} label="usuario" action={ORDER_ACTIONS.delete}>
            <Button size="icon" variant="ghost" className="size-8">
              <Trash />
            </Button>
          </DeleteConfirmDialog>
        </TableCell>
      </TableRow>
    </>
  )
}
