'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import githubIcon from '@assets/github-icon.svg'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signInWithGithub } from '../actions'
import { useSignUpForm } from './use-sign-up-form'

export function SignUpForm() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useSignUpForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign up failed!</AlertTitle>
          <AlertDescription>
            <p>{errors.root.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          {...register('name')}
          id="name"
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          {...register('email')}
          type="email"
          id="email"
          placeholder="exemplo@email.com"
        />
        {errors.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register('password')}
          type="password"
          id="password"
          placeholder="Digite sua senha"
        />
        {errors.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          {...register('password_confirmation')}
          type="password"
          id="password_confirmation"
          placeholder="Confirme sua senha"
        />
        {errors.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Create account'
        )}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
      </Button>

      <Separator />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => void signInWithGithub()}
      >
        <Image src={githubIcon} className="mr-2 size-4" alt="" />
        Sign up with GitHub
      </Button>
    </form>
  )
}
