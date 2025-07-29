import { ability, getCurrentOrg } from '@auth/auth'
import { Button } from '@components/ui/button'
import { Card, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

const DynamicProjectList = dynamic(() =>
  import('./project-list').then((m) => m.ProjectList)
)

export default async function Projects() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...new Array(9)].map((_, index) => (
                <Card key={index} className="flex h-[213.5px]">
                  <CardHeader className="gap-2">
                    <div className="flex justify-between gap-2">
                      <Skeleton className="h-8 w-1/3" />
                      <Skeleton className="size-6" />
                    </div>
                    <Skeleton className="h-5 w-1/2" />
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Skeleton className="h-6 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          }
        >
          <DynamicProjectList />
        </Suspense>
      ) : (
        <p className="text-muted-foreground text-sm">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
