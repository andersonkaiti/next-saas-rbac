'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useState, useId } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { organizationSchema, type OrganizationSchema } from './organization-schema'

interface IOrganizationFormProps {
  initialData?: OrganizationSchema | null
  action: (data: OrganizationSchema) => Promise<{ success: boolean; message: string | null }>
}

export function OrganizationForm({ initialData = null, action }: IOrganizationFormProps) {
  const shouldAttachUsersByDomainId = useId()
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
        <Label htmlFor="name">Organization name</Label>
        <Input {...register('name')} id="name" />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          {...register('domain')}
          id="domain"
          inputMode="url"
          placeholder="example.com"
        />
        {errors.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Controller
            name="shouldAttachUsersByDomain"
            control={control}
            render={({ field }) => (
              <Checkbox
                id={shouldAttachUsersByDomainId}
                className="mt-1.5"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor={shouldAttachUsersByDomainId} className="space-y-1">
            <span className="text-sm leading-none font-medium">
              Auto-join new members
            </span>
            <p className="text-muted-foreground text-sm">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
