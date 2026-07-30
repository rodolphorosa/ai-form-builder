import React, {FC, useState} from "react"
import { LabelProps } from "@/types/inputs"
import { Spinner } from "@/components/ui/spinner"
import { Item } from "@/types/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Brain } from "lucide-react"

interface EditableTextProps {
    text?: string
    editable?: boolean
    className?: string
    placeholder?: string
    onChange?: (value: string) => void
}

export function EditableText({
    text,
    editable,
    className,
    placeholder,
    onChange
}: EditableTextProps) {
    return (
        <span
            contentEditable={editable}
            suppressContentEditableWarning
            suppressHydrationWarning
            onBlur={(e) => {
                const value = e.currentTarget.textContent?.trim()

                if (!value) {
                    e.currentTarget.textContent = placeholder ?? ""
                    onChange?.(placeholder ?? "")
                    return
                }

                onChange?.(value)
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    e.currentTarget.blur()
                }
            }}
            className={cn(
                "py-1 border-b border-transparent outline-none",
                editable && "cursor-text focus:border-ring",
                className
            )}
            
        >
            {text?.trim() || placeholder || ""}
        </span>
    )
}


export const EditableLabel = ({label, required, editable, onChange}: {
    label: string
    required: boolean
    editable?: boolean
    onChange?: (value: string) => void
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center text-sm font-normal">
                <EditableText text={label} placeholder="Untitled" editable={editable} onChange={onChange} />
                { required && <span className="text-destructive">*</span> }
            </div>
        </div>
    )
}

interface ThinkingProps {
    step?: string
}

export const Thinking = ({ step }: ThinkingProps) => {
    return (
        <div className="sticky flex flex-row gap-2 self-end">
            <Spinner className="h-4 w-4 shrink-0" />
            <div className="animate-pulse">{step ?? "Thinking..."}</div>
        </div>
    )
}
