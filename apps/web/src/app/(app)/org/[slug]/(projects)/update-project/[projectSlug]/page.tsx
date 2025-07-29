import { ability, getCurrentOrg } from '@auth/auth'
import { getProject } from '@http/get-project'
import { redirect } from 'next/navigation'
import { ProjectForm } from '../../project-form'
import { updateProjectAction } from './actions'

export default async function UpdateProject({
  params,
}: {
  params: Promise<{
    slug: string
    projectSlug: string
  }>
}) {
  const permissions = await ability()

  if (permissions?.cannot('update', 'Project')) {
    redirect('/')
  }

  const currentOrg = await getCurrentOrg()

  const { projectSlug } = await params

  const { project } = await getProject({
    org: currentOrg as string,
    projectSlug,
  })

  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4 py-4">
      <h1 className="text-2xl font-bold">Update project</h1>

      <ProjectForm
        initialData={project}
        action={updateProjectAction.bind(null, project.id)}
      />
    </main>
  )
}
