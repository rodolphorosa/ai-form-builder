import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Separator } from "@/components/ui/separator"
import { Astroid, Bot } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { PromptArea } from "./promptArea"
import { FormSchema } from "../types/form"
import { Thinking } from "./inputs/common"

interface ChatProps {
    schema: FormSchema | null
    onSchemaChange: (schema: FormSchema | null) => void
}

interface Message {
    user: "user" | "model"
    content: string | React.ReactElement
}


export const Chat = ({ schema, onSchemaChange }: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages])

    const renderMessage = (message: Message) => {
        const align = message.user ===  "user" ? "end" : "start"
        const variant = message.user === "user" ? "default" : "muted"

        return (
            <Bubble align={align} variant={variant}>
                <BubbleContent className="flex flex-col gap-1">
                    {message.user === "model" && <Bot />}
                    {message.content}
                </BubbleContent>
            </Bubble>
        )
    }

    const generateForm = async (prompt: string) => {
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
                        prompt: prompt,
                        provider: "openai",
                        model: "gpt-4.1-nano"
                    }),
                }
            );

            const data = await response.json();
            onSchemaChange(data?.data?.schema?? null);

            const message: Message = {
                user: "model",
                content: data?.data?.message ?? "Schema created"
            }

            setMessages(prev => [
                ...prev, message
            ])

        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading(false)
        }
    }

    const editForm = async (prompt: string) => {
        setLoading(true)
        
        try {
            const response = await fetch("/api/edit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    schema: JSON.stringify(schema),
                    provider: "openai",
                    model: "gpt-4.1-nano"
                })
            })

            const data = await response.json();
            onSchemaChange(data?.data?.schema?? null);

            const message: Message = {
                user: "model",
                content: data?.data?.message ?? "Schema edited"
            }

            setMessages(prev => [
                ...prev, message
            ])
        
        } catch (error) {
            console.log("Failed to edit form", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full flex flex-col overflow-hidden border-l">
            <div className="flex flex-row gap-2 p-4">
                <Astroid />
                <div className="text-base font-normal">AI Assistant</div>
            </div>
            <Separator />
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col justify-end gap-2">
                    {messages.map(message => renderMessage(message))}
                    {loading && renderMessage({
                        user: "model",
                        content: <Thinking step={ schema ? "Editing your form..." : "Creating form..."} />
                    })}
                    <div ref={scrollRef} />
                </div>
            </div>
            <div className="border-t p-4">
                <PromptArea 
                    onChat={(message) => {
                        setMessages(prev => [
                            ...prev,
                            { user: "user", content: message}
                        ])

                        if (schema) {
                            editForm(message)
                        } else {
                            generateForm(message)
                        }
                    }} 
                    promptRef={null}
                />
            </div>
        </div>
    )
}
