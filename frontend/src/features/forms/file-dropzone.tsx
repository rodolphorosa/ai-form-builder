'use client'

import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { ChangeEvent, ComponentType, DragEvent, useRef } from "react"

interface Props {
    accept: string
    onFileSelect: (file: File) => void
    dropIcon?: LucideIcon
    dropText?: string
    selectText?: string
}

export default function FileDropzone({ 
    accept, 
    onFileSelect, 
    dropIcon, 
    dropText, 
    selectText 
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    
    const IconComponent = dropIcon

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        
        if (!file) return

        onFileSelect(file)
        
        e.target.value = ""
    }

    function handleOnDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        
        const file = e.dataTransfer.files[0]

        if (!file) return

        onFileSelect(file)
    }


    return (
        <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleOnDrop}
            className="
                flex 
                flex-col 
                items-center 
                p-8
                gap-2 
                rounded-lg 
                border-2 
                border-dashed
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    font-normal 
                    text-sm 
                    items-center
                "
            >
                <div 
                    className="
                        flex 
                        flex-col 
                        gap-2 
                        items-center
                    "
                >
                    {IconComponent && <IconComponent className="h-6 w-6 shrink-0"/>}
                    <span className="font-medium">
                        {dropText ?? "Drop file here"}
                    </span>
                </div>
                
                <span className="text-muted-foreground">
                    Or
                </span>

                <Button
                    type="button"
                    className="w-fit"
                    onClick={() => inputRef.current?.click()}
                >
                    {selectText ?? "Select file"}
                </Button>
            
            </div>
            <input 
                ref={inputRef}
                hidden
                type="file"
                accept={accept}
                onChange={handleOnChange}
            />
        </div>
    )
}
