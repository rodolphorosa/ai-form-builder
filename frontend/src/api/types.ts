import { Suggestion } from "../types/ai"
import { FormSchema, Item, ProviderType, Section } from "../types/form"

interface BaseRequest {
    prompt: string
    provider: ProviderType
    model: string
}

export type CreateRequest = BaseRequest
export interface EditRequest extends BaseRequest {
    schema: FormSchema
}

export interface SuggestionRequest {
    schema: FormSchema
    subject: Section | Item
    context: "properties" | "options" | "validation" | "logic"
    provider: ProviderType
    model: string
}

interface SuggestionResponse {
    suggestions: Suggestion[]
}

interface FormResponse {
    message: string
    changes: { type: string, label: string}[]
    schema: FormSchema
}

interface ApiResponse<T> {
    data: T
}

export type ApiFormResponse = ApiResponse<FormResponse>

export type ApiSuggestionResponse = ApiResponse<SuggestionResponse>