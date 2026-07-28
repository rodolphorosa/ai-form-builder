import { Item } from "./form";

export interface InputProps {
    item: Item
    editable?: boolean
    onChange?: (value: string) => void
}

export interface LabelProps {
    label: string,
    description?: string,
    required?: boolean
}

export type State = "visible" | "required" | "disabled"