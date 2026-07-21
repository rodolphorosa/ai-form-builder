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
    CHECKBOX: "checkbox"
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
}

export type Validation = Partial<ValidationRules>

type OptionValue = string | number | boolean

export interface Option<T extends OptionValue = string> {
    value: T
    label: string
}

interface ComponentBase {
    id: string
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
    label: string
    items: Item[]
}

export interface FormSchema {
    title: string
    sections: Section[]
    projectId?: string
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
    createdAt: number
    updatedAt: number
    fixed: boolean
    archived: boolean
}
