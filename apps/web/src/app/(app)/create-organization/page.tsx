'use client'

import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'

export default function CreateOrganization() {
  // const [{ success, message, errors, payload }, formAction, isPending] =
  //   useActionState<IActionState, FormData>(createOrganization, {
  //     success: false,
  //     message: null,
  //     errors: null,
  //     payload: null,
  //   })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <form className="space-y-4">
        {/* {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign up failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )} */}

        <div className="space-y-2">
          <Label htmlFor="name">Organization name</Label>
          <Input
            name="name"
            id="name"
            // defaultValue={payload?.get('name') as string}
          />

          {/* {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail domain</Label>
          <Input
            name="domain"
            id="domain"
            inputMode="url"
            placeholder="example.com"
            // defaultValue={payload?.get('domain') as string}
          />

          {/* {errors?.domain && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.domain[0]}
            </p>
          )} */}
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              className="mt-1.5"
            />
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm leading-none font-medium">
                Auto-join new members
              </span>
              <p className="text-muted-foreground text-sm">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save organization
        </Button>
      </form>
    </div>
  )
}
