import { ability, getCurrentOrg } from '@auth/auth'
import { InterceptedSheetContent } from '@components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@components/ui/sheet'
import { getProject } from '@http/get-project'
import { redirect } from 'next/navigation'
import { updateProjectAction } from '../../../../../org/[slug]/(projects)/actions'
import { ProjectForm } from '../../../../../org/[slug]/(projects)/project-form'

export default async function UpdateProject({
  params,
}: {
  params: Promise<{
    slug: string
    projectSlug: string
  }>
}) {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  const currentOrg = await getCurrentOrg()

  const { projectSlug } = await params

  const { project } = await getProject({
    org: currentOrg as string,
    projectSlug,
  })

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader className="p-0">
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <ProjectForm
            initialData={project}
            action={updateProjectAction.bind(null, project.id)}
          />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
