import { Separator } from "@/components/ui/separator"
import { Astroid, Bot, Maximize, Minimize, Sparkles, X } from "lucide-react"
import { RefObject, useEffect, useRef, useState } from "react"
import { PromptArea } from "../promptArea"
import { Form, FormSchema } from "../../types/form"
import { Thinking } from "../inputs/common"
import { formService } from "../../api/form.service"
import { ApiFormResponse } from "../../api/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChatMode } from "@/types/ai"

interface ChatProps {
    mode: ChatMode
    setMode: (mode: ChatMode) => void
    form: Form | null
    onFormCreate: (form: Form | null) => void
    onSchemaChange: (schema: FormSchema | null) => void
    promptRef?: RefObject<HTMLTextAreaElement | null> | null
    loading?: boolean
    setLoading?: (loading: boolean) => void
}

interface Message {
    user: "user" | "model"
    content: string | React.ReactElement
}

export const Chat = ({ mode, setMode, form, onFormCreate, onSchemaChange, promptRef, loading, setLoading }: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    // const [loading, setLoading] = useState<boolean>(false)
    
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages])

    const renderMessage = (message: Message) => {
        const isUser = message.user === "user";

        return (
            <div
                className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start"
                )}
            >
                <div
                    className={cn(
                    "max-w-[80%] rounded-3xl",
                    isUser
                        ? "bg-muted p-3"
                        : "bg-transparent"
                    )}
                >
                    <div className="text-sm">
                        {message.content}
                    </div>
                </div>
            </div>
        );
    };

    const handleResponseData = (data: ApiFormResponse["data"]) => {
        // @ts-ignore
        // onSchemaChange(data.form.schema)
        onFormChange
        setMessages(prev => [
            ...prev, 
            {
                user: "model",
                // @ts-ignore
                content: data.message
            }
        ])
    }

    const createForm = async (prompt: string) => {
        setLoading?.(true)
        
        try {
            const { data } = await formService.createForm({
                prompt: prompt,
                provider: "openai",
                model: "gpt-4.1-nano"
            })
            // handleResponseData(data)

            onFormCreate(data.form)
            setMessages(prev => [
                ...prev, 
                {
                    user: "model",
                    // @ts-ignore
                    content: data.message
                }
            ])
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading?.(false)
        }
    }

    const editForm = async (prompt: string) => {
        // if(!schema) return

        // setLoading?.(true)
        
        // try {
        //     const { data } = await formService.editForm({
        //         prompt: prompt,
        //         schema: schema,
        //         provider: "openai",
        //         model: "gpt-4.1-nano"
        //     })
        //     handleResponseData(data)
        // } catch (error) {
        //     console.log("Failed to edit form", error)
        // } finally {
        //     setLoading?.(false)
        // }
    }

    const renderChatHeader = () => {
        return (
            <div className="flex flex-row items-center justify-between p-4 h-14">
                <div className="flex flex-row items-center gap-2 text-sm font-medium">
                    <Astroid className="h-4 w-4"/>
                    <div>AI Assistant</div>
                </div>
                <div className="flex flex-row gap-1">
                    {mode == "card" && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full p-2"
                            onClick={() => setMode("sidebar")}
                        >
                            <Maximize />
                        </Button>
                    )}
                    {mode == "sidebar" && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full p-2"
                            onClick={() => setMode("card")}
                        >
                            <Minimize />
                        </Button>
                    )}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full p-2"
                        onClick={() => setMode("bubble")}
                    >
                        <X />
                    </Button>
                </div>
            </div>
        )
    }

    const renderChat = () => {
        const chat = (
            <>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col justify-end gap-6">
                        {messages.map(message => renderMessage(message))}
                        {loading && renderMessage({
                            user: "model",
                            content: <Thinking step={ form ? "Editing your form..." : "Creating form..."} />
                        })}
                        <div ref={scrollRef} />
                    </div>
                </div>
                <div className="relative border-t rounded-b-4xl bg-background/80 backdrop-blur-xl ">
                    <div className="pointer-events-none absolute -top-14 left-0 right-0 h-14 bg-gradient-to-t from-background via-background/70 to-transparent" />
                    <div className="p-4">
                        <PromptArea 
                            onChat={(message) => {
                                setMessages(prev => [
                                    ...prev,
                                    { user: "user", content: message}
                                ])

                                if (form) {
                                    editForm(message)
                                } else {
                                    createForm(message)
                                }
                            }} 
                            promptRef={promptRef ?? null}
                            placeholder={form ? "chat-edit": "chat-create"}
                        />
                    </div>
                </div>
            </>
        )


        if (mode === "sidebar") {
            return (
                <div className="h-full flex flex-col border-l bg-card overflow-hidden">
                    {renderChatHeader()}
                    <Separator />
                    {chat}
                </div>
            )
        }

        return (
            <div className="w-100 h-150 bg-card rounded-4xl border shadow-sm">
                <div className="h-full flex flex-col overflow-hidden">
                    {renderChatHeader()}
                    <Separator />
                    {chat}
                </div>
            </div>
        )
    }

    const renderBubble = () => {
        return (
            <div 
                className="rounded-full border bg-card shadow-sm p-6 cursor-pointer"
                onClick={() => setMode("card")}
            >
                <Astroid />
            </div>
        )
    }

    return mode === "bubble" ? renderBubble() : renderChat()
}
