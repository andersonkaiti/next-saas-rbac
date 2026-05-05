import { ability } from '@auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { Skeleton } from '@components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ShutdownOrganizationButton } from './shutdown-organization-button'

const DynamicOrganizationSettingsCard = dynamic(() =>
  import('./organization-settings-card').then((m) => m.OrganizationSettingsCard)
)
const DynamicBilling = dynamic(() =>
  import('./billing').then((m) => m.Billing)
)

export default async function Settings() {
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  return (
    <>
      <h1 className="w-fit text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Suspense
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-4 w-39" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-5 w-55.5" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-30.5" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-23" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Skeleton className="!size-5 rounded-sm" />
                    <div className="space-y-1">
                      <Skeleton className="h-4.5 w-38.5" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            }
          >
            <DynamicOrganizationSettingsCard />
          </Suspense>
        )}

        {canGetBilling && (
          <Suspense
            fallback={
              <>
                <Separator />
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-4 w-11.5" />
                    </CardTitle>
                    <CardDescription>
                      <Skeleton className="h-5 w-65" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left">Cost type</TableHead>
                          <TableHead className="w-[120px] text-right">Quantity</TableHead>
                          <TableHead className="w-[200px] text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Amount of projects</TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Amount of seats</TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell />
                          <TableCell className="text-right">Total</TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardContent>
                </Card>
              </>
            }
          >
            <DynamicBilling />
          </Suspense>
        )}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShutdownOrganizationButton />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
