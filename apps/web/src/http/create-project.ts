import { api } from './api-client'

interface ICreateProjectRequest {
  org: string
  name: string
  description: string
}

interface ICreateProjectResponse {
  projectId: string
}

export async function createProject({
  org,
  name,
  description,
}: ICreateProjectRequest) {
  return await api
    .post(`organizations/${org}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<ICreateProjectResponse>()
}
