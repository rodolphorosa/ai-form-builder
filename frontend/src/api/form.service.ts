import { CreateRequest, ApiFormResponse, EditRequest, SuggestionRequest, ApiResponse } from "./types"
import { ApiClient } from "./client"
import { Suggestion } from "@/types/ai"
import { Form, FormSchema } from "@/types/form"

const api = new ApiClient()

export const formService = {
    create(request: CreateRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/api/forms/generate", request)
    },

    edit(request: EditRequest): Promise<ApiResponse<{ message: string, schema: FormSchema }>> {
        return api.post<ApiResponse<{ message: string, schema: FormSchema }>>("/api/forms/edit", request)
    },

    suggest(request: SuggestionRequest): Promise<ApiResponse<{ suggestions: Suggestion[]}>> {
        return api.post<ApiResponse<{ suggestions: Suggestion[]}>>("/api/suggestions/", request)
    },

    createBlank(request: Partial<Form>): Promise<ApiResponse<Form>> {
        return api.post<ApiResponse<Form>>("/api/forms/create_blank", request)
    },

    getAll(): Promise<ApiResponse<Form[]>> {
        return api.get<ApiResponse<Form[]>>("/api/forms")
    },

    getById(id: string): Promise<ApiResponse<Form>> {
        return api.get<ApiResponse<Form>>(`/api/forms/${id}`)
    }
}
