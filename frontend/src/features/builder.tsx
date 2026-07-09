"use client"

import React, {FC, useEffect, useState} from "react"
import { FormSchema, SectionItem } from "../types/form"
import { Renderer } from "./renderer"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Send, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Thinking } from "./inputs/common"
import { Header } from "./header"
import { PropertiesMenu } from "./propertiesMenu"
import { StructureMenu } from "./structureMenu"

interface BuilderProps {
    // schema: FormSchema
}

export const Builder: FC<BuilderProps> = ({}) => {
    const [schema, setSchema] = useState<FormSchema | null>(null)
    const [description, setDescription] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    const [selectedItem, setSelectedItem] = useState<SectionItem|null>(null)

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
                    provider: "openai"
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


    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="h-full grid grid-cols-[1fr_2fr_1fr] min-h-0 flex-1">
                <StructureMenu schema={schema} selectItem={setSelectedItem} />
                <div className="h-full flex flex-col gap-6 px-8 py-4">
                    <div className="p-8 rounded-xl border border-border bg-background shadow-sm overflow-y-auto">
                        {schema && <Renderer schema={schema} />}
                        {loading && <Thinking />}
                    </div>
                    <div className="flex flex-row items-start gap-3 p-4 w-full rounded-xl border border-border bg-background shadow-sm">
                        <Sparkles />
                        <div className="flex flex-col flex-1 min-h-0">
                            <div>Describe the form you want...</div>
                            <Textarea 
                                className="
                                    h-16
                                    resize-none 
                                    overflow-y-auto 
                                    border-0 
                                    shadow-none 
                                    focus-visible:ring-0 
                                    focus-visible:border-0 
                                    px-0"
                                id="form-description-prompt"
                                minLength={50}
                                maxLength={2000}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Example: Create a customer registration form with name, email, phone and address."
                            />
                        </div>
                        <div className="mt-1 flex justify-end text-xs text-muted-foreground self-end">
                            {description.length}/2000
                        </div>
                        <Button 
                            className="self-end" type="button"
                            onClick={generateForm}
                        >
                            <Send />
                            Generate
                        </Button>
                    </div>
                </div>
                <PropertiesMenu item={selectedItem} />
            </div>
        </div>
    )
}