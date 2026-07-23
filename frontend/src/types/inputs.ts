import { Item } from "./form";

export interface InputProps {
    item: Item
    editable?: boolean
}

export interface LabelProps {
    label: string,
    description?: string,
    required?: boolean
}

export type State = "visible" | "required" | "disabled"