import { Option } from "./form"

export type Change =
    | {
          op: "replace"
          path: string
          value: string | number | boolean
      }
    | {
          op: "add"
          path: string
          value: Option[]
      }
    | {
          op: "remove"
          path: string
          value: Option[]
      }

export interface Suggestion {
    id: string
    title: string
    description: string
    changes: Change[]
    status: "pending" | "approved" | "discarded"
}

export type ChatMode = "bubble" | "card" | "sidebar"