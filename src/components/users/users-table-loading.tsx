import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

export function UsersTableLoading() {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-9 w-[320px]" />
          <Skeleton className="h-8 w-[91px]" />
        </div>
        <div>
          <Skeleton className="h-9 w-[132px]" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[32px] text-center"></TableHead>
            <TableHead className="w-[100px] text-center">DNI</TableHead>
            <TableHead className="w-[200px] text-center">Nombres</TableHead>
            <TableHead className="w-[150px] text-center">A. Paterno</TableHead>
            <TableHead className="w-[150px] text-center">A. Materno</TableHead>
            <TableHead className="text-center">Correo</TableHead>
            <TableHead className="w-[100px] text-center">Teléfono</TableHead>
            <TableHead className="w-[125px] text-center">Roles</TableHead>
            <TableHead className="w-[100px] text-center">Estado</TableHead>
            <TableHead className="w-[80px] text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell></TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[75px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[75px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[200px]" />
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
                  <Skeleton className="h-4 w-[65px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center">
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
