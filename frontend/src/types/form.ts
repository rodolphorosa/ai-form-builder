import { LogicRule } from "./logic"

export const InputTypes = {
    TEXT: "text", 
    EMAIL: "email", 
    PASSWORD: "password", 
    PHONE: "phone", 
    URL: "url", 
    TEXTAREA: "textarea", 
    NUMBER: "number",  
    DATE: "date", 
    DATETIME: "datetime", 
    SELECT: "select", 
    RADIO: "radio", 
    CHECKBOX: "checkbox",
    RATING: "rating",
    FILE: "file"
}

export type InputType = typeof InputTypes[keyof typeof InputTypes]

interface UiRules {
    placeholder: string
    helpText: string
}

export type Ui = Partial<UiRules>

interface ValidationRules {
    minValue: number
    maxValue: number
    minLength: number
    maxLength: number
    regex: string
    maxSize: number
    minFiles: number
    maxFiles: number
    acceptedTypes: string[]
}

export type Validation = Partial<ValidationRules>

type OptionValue = string | number | boolean

export interface Option<T extends OptionValue = string> {
    value: T
    label: string
    extra?: Record<string,unknown>
}

interface ComponentBase {
    id: string
    name: string
    label: string
    description?: string
    ui?: Ui
}

export interface Item extends ComponentBase {
    type: InputType
    required: boolean
    disabled: boolean
    validation?: Validation
    options?: Option[]
    logicRules?: LogicRule[]
}

export interface Group extends ComponentBase {
    type: "group"
    items: Item[]
}

export type SectionItem = Item | Group

export interface Section {
    id: string
    name: string
    label: string
    description?: string
    items: Item[]
}

export interface FormSchema {
    sections: Section[]
}

export const ProviderTypes = {
    GEMINI: "gemini",
    OLLAMA: "ollama",
    OPENAI: "openai"
} as const

export type ProviderType = typeof ProviderTypes[keyof typeof ProviderTypes]

export interface Project {
    id: string
    name: string
    description?: string
    createdAt: number
    updatedAt: number
    pinned: boolean
    archived: boolean
    deleted: boolean
    formCount?: number
}

export interface Form {
    id: string
    name: string
    description?: string
    schema: FormSchema
    projectId: string
    projectName?: string
    createdAt: number
    updatedAt: number
    pinned: boolean
    archived: boolean
    deleted: boolean
}

export type Path = (string | number)[]

export type MoveAction = 
    | { type: "create", form: Form }
    | { type: "search", form: Form }
    | { type: "project", form: Form, project: Project }



export type FormUpdateAction = 
    | { type: "pin", form: Form }
    | { type: "unpin", form: Form }
    | { type: "archive", form: Form }
    | { type: "delete", form: Form }
    | { type: "rename", form: Form }
    | { type: "duplicate", form: Form }


export type FormUpdateParams = 
    | { form: Form, attribute: "pinned", value: boolean }
    | { form: Form,  attribute: "archived", value: boolean }
    | { form: Form, attribute: "deleted", value: boolean }
    | { form: Form, attribute: "name", value: string }