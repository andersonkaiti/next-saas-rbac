import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

interface IProjectCardProps {
  project: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }
}

export function ProjectCard({ project }: IProjectCardProps) {
  return (
    <div className="text-card-foreground flex flex-col gap-6">
      <div className="line-clamp-2 leading-relaxed">{project.description}</div>
      <div className="mt-auto flex items-center gap-1.5">
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
        </span>
      </div>
    </div>
  )
}
