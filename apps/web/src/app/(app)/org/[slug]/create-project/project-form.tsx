'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Textarea } from '@components/ui/textarea'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { createProjectAction, type IActionState } from './actions'

export function ProjectForm() {
  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState<IActionState, FormData>(createProjectAction, {
      success: false,
      message: null,
      errors: null,
      payload: null,
    })

  const queryClient = useQueryClient()

  const { slug: org } = useParams<{ slug: string }>()

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [org, 'projects'],
    })
  }, [success])

  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input
          name="name"
          id="name"
          defaultValue={payload?.get('name') as string}
        />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          defaultValue={payload?.get('description') as string}
        />

        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
