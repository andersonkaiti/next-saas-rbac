import { ability } from '@auth/auth'
import { InterceptedSheetContent } from '@components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@components/ui/sheet'
import { redirect } from 'next/navigation'
import { ProjectForm } from '../../../../org/[slug]/create-project/project-form'

export default async function CreateProject() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader className="p-0">
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
