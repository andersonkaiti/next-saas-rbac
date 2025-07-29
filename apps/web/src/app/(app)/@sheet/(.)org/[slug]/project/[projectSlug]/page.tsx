import { getCurrentOrg } from '@auth/auth'
import { InterceptedDialogContent } from '@components/intercepted-dialog-content'
import { Dialog, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { getProject } from '@http/get-project'
import { ProjectCard } from '../../../../../org/[slug]/(projects)/project/[projectSlug]/project-card'

export default async function Project({
  params,
}: {
  params: Promise<{
    slug: string
    projectSlug: string
  }>
}) {
  const { projectSlug } = await params

  const currentOrg = await getCurrentOrg()

  const { project } = await getProject({
    org: currentOrg as string,
    projectSlug,
  })

  return (
    <Dialog defaultOpen>
      <InterceptedDialogContent>
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        <ProjectCard project={project} />
      </InterceptedDialogContent>
    </Dialog>
  )
}
