import { Option } from "./form"

export interface Change {
    op: "add" | "remove" | "replace"
    property: string
    value: string | number | boolean | Option
}

export interface Suggestion {
    title: string
    description: string
    changes: Change[]
}

export type ChatMode = "bubble" | "card" | "sidebar"