
import { Separator } from "@/components/ui/separator";
import { Check, CheckCheck, ChevronLeft, CircleMinus, CirclePlus, Lamp, Lightbulb, Pencil, Plus, Replace, Sparkle, Sparkles, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { propertyNames } from "../../registry";
import { Button } from "@/components/ui/button";
import { Suggestion, Change } from "@/types/ai";
import { Option } from "@/types/form"
import { isArray } from "lodash";

interface SuggestionProps {
    suggestion: Suggestion
    onApply?: () => void
    onDiscard?: () => void
    navigateBack?: () => void
}

export const SuggestionCard = ({ suggestion, onApply, onDiscard, navigateBack }: SuggestionProps) => {
    const parseValue = (value: string | number | boolean | Option) => {
        if (typeof value === "string" || typeof value === "number") {
            return value
        }

        if (typeof value === "boolean") {
            return value ? "yes" : "no"
        }

        return value.label
    }

    const parseProperty = (prop: string) => {
        const tokens = prop.split("/")
        return propertyNames[tokens[tokens.length - 1]] ?? "unknown"
    }

    const renderChange = (change: Change) => {
        switch (change.op) {
            case "add":
                return isArray(change.value) && change.value.map(it => (
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-green-500/10 text-green-800">
                            <CirclePlus className="h-4 w-4" />
                        </div>
                        <span>Add option{" "}</span>
                        <div className="rounded-lg p-2 bg-green-500/10 text-green-800 font-medium">{parseValue(it)}</div>
                    </div>
                ))
            case "remove":
                return isArray(change.value) && change.value.map(it => ((
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-red-600/10 text-red-600">
                            <CircleMinus className="h-4 w-4" />
                        </div>
                        <span>Remove option{" "}</span>
                        <div className="rounded-lg p-2 bg-red-600/10 text-red-600 font-medium">{parseValue(it)}</div>
                    </div>
                )))
            case "replace":
                return (
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-blue-600/10 text-blue-600">
                            <Replace className="h-4 w-4" />
                        </div>
                        <span>Apply{" "}</span>
                        <div className="rounded-lg p-2 bg-blue-500/10 text-blue-600 font-medium truncate">{parseValue(change.value)}</div>
                        <span>to{" "}</span>
                        <div className="rounded-lg p-2 bg-blue-500/10 text-blue-600 font-medium">{parseProperty(change.path)}</div>
                    </div>
                )
            default:
                <></>
        }
    }

    return (
        <div className="
            flex 
            flex-col 
            p-4 
            gap-3 
            border 
            border-indigo-400 
            bg-indigo-400/10 
            rounded-lg"
        >
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 justify-between items-center text-xs">
                    <div className="flex flex-row gap-2 items-center text-indigo-600">
                        <Lightbulb className="h-3 w-3 shrink-0" />
                        <div className="text-xs font-medium">
                            Suggestion
                        </div>
                    </div>
                    {navigateBack && (
                        <div 
                            className="flex flex-row gap-0.5 items-center cursor-pointer"
                            onClick={navigateBack}
                        >
                            <ChevronLeft className="h-3 w-3 shrink-0" />
                            Back to suggestions
                        </div>
                    )}
                </div>
                <div className="items-center text-xs font-normal text-muted-foreground">
                    {suggestion.description}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                {suggestion.changes.map(change => renderChange(change))}
            </div>
            {suggestion.status == "pending" && (
                <div className="flex flex-row gap-0.5 border-none justify-end">
                    <Button 
                        variant="ghost" 
                        className="text-xs"
                        onClick={(e) => {
                            e.preventDefault()
                            onDiscard?.()
                        }}
                    >
                        <X className="h-3 w-3 shrink-0" />
                        Discard
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="text-xs"
                        onClick={(e) => {
                            e.preventDefault()
                            onApply?.()
                        }}
                    >
                        <Check className="h-3 w-3 shrink-0" />
                        Apply
                    </Button>
                </div>
            )}
            {suggestion.status == "approved" && (
                <div className="flex flex-row gap-1 items-center text-xs justify-end">
                    <CheckCheck className="h-4 w-4 shrink-0" />
                    Applied
                </div>
            )}
            {suggestion.status == "discarded" && (
                <div className="flex flex-row gap-1 items-center text-xs justify-end">
                    <X className="h-4 w-4 shrink-0" />
                    Discarded
                </div>
            )}
        </div>
    )
}
