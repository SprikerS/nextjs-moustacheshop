import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

export function CategoriesTableLoading() {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-9 w-[320px]" />
        </div>
        <div>
          <Skeleton className="h-9 w-[145px]" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Descripción</TableHead>
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
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
