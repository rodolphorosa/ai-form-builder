import { CreateRequest, ApiFormResponse, EditRequest, SuggestionRequest, ApiResponse, UpdateFormRequest } from "./types"
import { ApiClient } from "./client"
import { Suggestion } from "@/types/ai"
import { Form, FormSchema } from "@/types/form"

const api = new ApiClient()

export const formService = {
    create(request: {form: Form}): Promise<ApiResponse<Form>> {
        return api.post<ApiResponse<Form>>("/forms/create_from_json", request)
    },

    createWithAI(request: CreateRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/forms/generate", request)
    },

    edit(request: EditRequest): Promise<ApiResponse<{ message: string, schema: FormSchema }>> {
        return api.post<ApiResponse<{ message: string, schema: FormSchema }>>("/forms/edit", request)
    },

    suggest(request: SuggestionRequest): Promise<ApiResponse<{ suggestions: Suggestion[]}>> {
        return api.post<ApiResponse<{ suggestions: Suggestion[]}>>("/suggestions/", request)
    },

    createBlank(request: Partial<Form>): Promise<ApiResponse<Form>> {
        return api.post<ApiResponse<Form>>("/forms/create_blank", request)
    },

    createFromImage(request: FormData): Promise<ApiResponse<{ message: string, form: Form}>> {
        return api.postFormData<ApiResponse<{ message: string, form: Form}>>("/forms/generate_from_image", request)
    },

    getAll(): Promise<ApiResponse<Form[]>> {
        return api.get<ApiResponse<Form[]>>("/forms")
    },

    getById(id: string): Promise<ApiResponse<Form>> {
        return api.get<ApiResponse<Form>>(`/forms/${id}`)
    },

    update(id: string, form: UpdateFormRequest): Promise<ApiResponse<Form>> {
        return api.patch<ApiResponse<Form>>(`/forms/${id}`, form)
    }
}
