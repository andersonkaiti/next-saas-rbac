import type { Role } from '@saas/auth'
import { api } from './api-client'

interface IGetInviteResponse {
  invite: {
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      name: string
    }
  }
}

export async function getInvite(inviteId: string) {
  return await api.get(`invites/${inviteId}`).json<IGetInviteResponse>()
}
