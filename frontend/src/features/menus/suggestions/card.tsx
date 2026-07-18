
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, CircleMinus, CirclePlus, Pencil, Plus, Replace, Sparkle, Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { propertyNames } from "../../registry";
import { Button } from "@/components/ui/button";
import { Suggestion, Change } from "@/types/ai";
import { Option } from "@/types/form"

interface SuggestionProps {
    suggestion: Suggestion
    applyChanges: (changes: Change[]) => void
    backToSuggestions?: boolean
    navigateBack?: () => void
}

export const SuggestionCard = ({ suggestion, applyChanges, backToSuggestions, navigateBack }: SuggestionProps) => {
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
        const tokens = prop.split(".")
        return propertyNames[tokens[tokens.length - 1]] ?? "unknown"
    }

    const renderChange = (change: Change) => {
        switch (change.op) {
            case "add":
                return (
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-green-500/10 text-green-800">
                            <CirclePlus className="h-4 w-4" />
                        </div>
                        <span>Add option{" "}</span>
                        <div className="rounded-lg p-2 bg-green-500/10 text-green-800 font-medium">{parseValue(change.value)}</div>
                    </div>
                )
            case "remove":
                return (
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-red-600/10 text-red-600">
                            <CircleMinus className="h-4 w-4" />
                        </div>
                        <span>Remove option{" "}</span>
                        <div className="rounded-lg p-2 bg-red-600/10 text-red-600 font-medium">{parseValue(change.value)}</div>
                    </div>
                )
            case "replace":
                return (
                    <div className="flex flex-row gap-2 text-xs font-normal items-center">
                        <div className="rounded-lg p-2 bg-blue-600/10 text-blue-600">
                            <Replace className="h-4 w-4" />
                        </div>
                        <span>Apply{" "}</span>
                        <div className="rounded-lg p-2 bg-blue-500/10 text-blue-600 font-medium truncate">{parseValue(change.value)}</div>
                        <span>to{" "}</span>
                        <div className="rounded-lg p-2 bg-blue-500/10 text-blue-600 font-medium">{parseProperty(change.property)}</div>
                    </div>
                )
            default:
                <></>
        }
    }

    return (
        <div className="flex flex-col p-4 gap-4 rounded-4xl border shadow-sm">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 justify-between items-center text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <Pencil className="h-4 w-4" />
                        <div className="font-semibold">Proposed changes</div>
                    </div>
                    { backToSuggestions && (
                        <div 
                            className="flex flex-row gap-1 cursor-pointer p-2"
                            onClick={() => navigateBack?.()}
                        >
                            <ChevronLeft className="h-4 w-4"/>
                            <span>Back to suggestions</span>
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
            <div className="flex flex-row gap-1 border-none justify-end">
                <Button variant="ghost">Discard</Button>
                <Button variant="default">
                    <Sparkles />
                    Apply
                </Button>
            </div>
        </div>
    )
}
