import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-26.5" />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-26.5" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2 sm:flex-row">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-25.5" />
            <Skeleton className="h-9 w-30.5" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-7 w-19" />

        <div className="rounded border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="py-2.5">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="py-2.5">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="py-2.5">
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-7 w-19" />

        <div className="rounded border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-[48px] py-2.5">
                  <Skeleton className="size-8 rounded-full" />
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="mt-1 h-4 w-14" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="h-8 w-44" />
                    <Skeleton className="h-9 w-28" />
                    <Skeleton className="h-8 w-44" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
