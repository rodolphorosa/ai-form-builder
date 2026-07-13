import { FormSchema, ProviderType } from "../types/form"

interface BaseRequest {
    prompt: string
    provider: ProviderType
    model: string
}

export type CreateRequest = BaseRequest
export interface EditRequest extends BaseRequest {
    schema: FormSchema
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