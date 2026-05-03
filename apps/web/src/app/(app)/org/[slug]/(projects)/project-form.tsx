'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Textarea } from '@components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { projectSchema, type ProjectSchema } from './project-schema'

interface IProjectForm {
  initialData?: (ProjectSchema & { slug: string }) | null
  action: (data: ProjectSchema) => Promise<{ success: boolean; message: string | null }>
}

export function ProjectForm({ action, initialData }: IProjectForm) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { slug: org } = useParams<{ slug: string }>()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
    },
  })

  async function onSubmit(data: ProjectSchema) {
    clearErrors('root')
    setSuccessMessage(null)
    const result = await action(data)
    if (!result.success) {
      setError('root', { message: result.message ?? undefined })
    } else {
      setSuccessMessage(result.message)
      queryClient.invalidateQueries({ queryKey: [org, 'projects'] })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
          <AlertDescription>
            <p>{errors.root.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{successMessage}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>
        <Input {...register('name')} id="name" />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea {...register('description')} id="description" />
        {errors.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
