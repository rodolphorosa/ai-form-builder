"use client"

import React, {FC, useEffect, useRef, useState} from "react"
import { Form, FormSchema, SectionItem } from "../types/form"
import { Form as FormComponent } from "./form/form"
import { Header } from "./header"
import { TreeMenu } from "./menus/tree"
import { Chat } from "./chat/chat"
import { EmptyRenderer } from "./form/empty"
import { FormSkeleton } from "./form/skeleton"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMode } from "@/types/ai"
import { mockSchemas } from "./mock"
import { Canvas } from "./form/canvas"
import { formService } from "@/api/form.service"
import { projectService } from "@/api/project.service"

interface BuilderProps {
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [form, setForm] = useState<Form | null>(null)
    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const promptRef = useRef<HTMLTextAreaElement>(null)

    const [mode, setMode] = useState<ChatMode>("bubble")

    const isChatExpanded = mode === "sidebar"

    return (
        
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            { isChatExpanded ? (
                <>
                    <div className="h-full w-150">
                        <TreeMenu schema={form?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>

                    <div className="flex flex-col h-full w-full">
                        <Header />
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 w-[85%] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && form && <Canvas form={form} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-full w-150">
                        <Chat 
                            mode={mode}
                            setMode={setMode}
                            form={form}
                            onFormCreate={(form) => setForm(form)}
                            onSchemaChange={(schema) => console.log(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="h-full w-100">
                        <TreeMenu schema={form?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>
                    
                    <div className="flex flex-col h-full w-full">
                        <Header />
                        <div className="flex-1 w-full overflow-y-auto">
                            <div className="p-8 w-[65%] mx-auto">
                                {loading && <FormSkeleton />}
                                {/* {!loading && localSchema && <Form schema={localSchema} selectedItem={selectedItem} />} */}
                                {!loading && form && <Canvas form={form} />}
                            </div>
                        </div>
                    </div>
                    
                    <div className="fixed right-8 bottom-8">
                        <Chat 
                            mode={mode}
                            setMode={setMode}
                            form={form}
                            onFormCreate={(form) => setForm(form)}
                            onSchemaChange={(schema) => console.log(schema)}
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
