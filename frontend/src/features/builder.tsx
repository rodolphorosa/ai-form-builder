"use client"

import React, {FC, useEffect, useRef, useState} from "react"
import { FormSchema, SectionItem } from "../types/form"
import { Renderer } from "./renderer"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { ArrowUp, Paperclip, Send, Sparkles } from "lucide-react"
import { Thinking } from "./inputs/common"
import { Header } from "./header"
import { PropertiesMenu } from "./propertiesMenu"
import { StructureMenu } from "./menus/structureMenu"
import { cn } from "@/lib/utils"
import { Chat } from "./chat"

interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)

    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)

    const promptRef = useRef<HTMLTextAreaElement>(null)

    const focusPrompt = () => {
        const promptArea = promptRef.current 

        if (!promptArea) return 

        promptArea.focus()

        promptArea.setSelectionRange(
            promptArea.value.length,
            promptArea.value.length
        )
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="h-full grid grid-cols-[1fr_2fr_1fr] min-h-0 flex-1 overflow-hidden">
                <StructureMenu schema={schema} selectItem={setSelectedItem} />
                <div className="h-full flex flex-col px-8 py-4 overflow-hidden">
                    <div className="p-8  overflow-y-auto h-full">
                        <Renderer schema={schema} selectedItem={selectedItem } onCreate={focusPrompt}/>
                    </div>
                </div>
                {/* <PropertiesMenu item={selectedItem} /> */}
                <Chat schema={schema} onSchemaChange={(schema) => setSchema(schema)} promptRef={promptRef} />
            </div>
        </div>
    )
}
