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
}

export interface Group extends ComponentBase {
    type: "group"
    items: Item[]
}

export type SectionItem = Item | Group

export interface Section {
    id: string
    label: string
    items: SectionItem[]
}

export interface FormSchema {
    title: string
    sections: Section[]
}