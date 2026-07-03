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

type InputType = typeof InputTypes[keyof typeof InputTypes]

interface Ui {
    placeholder?: string,
}

interface Validation {
    minValue?: number,
    maxValue?: number,
    minLength?: number,
    maxLength?: number
}

interface Field {
    id: string,
    label: string,
    type: InputType,
    required: boolean,
    readonly: boolean,
    validation: Validation,
    options?: string[]
    ui?: Ui
}

interface Section {
    id: string,
    label: string,
    fields: Field[]
}

export interface FormSchema {
    title: string,
    sections: Section[]
}