import { FormSchema } from "./form"

export type SuggestionStatus = "pending" | "applied" | "discarded" | "expired"
export type MessageTypes = "text" | "thinking"

export type Roles = "user" | "assistant"

export interface Message {
    id: string
    role: Roles
    content: string
    createdAt?: number
    snapshot?: FormSchema
    type?: MessageTypes
}