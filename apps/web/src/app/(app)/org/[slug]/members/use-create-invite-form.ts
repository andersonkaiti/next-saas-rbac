import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createInviteAction } from './actions'
import { inviteSchema, type InviteSchema } from './invite-schema'

export function useCreateInviteForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InviteSchema>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: '', role: 'MEMBER' },
  })

  async function onSubmit(data: InviteSchema) {
    clearErrors('root')
    setSuccessMessage(null)
    const result = await createInviteAction(data)
    if (!result.success) {
      setError('root', { message: result.message ?? undefined })
    } else {
      setSuccessMessage(result.message)
      reset()
    }
  }

  return { register, handleSubmit, control, errors, isSubmitting, onSubmit, successMessage }
}
