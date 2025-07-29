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
import { AlertTriangle, Trash } from 'lucide-react'
import type { ComponentProps } from 'react'
import { deleteProjectAction } from './actions'

interface IDeleteProjectButton extends ComponentProps<typeof Button> {
  projectId: string
}

export function DeleteProjectButton({
  projectId,
  ...props
}: IDeleteProjectButton) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start px-2 py-1.5 text-sm"
        >
          <Trash className="text-muted-foreground mr-2 size-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <AlertTriangle className="text-destructive" />

          <DialogHeader>
            <DialogTitle>
              Are you absolutely sure you want to delete this project?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
        </div>

        <div className="ml-auto flex gap-3">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>

          <form action={deleteProjectAction.bind(null, projectId)}>
            <Button {...props} type="submit" size="sm" variant="secondary">
              Delete
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
