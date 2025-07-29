import { ability, getCurrentOrg } from '@auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { getProjects } from '@http/get-projects'
import { projectSchema } from '@saas/auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight, RotateCcw, Settings } from 'lucide-react'
import Link from 'next/link'
import { DeleteProjectButton } from './delete-project-button'

dayjs.extend(relativeTime)

export async function ProjectList() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const { projects } = await getProjects(currentOrg as string)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex justify-between gap-2">
              <CardTitle className="text-2xl font-medium">
                {project.name}
              </CardTitle>

              {permissions?.can('update', projectSchema.parse(project)) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="xs" variant="ghost" className="size-6">
                      <Settings />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className="flex w-full items-center justify-start px-2 py-1.5 text-sm"
                      >
                        <Link
                          href={`/org/${currentOrg}/update-project/${project.slug}`}
                          className="flex w-fit items-center justify-between"
                        >
                          <RotateCcw className="mr-2 size-4" />
                          Update
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <DeleteProjectButton projectId={project.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
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

            <Button size="xs" className="ml-auto" variant="outline" asChild>
              <Link href={`/org/${currentOrg}/project/${project.slug}`}>
                View <ArrowRight className="ml-2 size-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
