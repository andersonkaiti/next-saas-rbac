import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signUpAction } from './actions'
import { signUpSchema, type SignUpSchema } from './sign-up-schema'

export function useSignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpSchema) {
    const result = await signUpAction(data)
    if (result?.success === false) {
      setError('root', { message: result.message })
    }
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit }
}
