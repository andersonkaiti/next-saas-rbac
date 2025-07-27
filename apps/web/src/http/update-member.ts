import type { Role } from '@saas/auth'
import { api } from './api-client'

interface IUpdateMemberRequest {
  org: string
  memberId: string
  role: Role
}

export async function updateMember({
  org,
  memberId,
  role,
}: IUpdateMemberRequest) {
  await api.put(`organizations/${org}/members/${memberId}`, {
    json: {
      role,
    },
  })
}
