'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import type { Role } from '@saas/auth'
import type { ComponentProps } from 'react'
import { updateMemberAction } from './actions'

interface IUpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: IUpdateMemberRoleSelectProps) {
  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
