import { api } from './api-client'

interface IUpdateProjectRequest {
  org: string
  projectId: string
  name: string
  description: string
}

interface IUpdateProjectResponse {
  projectId: string
}

export async function updateProject({
  org,
  projectId,
  name,
  description,
}: IUpdateProjectRequest) {
  return await api
    .put(`organizations/${org}/projects/${projectId}`, {
      json: {
        name,
        description,
      },
    })
    .json<IUpdateProjectResponse>()
}
