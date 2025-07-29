import { ability } from '@auth/auth'
import { redirect } from 'next/navigation'
import { ProjectForm } from '../project-form'
import { createProjectAction } from './actions'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] space-y-4 py-4">
      <h1 className="text-2xl font-bold">Create project</h1>

      <ProjectForm action={createProjectAction} />
    </main>
  )
}
