import { CreateRequest, ApiFormResponse, EditRequest, SuggestionRequest, ApiResponse } from "./types"
import { ApiClient } from "./client"
import { Suggestion } from "@/types/ai"

const api = new ApiClient()

export const formService = {
    createForm(request: CreateRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/api/forms/generate", request)
    },

    editForm(request: EditRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/api/forms/edit", request)
    },

    suggest(request: SuggestionRequest): Promise<ApiResponse<{ suggestions: Suggestion[]}>> {
        return api.post<ApiResponse<{ suggestions: Suggestion[]}>>("/api/suggestions/", request)
    }
}
