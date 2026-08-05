import { Button } from "@/components/ui/button"
import { Message, SuggestionStatus } from "@/types/chat"
import { X, Check, CheckCheck, Hourglass, RotateCw } from "lucide-react"
import { Thinking } from "../inputs/common"

export const TextMessage = ({ message }: {message: Message}) => {
    return (
        <div className="text-sm">
            {message.content}
        </div>
    )
}

export const ThinkingMessage = ({ message}: {message: Message}) => {
    return <Thinking step={message.content} />
}