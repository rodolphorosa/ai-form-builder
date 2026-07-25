import { FormSchema } from "./form"

export type SuggestionStatus = "pending" | "applied" | "discarded" | "expired"
export type MessageTypes = "text" | "thinking" | "suggestion"

export type UserTypes = "user" | "model"

export interface Message {
    id: string
    user: UserTypes
    text: string

    type: MessageTypes

    suggestion?: {
        previousSchema: FormSchema | null
        schema: FormSchema
        status: SuggestionStatus
    }
}