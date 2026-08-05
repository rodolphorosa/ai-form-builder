import { CreateRequest, ApiFormResponse, EditRequest, SuggestionRequest, ApiResponse, UpdateFormRequest } from "./types"
import { ApiClient } from "./client"
import { Suggestion } from "@/types/ai"
import { Form, FormSchema } from "@/types/form"
import { Message } from "@/types/chat"

const api = new ApiClient()

export const formService = {
    createWithAI(request: CreateRequest): Promise<ApiFormResponse> {
        return api.post<ApiFormResponse>("/forms/create_with_ai", request)
    },

    createBlank(request: Partial<Form>): Promise<ApiResponse<Form>> {
        return api.post<ApiResponse<Form>>("/forms/create_blank", request)
    },

    create_from_json(request: {form: Form}): Promise<ApiResponse<Form>> {
        return api.post<ApiResponse<Form>>("/forms/create_from_json", request)
    },

    createFromImage(request: FormData): Promise<ApiResponse<{ message: string, form: Form }>> {
        return api.postFormData<ApiResponse<{ message: string, form: Form }>>("/forms/create_from_image", request)
    },

    edit(request: EditRequest): Promise<ApiResponse<{ message: string, form: Partial<Form> }>> {
        return api.post<ApiResponse<{ message: string, form: Partial<Form> }>>("/forms/edit", request)
    },

    suggest(id: string, request: SuggestionRequest): Promise<ApiResponse<{ suggestions: Suggestion[] }>> {
        return api.post<ApiResponse<{ suggestions: Suggestion[] }>>(`/forms/${id}/suggestions/`, request)
    },

    getAll(): Promise<ApiResponse<Form[]>> {
        return api.get<ApiResponse<Form[]>>("/forms")
    },

    getById(id: string): Promise<ApiResponse<Form>> {
        return api.get<ApiResponse<Form>>(`/forms/${id}`)
    },

    update(id: string, form: UpdateFormRequest): Promise<ApiResponse<Form>> {
        return api.patch<ApiResponse<Form>>(`/forms/${id}`, form)
    },

    getConversation(id: string): Promise<ApiResponse<{ id: string, messages: Message[] }>> {
        return api.get<ApiResponse<{ id: string, messages: Message[] }>>(`/forms/${id}/conversation`)
    }
}
