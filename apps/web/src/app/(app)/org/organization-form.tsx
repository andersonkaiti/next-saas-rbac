'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useActionState, useId } from 'react'
import { type IActionState } from './actions'
import type { OrganizationSchema } from './organization-schema'

interface IOrganizationFormProps {
  initialData?: OrganizationSchema | null
  action: (_: unknown, data: FormData) => Promise<IActionState>
}

function objectToFormData(obj: Record<string, any> | null): FormData {
  const formData = new FormData()

  if (!obj) {
    return formData
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    }
  }

  return formData
}

export function OrganizationForm({
  initialData = null,
  action,
}: IOrganizationFormProps) {
  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState<IActionState, FormData>(action, {
      success: false,
      message: null,
      errors: null,
      payload: objectToFormData(initialData),
    })

  const shouldAttachUsersByDomainId = useId()

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

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" id="name" defaultValue={initialData?.name} />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          id="domain"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData?.domain ?? undefined}
        />

        {errors?.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id={shouldAttachUsersByDomainId}
            className="mt-1.5"
            defaultChecked={initialData?.shouldAttachUsersByDomain}
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

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
