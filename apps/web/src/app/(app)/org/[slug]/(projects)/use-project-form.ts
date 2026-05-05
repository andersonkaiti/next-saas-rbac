import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { projectSchema, type ProjectSchema } from './project-schema'

interface UseProjectFormProps {
  initialData?: (ProjectSchema & { slug: string }) | null
  action: (data: ProjectSchema) => Promise<{ success: boolean; message: string | null }>
}

export function useProjectForm({ initialData = null, action }: UseProjectFormProps) {
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

  return { register, handleSubmit, errors, isSubmitting, onSubmit, successMessage }
}
