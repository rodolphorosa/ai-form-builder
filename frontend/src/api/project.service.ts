import { ApiResponse, UpdateProjectRequest } from "./types"
import { ApiClient } from "./client"
import { Project } from "@/types/form"

const api = new ApiClient()

export const projectService = {
    getById(id: string): Promise<ApiResponse<Project>> {
        return api.get<ApiResponse<Project>>(`/projects/${id}`)

    },

    getAll(): Promise<ApiResponse<Project[]>> {
        return api.get<ApiResponse<Project[]>>("/projects")
    },

    getArchived(): Promise<ApiResponse<Project[]>> {
        return api.get<ApiResponse<Project[]>>("/projects/archived")
    },

    create(name: string, description: string | null): Promise<ApiResponse<Project>> {
        return api.post<ApiResponse<Project>>("/projects", { name: name, description: description })
    },

    update(id: string, project: UpdateProjectRequest): Promise<ApiResponse<Project>> {
        return api.patch<ApiResponse<Project>>(`/projects/${id}`, project)
    }
}
