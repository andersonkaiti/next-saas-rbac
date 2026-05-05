import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from './actions'
import { signInSchema, type SignInSchema } from './sign-in-schema'

export function useSignInForm(email: string) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email,
      password: '',
    },
  })

  async function onSubmit(data: SignInSchema) {
    const result = await signInWithEmailAndPassword(data)
    if (result?.success === false) {
      setError('root', { message: result.message })
    }
  }

  return { register, handleSubmit, errors, isSubmitting, onSubmit }
}
