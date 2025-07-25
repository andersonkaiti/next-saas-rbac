import { api } from './api-client'

interface IGetOrganizationsResponse {
  organizations: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations() {
  return await api.get('organizations').json<IGetOrganizationsResponse>()
}
