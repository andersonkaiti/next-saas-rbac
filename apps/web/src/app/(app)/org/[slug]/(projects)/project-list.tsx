import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { ArrowRight } from 'lucide-react'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            ut. Distinctio id dignissimos aspernatur sint, soluta aliquid
            ducimus, ex praesentium nemo aperiam incidunt, temporibus at quos
            provident laudantium fuga nihil.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarFallback />
            <AvatarImage src="https://github.com/andersonkaiti.png" />
          </Avatar>

          <span className="text-muted-foreground text-xs">
            Created by{' '}
            <span className="text-foreground font-medium">Anderson Kaiti</span>{' '}
            a day ago
          </span>

          <Button size="xs" className="ml-auto" variant="outline">
            View <ArrowRight className="ml-2 size-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
