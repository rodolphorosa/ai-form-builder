import React, {FC, useEffect, useRef, useState} from "react"
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
    const initialValue = useRef("")

    return (
        <span
            contentEditable={editable}
            suppressContentEditableWarning
            suppressHydrationWarning
            onFocus={(e) => {
                initialValue.current = e.currentTarget.textContent ?? ""
            }}
            onBlur={(e) => {
                const value = e.currentTarget.textContent?.trim() ?? ""

                if (value === initialValue.current.trim()) {
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

export const TypingText = ({ text }: { text: string }) => {
    const [typingText, setTypingText] = useState("")

    useEffect(() => {
        let index = 0

        const interval = setInterval(() => {
            setTypingText(text.slice(0, index + 1))
            index++

            if (index === text.length) {
                clearInterval(interval)
            }
        }, 50)

        return () => clearInterval(interval)
    }, [text])

    return <div>{typingText}</div>
}