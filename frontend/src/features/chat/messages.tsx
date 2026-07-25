import { Button } from "@/components/ui/button"
import { Message, SuggestionStatus } from "@/types/chat"
import { X, Check, CheckCheck, Hourglass, RotateCw } from "lucide-react"
import { Thinking } from "../inputs/common"

interface Props {
    message: Message
    onApply: () => void
    onDiscard: () => void
}
 
export const SuggestionMessage = ({message, onApply, onDiscard}: Props) => {
    const status = message.suggestion?.status
    
    return (
        <div className="flex flex-col gap-2">
            <span>{message.text}</span>
            
            {status === "pending" && (
                <div className="flex flex-row gap-0.5">
                    <Button variant="ghost" onClick={onDiscard}>
                        <X className="h-4 w-4 shrink-0"/>
                        <span className="text-xs font-normal">Discard</span>
                    </Button>
                    <Button variant="ghost" onClick={onApply}>
                        <Check className="h-4 w-4 shrink-0"/>
                        <span className="text-xs font-normal">Apply</span>
                    </Button>
                </div>
            )}

            {status === "applied" && (
                <div className="flex flex-row gap-1">
                    <CheckCheck className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-normal">Applied</span>
                </div>
            )}

            {status === "discarded" && (
                <div className="flex flex-row gap-1">
                    <X className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-normal">Discarded</span>
                </div>
            )}

            {status === "expired" && (
                <div className="flex flex-row gap-1">
                    <Hourglass className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-normal">Expired</span>
                </div>
            )}
        
        </div>
    )
}

export const TextMessage = ({ message }: {message: Message}) => {
    return (
        <div className="text-sm">
            {message.text}
        </div>
    )
}

export const ThinkingMessage = ({ message}: {message: Message}) => {
    return <Thinking step={message.text} />
}