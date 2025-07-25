'use client'

import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { signInWithGithub } from '../actions'
import { signUpAction, type IActionState } from './actions'

export function SignUpForm() {
  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState<IActionState, FormData>(signUpAction, {
      success: false,
      message: null,
      errors: null,
      payload: null,
    })

  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign up failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
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
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          type="email"
          id="email"
          defaultValue={payload?.get('email') as string}
        />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          id="password"
          defaultValue={payload?.get('password') as string}
        />

        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          defaultValue={payload?.get('password_confirmation') as string}
        />

        {errors?.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password_confirmation[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
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
        type="submit"
        formAction={signInWithGithub}
        variant="outline"
        className="w-full"
      >
        <Image src={githubIcon} className="mr-2 size-4" alt="" />
        Sign up with GitHub
      </Button>
    </form>
  )
}
