import { getCurrentOrg } from '@auth/auth'
import { getProject } from '@http/get-project'
import { ProjectCard } from './project-card'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; projectSlug: string }>
}) {
  const { projectSlug } = await params

  const currentOrg = await getCurrentOrg()

  const { project } = await getProject({
    org: currentOrg as string,
    projectSlug,
  })

  return <ProjectCard project={project} />
}
