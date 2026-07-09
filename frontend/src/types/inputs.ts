import { Item } from "./form";

export interface InputProps {
    item: Item
}

export interface LabelProps {
    label: string,
    description?: string,
    required?: boolean
}