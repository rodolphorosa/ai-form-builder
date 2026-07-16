import { Change, Suggestion } from "@/src/types/ai";
import { Option } from "@/src/types/form";
import { Separator } from "@/components/ui/separator";
import { CircleMinus, CirclePlus, Pencil, Plus, Replace, Sparkle, Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { propertyNames } from "../registry";
import { Button } from "@/components/ui/button";

interface SuggestionProps {
    suggestion: Suggestion
    applyChanges: (changes: Change[]) => void
}

export const SuggestionCard = ({ suggestion }: SuggestionProps) => {
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
        <Popover>
            <PopoverTrigger 
                render={
                    <div className="flex flex-row gap-2 p-2 items-center text-sm text-indigo-800 border border-border rounded-lg shadow-sm">
                        <div className="rounded-lg p-2 bg-indigo-800/10"><Sparkles className="h-4 w-4" /></div>
                        <div className="font-semibold">{suggestion.title}</div>
                    </div>
                }
            />
            <PopoverContent align="start" className="w-auto">
                <CardHeader>
                    <CardTitle className="flex flex-row gap-2 items-center text-xs text-indigo-800">
                        <div className="rounded-lg p-2 bg-indigo-800/10"><Pencil className="h-4 w-4" /></div>
                        <div className="font-semibold">Proposed changes</div>
                    </CardTitle>
                    <CardDescription className="items-center text-xs font-normal">
                        {suggestion.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    {suggestion.changes.map(change => renderChange(change))}
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-row gap-1 bg-white border-none justify-end">
                    <Button variant="ghost">Discard</Button>
                    <Button variant="default" className="bg-indigo-800 hover:bg-indigo-400">
                        <Sparkles />
                        Apply
                    </Button>
                </CardFooter>
            </PopoverContent>
        </Popover>
        
    )
}
