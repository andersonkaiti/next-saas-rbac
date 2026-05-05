import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { organizationSchema, type OrganizationSchema } from './organization-schema'

interface UseOrganizationFormProps {
  initialData?: OrganizationSchema | null
  action: (data: OrganizationSchema) => Promise<{ success: boolean; message: string | null }>
}

export function useOrganizationForm({ initialData = null, action }: UseOrganizationFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      domain: initialData?.domain ?? '',
      shouldAttachUsersByDomain: initialData?.shouldAttachUsersByDomain ?? false,
    },
  })

  async function onSubmit(data: OrganizationSchema) {
    clearErrors('root')
    setSuccessMessage(null)
    const result = await action(data)
    if (!result.success) {
      setError('root', { message: result.message ?? undefined })
    } else {
      setSuccessMessage(result.message)
    }
  }

  return { register, handleSubmit, control, errors, isSubmitting, onSubmit, successMessage }
}
