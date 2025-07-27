import { api } from './api-client'

interface IShutdownOrganizationRequest {
  org: string
}

export async function shutdownOrganization({
  org,
}: IShutdownOrganizationRequest) {
  await api.delete(`organizations/${org}`)
}
