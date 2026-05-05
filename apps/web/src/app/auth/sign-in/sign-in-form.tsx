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
import { useSearchParams } from 'next/navigation'
import { signInWithGithub } from '../actions'
import { useSignInForm } from './use-sign-in-form'

export function SignInForm() {
  const searchParams = useSearchParams()
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useSignInForm(
    searchParams.get('email') ?? ''
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{errors.root.message}</p>
          </AlertDescription>
        </Alert>
      )}

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
        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => void signInWithGithub()}
      >
        <Image src={githubIcon} className="mr-2 size-4" alt="" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
