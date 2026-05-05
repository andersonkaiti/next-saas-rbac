'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useCreateInviteForm } from './use-create-invite-form'

export function CreateInviteForm() {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    successMessage,
  } = useCreateInviteForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root?.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
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

      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <div className="w-full space-y-2">
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full sm:w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="BILLING">Billing</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button type="submit" className="w-full sm:w-fit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
