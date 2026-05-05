import { ability } from '@auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@components/ui/table'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicInvites = dynamic(() => import('./invites').then((m) => m.Invites))
const DynamicMemberList = dynamic(() =>
  import('./member-list').then((m) => m.MemberList)
)

export default async function Members() {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        {permissions?.can('get', 'Invite') && (
          <Suspense
            fallback={
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
            }
          >
            <DynamicInvites />
          </Suspense>
        )}

        {permissions?.can('get', 'User') && (
          <Suspense
            fallback={
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
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            <Skeleton className="h-8 w-44" />
                            <Skeleton className="h-9 w-28" />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            }
          >
            <DynamicMemberList />
          </Suspense>
        )}
      </div>
    </div>
  )
}
