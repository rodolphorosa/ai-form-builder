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
import { StructureMenu } from "./structureMenu"
import { cn } from "@/lib/utils"
import { Chat } from "./chat"

interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)
    const [description, setDescription] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)

    const [provider, setProvider] = useState()
    const [model, setModel] = useState()

    const promptRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const settings = localStorage.getItem("settings")

        if(!settings) return

        const parsedSettings = JSON.parse(settings)

        setProvider(parsedSettings["provider"])
        setModel(parsedSettings["model"])
    
    }, [])


    const generateForm = async () => {
        setLoading(true)

        try {
            const response = await fetch(
                "/api/generate-form",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: description,
                        provider: provider ?? "openai",
                        model: model ?? "gpt-4.1-nano"
                    }),
                }
            );

            const data = await response.json();
            setSchema(data?.data?? null);

        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading(false)
        }
    }

    const editForm = async () => {
        setLoading(true)
        
        try {
            const response = await fetch("/api/edit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: description,
                    schema: JSON.stringify(schema),
                    provider: provider ?? "openai",
                    model: model ?? "gpt-4.1-nano"
                })
            })

            const data = await response.json();
            setSchema(data?.data?? null);
        
        } catch (error) {
            console.log("Failed to edit form", error)
        } finally {
            setLoading(false)
        }
    }

    const focusPrompt = () => {
        const promptArea = promptRef.current 

        if (!promptArea) return 

        promptArea.focus()

        promptArea.setSelectionRange(
            promptArea.value.length,
            promptArea.value.length
        )
    }

    const renderPromptArea = () => {
        return (
            <div className="
                flex flex-col 
                items-start gap-1 p-4 w-full 
                rounded-xl border border-border shadow-sm"
            >
                <div className="w-full self-end">
                    <Textarea 
                        className={cn(
                            "!bg-transparent min-h-12 max-h-48 resize-none overflow-y-auto border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 px-0",
                            description.length === 0
                            ? "h-12"
                            : "min-h-12 max-h-48"
                        )}
                        id="form-description-prompt"
                        ref={promptRef}
                        minLength={50}
                        maxLength={2000}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Describe the form you want"
                    />
                </div>
                <div className="w-full flex flex-row justify-between self-end">
                    <Button variant="ghost" size="icon">
                        <Paperclip />
                    </Button>
                    <div className="flex flex-row gap-2">
                        <div className="mt-1 flex justify-end text-xs text-muted-foreground self-end">
                            {description.length}/2000
                        </div>
                        <Button 
                            className="self-end rounded-full" 
                            size="icon"
                            onClick={() => {
                                if(schema) {
                                    editForm()
                                } else {
                                    generateForm()
                                }
                            }}
                        >
                            <ArrowUp />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="h-full grid grid-cols-[1fr_2fr_1fr] min-h-0 flex-1 overflow-hidden">
                <StructureMenu schema={schema} selectItem={setSelectedItem} />
                <div className="h-full flex flex-col px-8 py-4 overflow-hidden">
                    <div className="p-8  overflow-y-auto h-full">
                        {<Renderer schema={schema} selectedItem={selectedItem } onCreate={focusPrompt}/>}
                        {loading && <Thinking />}
                    </div>
                    {/* {schema && (
                        <div className="p-4 overflow-y-auto h-full">
                            {<Renderer schema={schema} selectedItem={selectedItem } onCreate={focusPrompt}/>}
                            {loading && <Thinking />}
                        </div>
                    )} */}
                    {/* <div className="m-auto w-full text-center">
                        {(!loading && !schema) && <div className="text-3xl p-4">Describe your form</div>}
                        {renderPromptArea()}
                    </div> */}
                </div>
                {/* <PropertiesMenu item={selectedItem} /> */}
                <Chat schema={schema} onSchemaChange={(schema) => setSchema(schema)} />
            </div>
        </div>
    )
}
