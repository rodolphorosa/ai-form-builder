"use client"

import {FC, useRef, useState} from "react"
import { Form, FormSchema, SectionItem } from "../types/form"
import { FormRenderer } from "./form/form"
import { Header } from "./header"
import { TreeMenu } from "./menus/tree"
import { Chat } from "./chat/chat"
import { FormSkeleton } from "./form/skeleton"
import { ChatMode } from "@/types/ai"
import { Canvas } from "./form/canvas"
import { FormHistory } from "@/types/builder"

interface BuilderProps {
}

export const Builder = ({}: BuilderProps) => {
    const [committedForm, setCommitForm] = useState<Form | null>(null)

    const [workingForm, setWorkingForm] = useState<Form | null>(null)

    const [history, setHistory] = useState<FormHistory<Form>>({
        past: [],
        future: []
    })
    
    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const promptRef = useRef<HTMLTextAreaElement>(null)

    const [chatMode, setChatMode] = useState<ChatMode>("card")
    const [renderMode, setRenderMode] = useState<"edit" | "preview">("preview")

    const isChatExpanded = chatMode === "sidebar"

    const onSchemaChange = (schema: FormSchema) => {
        const previous = workingForm
        
        setWorkingForm(prev => {
            if (!prev) return null

            return {
                ...prev,
                schema
            }
        })

        previous && setHistory(prev => ({
            ...prev,
            past: [...prev.past, previous],
            future: []
        }))
    }

    const undo = () => {
        if (!workingForm || history.past.length == 0) return
        
        const past = [...history.past]
        const future = [...history.future]

        const previous = past.pop()!
        const next = workingForm

        setHistory({
            past: past,
            future: [...future, next]
        })

        setWorkingForm(previous)
    }

    const redo = () => {
        if(!workingForm || history.future.length == 0) return 

        const past = [...history.past]
        const future = [...history.future]

        const next = future.pop()!
        past.push(workingForm)

        setHistory({
            past: past,
            future: future
        })

        setWorkingForm(next)
    }

    const toggleMode = () => {
        if (renderMode == "edit") {
            setRenderMode("preview")
        } else {
            setRenderMode("edit")
        }
    }

    const undoDisabled = history.past.length == 0
    const redoDisabled = history.future.length == 0

    return (
        
        <div className="flex flex-row h-screen overflow-hidden">
            { isChatExpanded ? (
                <>
                    <div className="h-full w-150">
                        <TreeMenu schema={workingForm?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>

                    <div className="flex flex-col h-full w-full">
                        <Header 
                            undo={undo} 
                            redo={redo} 
                            undoDisabled={undoDisabled} 
                            redoDisabled={redoDisabled} 
                            mode={renderMode} 
                            toggleMode={toggleMode} 
                        />
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 w-[85%] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && workingForm && renderMode === "edit" && <Canvas form={workingForm} />}
                                {!loading && workingForm && renderMode === "preview" && <FormRenderer form={workingForm} />}
                                {/* <FormSkeleton /> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-full w-150">
                        <Chat 
                            mode={chatMode}
                            setMode={setChatMode}
                            form={workingForm}
                            onFormCreate={(form) => {
                                setCommitForm(form)
                                setWorkingForm(form)
                            }}
                            onSchemaChange={(schema) => onSchemaChange(schema)}
                            promptRef={promptRef}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="h-full w-100">
                        <TreeMenu schema={workingForm?.schema ?? {} as FormSchema} selectItem={setSelectedItem} selectedItem={selectedItem}/>
                    </div>
                    
                    <div className="flex flex-col h-full w-full">
                        <Header 
                            undo={undo} 
                            redo={redo} 
                            undoDisabled={undoDisabled} 
                            redoDisabled={redoDisabled} 
                            mode={renderMode} 
                            toggleMode={toggleMode} 
                        />
                        <div className="flex-1 w-full overflow-y-auto">
                            <div className="p-8 w-[65%] mx-auto">
                                {loading && <FormSkeleton />}
                                {!loading && workingForm && renderMode === "edit" && <Canvas form={workingForm} />}
                                {!loading && workingForm && renderMode === "preview" && <FormRenderer form={workingForm} />}
                                {/* <FormSkeleton /> */}
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute right-8 bottom-8">
                        <Chat 
                            mode={chatMode}
                            setMode={setChatMode}
                            form={workingForm}
                            onFormCreate={(form) => {
                                setCommitForm(form)
                                setWorkingForm(form)
                            }}
                            onSchemaChange={(schema) => onSchemaChange(schema)}
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
