import { Separator } from "@/components/ui/separator"
import { Astroid, Bot, BriefcaseBusiness, Check, GraduationCap, Maximize, Minimize, ShoppingCart, Sparkles, X } from "lucide-react"
import { RefObject, useEffect, useRef, useState } from "react"
import { PromptArea } from "../prompt-area"
import { Form, FormSchema } from "../../types/form"
import { formService } from "../../api/form.service"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChatMode } from "@/types/ai"
import { Message } from "@/types/chat"
import { TextMessage, ThinkingMessage } from "./messages"

interface ChatProps {
    mode: ChatMode
    setMode: (mode: ChatMode) => void
    form: Form | null
    onFormCreate: (form: Form) => void
    onFormChange: (form: Partial<Form>) => void
    onSchemaChange: (schema: FormSchema) => void
    promptRef?: RefObject<HTMLTextAreaElement | null> | null
    loading?: boolean
    setLoading?: (loading: boolean) => void
}

const EmptyChat = ({ onCreate }: { onCreate?: (prompt: string) => void }) => {
    return (
        <div className="flex flex-col gap-4 text-sm m-auto">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center justify-center w-full">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span className="font-medium">Vamos criar algo incrível?</span>
                </div>
                <span className="text-center text-muted-foreground">
                    Descreva o formulário que você precisa e eu vou ajudar a criar a estrutura.
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="">Experimente:</span>
                <div className="flex flex-col gap-1 text-muted-foreground">
                    <button 
                        className="flex flex-row gap-1 items-start text-left hover:text-foreground transition-colors cursor-pointer" 
                        onClick={() => onCreate?.("Crie um formulário de cadastro de funcionários.")}
                    >
                        <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                        <span>Crie um formulário de cadastro de funcionários.</span>
                    </button>
                    <button 
                        className="flex flex-row gap-1 items-start text-left hover:text-foreground transition-colors cursor-pointer"
                        onClick={() => onCreate?.("Crie um formulário de pedido de orçamento.")}
                    >
                        <ShoppingCart className="h-4 w-4 shrink-0" />
                        Crie um formulário de pedido de orçamento.
                    </button>
                    <button 
                        className="flex flex-row gap-1 items-start text-left hover:text-foreground transition-colors cursor-pointer"
                        onClick={() => onCreate?.("Crie um formulário de inscrição em um curso.")}
                    >
                        <GraduationCap className="h-4 w-4 shrink-0" />
                        Crie um formulário de inscrição em um curso.
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Chat = ({ 
    mode, 
    setMode, 
    form, 
    onFormCreate, 
    onFormChange,
    onSchemaChange, 
    promptRef, 
    loading, 
    setLoading 
}: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    
    const scrollRef = useRef<HTMLDivElement>(null)

    const getConversation = async () => {
        try {
            
            if(!form) return
            
            const response = await formService.getConversation(form?.id)

            setMessages(response.data.messages)
        
        } catch(err) {

        }
    }

    useEffect(() => {
        getConversation()
    }, [form])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages])

    const renderMessageStrategy = (message: Message) => {
        switch(message.type) {
            case "text":
                return <TextMessage message={message} />
            case "thinking":
                return <ThinkingMessage message={message} />
            default:
                return <TextMessage message={message} />
        }
    }

    const renderMessage = (message: Message) => {
        const isUser = message.role === "user";

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
                        {renderMessageStrategy(message)}
                    </div>
                </div>
            </div>
        )
    }

    const createForm = async (prompt: string) => {
        setLoading?.(true)
        
        try {
            const { data } = await formService.createWithAI({
                prompt: prompt,
                provider: "openai",
                model: "gpt-4.1-nano"
            })

            onFormCreate(data.form)
            setMessages(prev => [
                ...prev, 
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: data.message,
                    type: "text"
                }
            ])
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading?.(false)
        }
    }

    const editForm = async (prompt: string) => {
        if(!form) return

        setLoading?.(true)
        
        try {
            const { data } = await formService.edit({
                prompt: prompt,
                form: form,
                provider: "openai",
                model: "gpt-4.1-nano"
            })

            setMessages(prev => [
                ...prev, 
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: data.message,
                    type: "text"
                }
            ])

            onFormChange(data.form)

        } catch (error) {
            console.log("Failed to edit form", error)
        } finally {
            setLoading?.(false)
        }
    }

    const onSelectPrompt = (prompt: string) => {

        setMessages(prev => [
            ...prev,
            { 
                id: crypto.randomUUID(), 
                role: "user", 
                content: prompt, 
                type: "text" 
            }
        ])

        createForm(prompt)
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
                    <div className="flex flex-col gap-6">
                        {messages.length == 0 && <EmptyChat onCreate={(prompt) => onSelectPrompt(prompt)} />}
                        {messages.length > 0 && messages.map(message => renderMessage(message))}
                        {loading && renderMessage({
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: form ? "Editing your form..." : "Creating form...",
                            type: "thinking"
                        })}
                        <div ref={scrollRef} />
                    </div>
                </div>
                <div className="relative border-t rounded-b-4xl bg-background/80 backdrop-blur-xl ">
                    <div 
                        className="
                            pointer-events-none 
                            absolute 
                            -top-14 
                            left-0 
                            right-0 
                            h-14 
                            bg-gradient-to-t 
                            from-background 
                            via-background/70 
                            to-transparent" 
                        />
                    <div className="p-4">
                        <PromptArea 
                            onChat={(message) => {
                                setMessages(prev => [
                                    ...prev,
                                    { 
                                        id: crypto.randomUUID(), 
                                        role: "user", 
                                        content: message, 
                                        type: "text" 
                                    }
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
