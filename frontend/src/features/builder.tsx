"use client"

import React, {FC, useEffect, useRef, useState} from "react"
import { FormSchema, SectionItem } from "../types/form"
import { Form } from "./form/form"
import { Header } from "./header"
import { TreeMenu } from "./menus/tree"
import { Chat } from "./chat/chat"
import { EmptyRenderer } from "./form/empty"
import { FormSkeleton } from "./form/skeleton"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMode } from "@/types/ai"

interface BuilderProps {}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)
    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const promptRef = useRef<HTMLTextAreaElement>(null)

    const [mode, setMode] = useState<ChatMode>("bubble")

    console.log(selectedItem)

    const isChatExpanded = mode === "sidebar"

    return (
        
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            { isChatExpanded ? (
                <>
                    <div className="h-full w-150">
                        <TreeMenu schema={schema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>

                    <div className="flex flex-col h-full w-full">
                        <Header />
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 w-[85%] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && schema && <Form schema={schema} selectedItem={selectedItem} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-full w-150">
                        <Chat 
                            mode={mode}
                            setMode={setMode}
                            schema={schema}
                            onSchemaChange={(schema) => setSchema(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="h-full w-100">
                        <TreeMenu schema={schema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>
                    
                    <div className="flex flex-col h-full w-full">
                        <Header />
                        <div className="flex-1 w-full overflow-y-auto">
                            <div className="p-8 w-[65%] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && schema && <Form schema={schema} selectedItem={selectedItem} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="fixed right-8 bottom-8">
                        <Chat 
                            mode={mode}
                            setMode={setMode}
                            schema={schema}
                            onSchemaChange={(schema) => setSchema(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
