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
import { AlertTriangle, XOctagon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { revokeInviteAction } from './actions'

interface IRevokeInviteButtonProps extends ComponentProps<typeof Button> {
  inviteId: string
}

export function RevokeInviteButton({
  inviteId,
  ...props
}: IRevokeInviteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <XOctagon className="mr-2 size-4" />
          Revoke invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <AlertTriangle className="text-destructive" />

          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to revoke this invite?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="ml-auto flex gap-3">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>

          <form action={revokeInviteAction.bind(null, inviteId)}>
            <Button {...props} type="submit" size="sm" variant="destructive">
              Revoke invite
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
