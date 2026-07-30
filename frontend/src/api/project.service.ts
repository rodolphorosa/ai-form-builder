import { ApiResponse } from "./types"
import { ApiClient } from "./client"
import { Project } from "@/types/form"

const api = new ApiClient()

export const projectService = {
    getById(id: string): Promise<ApiResponse<Project>> {
        return api.get<ApiResponse<Project>>(`/projects/${id}`)

    },

    getAll(): Promise<ApiResponse<Project[]>> {
        return api.get<ApiResponse<Project[]>>("/projects")
    }
}
