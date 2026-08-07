import { Item, Option, Path } from "./form";

export interface InputProps {
    item: Item
    editable?: boolean
    onChange?: (path: Path, value: string | Option | Option[]) => void
    onChangeLabel?: (value: string) => void
}

export interface LabelProps {
    label: string,
    description?: string,
    required?: boolean
}

export type State = "visible" | "required" | "disabled"