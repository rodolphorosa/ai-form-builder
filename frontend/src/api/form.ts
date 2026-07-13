import { CreateRequest, ApiFormResponse, EditRequest } from "./types"
import { ApiClient } from "./client"

const api = new ApiClient()

export const formService = {
    createForm(request: CreateRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/api/generate-form", request)
    },

    editForm(request: EditRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/api/edit-form", request)
    },
}
