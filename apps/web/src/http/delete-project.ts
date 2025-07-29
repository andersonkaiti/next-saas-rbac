import { api } from './api-client'

export interface IDeleteProjectRequest {
  org: string
  projectId: string
}

export type IDeleteProjectResponse = void

export async function deleteProject({
  org,
  projectId,
}: IDeleteProjectRequest): Promise<IDeleteProjectResponse> {
  return await api
    .delete(`organizations/${org}/projects/${projectId}`)
    .json<IDeleteProjectResponse>()
}
