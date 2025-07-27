import { InterceptedSheetContent } from '@components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@components/ui/sheet'
import { createOrganizationAction } from '../../org/actions'
import { OrganizationForm } from '../../org/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader className="p-0">
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm action={createOrganizationAction} />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
