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
import { AlertTriangle, UserMinus } from 'lucide-react'
import { removeMemberAction } from './actions'

interface IDeleteMemberButtonProps extends React.ComponentProps<'button'> {
  memberId: string
}

export function RemoveMemberButton({
  memberId,
  disabled,
  ...props
}: IDeleteMemberButtonProps) {
  if (disabled) {
    return (
      <Button size="sm" variant="destructive" className="w-fit" disabled>
        <UserMinus className="mr-2 size-4" />
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="w-fit">
          <UserMinus className="mr-2 size-4" />
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

          <form action={removeMemberAction.bind(null, memberId)}>
            <Button {...props} type="submit" size="sm" variant="destructive">
              Remove member
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
