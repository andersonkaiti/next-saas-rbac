import { api } from './api-client'

export interface IGetProjectRequest {
  org: string
  projectSlug: string
}

export interface IGetProjectResponse {
  project: {
    name: string
    id: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }
}

export async function getProject({ org, projectSlug }: IGetProjectRequest) {
  return await api
    .get(`organizations/${org}/projects/${projectSlug}`)
    .json<IGetProjectResponse>()
}
