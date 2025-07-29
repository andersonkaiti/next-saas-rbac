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
import { AlertTriangle, ArrowLeftRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { transferOwnershipAction } from './actions'

interface ITransferOwnership extends ComponentProps<typeof Button> {
  transferToUserId: string
}

export function TransferOwnership({
  transferToUserId,
  ...props
}: ITransferOwnership) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <ArrowLeftRight className="mr-2 size-4" />
          Transfer ownership
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <AlertTriangle className="text-destructive" />

          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to transfer the ownership?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="ml-auto flex gap-3">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>

          <form action={transferOwnershipAction.bind(null, transferToUserId)}>
            <Button {...props} type="submit" size="sm" variant="secondary">
              Transfer ownership
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
