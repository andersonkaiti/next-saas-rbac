import { api } from './api-client'

interface IUpdateOrganizationRequest {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: IUpdateOrganizationRequest) {
  return await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
