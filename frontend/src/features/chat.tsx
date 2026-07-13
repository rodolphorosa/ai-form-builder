import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Separator } from "@/components/ui/separator"
import { Astroid, Bot } from "lucide-react"
import { RefObject, useEffect, useRef, useState } from "react"
import { PromptArea } from "./promptArea"
import { FormSchema } from "../types/form"
import { Thinking } from "./inputs/common"
import { formService } from "../api/form"
import { ApiFormResponse } from "../api/types"

interface ChatProps {
    schema: FormSchema | null
    onSchemaChange: (schema: FormSchema | null) => void
    promptRef?: RefObject<HTMLTextAreaElement | null> | null
}

interface Message {
    user: "user" | "model"
    content: string | React.ReactElement
}


export const Chat = ({ schema, onSchemaChange, promptRef }: ChatProps) => {
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

    const handleResponseData = (data: ApiFormResponse["data"]) => {
        onSchemaChange(data.schema)
        setMessages(prev => [
            ...prev, 
            {
                user: "model",
                content: data.message
            }
        ])
    }

    const createForm = async (prompt: string) => {
        setLoading(true)
        
        try {
            const { data } = await formService.createForm({
                prompt: prompt,
                provider: "gemini",
                model: "gemini-2.5-flash"
            })
            handleResponseData(data)
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading(false)
        }
    }

    const editForm = async (prompt: string) => {
        if(!schema) return

        setLoading(true)
        
        try {
            const { data } = await formService.editForm({
                prompt: prompt,
                schema: schema,
                provider: "gemini",
                model: "gemini-2.5-flash"
            })
            handleResponseData(data)
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
                            createForm(message)
                        }
                    }} 
                    promptRef={promptRef ?? null}
                />
            </div>
        </div>
    )
}
