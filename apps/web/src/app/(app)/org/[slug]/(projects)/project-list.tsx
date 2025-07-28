import { getCurrentOrg } from '@auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { getProjects } from '@http/get-projects'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'

dayjs.extend(relativeTime)

export async function ProjectList() {
  const currentOrg = await getCurrentOrg()

  const { projects } = await getProjects(currentOrg as string)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="text-2xl font-medium">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto flex items-center gap-1.5">
            <Avatar className="size-4">
              <AvatarFallback />
              {project.owner.avatarUrl && (
                <AvatarImage src={project.owner.avatarUrl} />
              )}
            </Avatar>

            <span className="text-muted-foreground text-xs">
              <span className="text-foreground font-medium">
                {project.owner.name}
              </span>{' '}
              {dayjs(project.createdAt).fromNow()}
            </span>

            <Button size="xs" className="ml-auto" variant="outline">
              View <ArrowRight className="ml-2 size-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
