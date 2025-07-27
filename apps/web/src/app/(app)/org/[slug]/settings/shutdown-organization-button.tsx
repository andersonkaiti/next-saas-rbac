import { getCurrentOrg } from '@auth/auth'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { shutdownOrganization } from '@http/shutdown-organization'
import { AlertTriangle, XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrg()

    await shutdownOrganization({ org: currentOrg as string })

    redirect('/')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          <XCircle className="mr-2 size-4" />
          Shutdown organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <AlertTriangle className="text-destructive" />

          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delete this organization?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="ml-auto flex gap-3">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>

          <form action={shutdownOrganizationAction}>
            <Button type="submit" variant="destructive">
              Confirm
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
