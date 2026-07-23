import React, {FC, useState} from "react"
import { LabelProps } from "@/types/inputs"
import { Spinner } from "@/components/ui/spinner"
import { Item } from "@/types/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const InputLabel: FC<LabelProps> = ({label, description, required}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="h-8 flex items-center text-sm font-normal">
                {label} <span className="text-destructive">{ required ? "*":""}</span>
            </div>
            {description && (
                <div className="h-8 flex items-center text-xs text-muted-foreground">
                    {description}
                </div>
            )}
        </div>
    )
}

interface EditableTextProps {
    id: string
    value: string
    placeholder: string
    onChange: (value: string) => void
    onBlur: (value: string) => void
    className?: string
    autofocus?: boolean
}

export const EditableText = ({id, value, placeholder, onChange, onBlur, className, autofocus = false}: EditableTextProps) => {
    return (
        <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            className={cn(
                "h-8 border-0 border-b rounded-none p-0 shadow-none text-sm font-normal",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:border-b",
                className
            )}
            onBlur={e => onBlur(e.target.value)}
            onChange={e => onChange(e.target.value)}
            autoFocus={autofocus}
        />
    )
}

interface EditableProps {
    item: Item
    onBlur: (value: string) => void
}

export const EditableLabel = ({item, onBlur}: EditableProps) => {
    const [label, setLabel] = useState<string>(item.label)

    return (
        <EditableText
            id={`${item.id}_label`}
            value={label}
            placeholder={label}
            onChange={setLabel}
            onBlur={setLabel}
            autofocus={true}
        />
    )
}

export const EditableDescription = ({ item, onBlur}: EditableProps) => {
    const [description, setDescription] = useState<string>(item.description ?? "")

    return (
        <EditableText 
            id={`${item.id}_description`}
            value={description}
            placeholder="Description (optional)"
            onChange={setDescription}
            onBlur={setDescription}
            className="border-0 !text-xs italic text-muted-foreground focus:border-none"
        />
    )
}

interface ThinkingProps {
    step?: string
}

export const Thinking = ({ step }: ThinkingProps) => {
    return (
        <div className="sticky flex flex-row gap-2 self-end">
            <Spinner />
            <div>{step ?? "Thinking..."}</div>
        </div>
    )
}