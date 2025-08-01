import { Card, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'

export default function Loading() {
  return (
    <div className="h-full w-full space-y-4 py-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-22.5" />
        <Skeleton className="h-8 w-35" />
      </div>
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
    </div>
  )
}
