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

export interface Field {
    id: string
    label: string
    type: InputType
    required: boolean
    disabled: boolean
    description: string
    validation?: Validation
    options?: string[]
    ui?: Ui
}

export interface Section {
    id: string
    label: string
    fields: Field[]
}

export interface FormSchema {
    title: string
    sections: Section[]
}