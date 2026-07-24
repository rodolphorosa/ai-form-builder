import { ApiResponse } from "./types"
import { ApiClient } from "./client"
import { Project } from "@/types/form"

const api = new ApiClient()

export const projectService = {
    getProject(id: string): Promise<ApiResponse<Project[]>> {
        return api.get<ApiResponse<Project[]>>(`/api/projects/${id}`)

    },

    getProjects(): Promise<ApiResponse<Project>> {
        return api.get<ApiResponse<Project>>("/api/projects")
    }
}
