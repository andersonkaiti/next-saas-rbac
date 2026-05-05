import { OrganizationForm } from '@/app/(app)/org/organization-form'
import { getCurrentOrg } from '@auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { getOrganization } from '@http/get-organization'
import { updateOrganizationAction } from '../../actions'

export async function OrganizationSettingsCard() {
  const currentOrg = await getCurrentOrg()
  const { organization } = await getOrganization(currentOrg as string)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization settings</CardTitle>
        <CardDescription>Update your organization details</CardDescription>
      </CardHeader>
      <CardContent>
        <OrganizationForm
          initialData={organization}
          action={updateOrganizationAction}
        />
      </CardContent>
    </Card>
  )
}
