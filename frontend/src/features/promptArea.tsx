"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ArrowUp, Paperclip } from "lucide-react"
import { RefObject, useState } from "react"

interface PromptAreaProps {
    onChat: (message: string) => void
    promptRef: RefObject<HTMLTextAreaElement | null> | null
}

export const PromptArea = ({
    onChat, promptRef
}: PromptAreaProps) => {
    const [prompt, setPrompt] = useState<string|null>("")

    return (
        <div className="
            flex flex-col 
            items-start gap-1 p-4 w-full 
            rounded-xl border border-border"
        >
            <div className="w-full self-end">
                <Textarea 
                    className={cn(
                        "!bg-transparent min-h-12 max-h-48 resize-none overflow-y-auto border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 px-0",
                        prompt?.length === 0
                        ? "h-12"
                        : "min-h-12 max-h-48"
                    )}
                    id="form-description-prompt"
                    ref={promptRef}
                    minLength={50}
                    maxLength={2000}
                    value={prompt ?? ""}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe the form you want"
                />
            </div>
            <div className="w-full flex flex-row justify-between self-end">
                <Button variant="ghost" size="icon">
                    <Paperclip />
                </Button>
                <div className="flex flex-row gap-2">
                    <div className="mt-1 flex justify-end text-xs text-muted-foreground self-end">
                        {prompt?.length}/2000
                    </div>
                    <Button 
                        className="self-end rounded-full" 
                        size="icon"
                        onClick={() => {
                            if(prompt && prompt.length > 0) {
                                onChat(prompt)
                                setPrompt("")
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
