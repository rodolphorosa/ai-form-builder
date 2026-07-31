import { Suggestion } from "../types/ai"
import { Form, FormSchema, Item, Project, ProviderType, Section } from "../types/form"

interface BaseRequest {
    prompt: string
    provider: ProviderType
    model: string
}

export type CreateRequest = BaseRequest
export interface EditRequest extends BaseRequest {
    form: Form
}

export interface SuggestionRequest {
    schema: FormSchema
    subject: Section | Item
    context: "properties" | "options" | "validation" | "logic"
    provider: ProviderType
    model: string
}

interface FormResponse {
    message: string
    changes?: { type: string, label: string}[]
    form: Form
}

export interface ApiResponse<T> {
    data: T
}

export type ApiFormResponse = ApiResponse<FormResponse>

export type UpdateFormRequest = Partial<Pick<Form, "name" | "description" | "schema" | "projectId" | "pinned" | "archived" | "deleted">>