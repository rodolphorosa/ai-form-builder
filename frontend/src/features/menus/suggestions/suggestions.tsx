import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Lightbulb, RefreshCcw, Sparkles, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Thinking } from "../../inputs/common"
import { Progress } from "@/components/ui/progress"
import { SuggestionCard } from "./card"
import { Separator } from "@/components/ui/separator"
import { formService } from "@/api/form.service"
import { Suggestion } from "@/types/ai"
import { Item, FormSchema } from "@/types/form"



interface NoSuggestionsProps {
    loading: boolean
    onCreate: () => void
}

const NoSuggestions = ({ loading, onCreate}: NoSuggestionsProps) => {
    const [progress, setProgress] = useState(0)

    const [step, setStep] = useState<string>("Analizing properties...")

    useEffect(() => {
        if (!loading) {
            setProgress(0)
            return
        }

        setProgress(0)

        const interval = setInterval(() => {
            setProgress(prev => {
                const increment = (100 - prev) * 0.08
                return Math.min(prev + increment, 90)
            })
        }, 200)

        return () => clearInterval(interval)
    }, [loading])

    useEffect(() => {
        if (progress >= 30) {
            setStep("Generating suggestions...")
        }
    }, [progress])


    return (
        <div className="flex flex-row gap-4 p-4 rounded-4xl border shadow-sm items-start">
            <div className="flex flex-col gap-2 items-start w-full text-xs">
                <div className="flex flex-row gap-2 items-center">
                    <Sparkles className="h-4 w-4" />
                    <div className="font-semibold">AI Suggestions</div>
                </div>
                {!loading && (
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="text-xs text-muted-foreground font-normal">
                            Get AI recommendations to improve these properties
                        </div>
                        <Button 
                            className="border-none shadow-sm"
                            variant="outline"
                            onClick={onCreate}
                        >
                            <Sparkles />
                            Generate Suggestions
                        </Button>
                    </div>
                )}
                {loading && (
                    <div className="flex flex-col items-start gap-4 p-2 w-full">
                        <div className="items-start" ><Thinking step={step} /></div>
                        <Progress value={progress} className="w-full" />
                    </div>
                )}
            </div>
        </div>
    )
}

interface SuggestionsProps {
    suggestions: Suggestion[],
    onApply?: (suggestion: Suggestion) => void
    onDiscard?: (suggestion: Suggestion) => void
    onApplyAll?: () => void
    onDiscardAll?: () => void
}

export const Suggestions = ({ 
    suggestions, 
    onApply, 
    onDiscard, 
    onApplyAll, 
    onDiscardAll 
}: SuggestionsProps) => {
    const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null)

    const selectedSuggestion =
        suggestions.find(s => s.id === selectedSuggestionId) ?? null

    const navigateBack = () => {
        setSelectedSuggestionId(null)
    }

    if (selectedSuggestion) {
        return (
            <SuggestionCard 
                suggestion={selectedSuggestion} 
                onApply={() => onApply?.(selectedSuggestion)}
                onDiscard={() => onDiscard?.(selectedSuggestion)}
                navigateBack={navigateBack}
            />
        )
    }

    return (
        <div className="
            flex 
            flex-col 
            p-4 
            gap-3 
            border 
            border-yellow-400 
            bg-yellow-400/10 
            rounded-lg"
        >
            <div className="flex flex-row gap-2 items-center text-yellow-600">
                <Lightbulb className="h-3 w-3 shrink-0" />
                <div className="text-xs font-medium">
                    Suggestions
                </div>
            </div>
            <div className="flex flex-col gap-0.5">
                {suggestions.map(suggestion => {
                    return (
                        <div 
                            className="
                                flex flex-row 
                                items-center justify-between 
                                rounded-lg border border-yellow-400 bg-card
                                text-xs
                                cursor-pointer py-1.5 px-2.5"

                            onClick={() => setSelectedSuggestionId(suggestion.id)}
                            >
                            <div className="flex flex-row items-center gap-1">
                                <Lightbulb className="h-3 w-3 shrink-0" />
                                <span>
                                    {suggestion.title}
                                </span>
                            </div>
                            <ChevronRight className="h-3 w-3 shrink-0" />
                        </div>    
                    )
                })}
            </div>
            {/* <div className="flex flex-row gap-0.5 justify-end">
                <Button 
                    variant="ghost"
                    className="text-xs"
                >
                    <X className="h-3 w-3 shrink-0" />
                    Discard all
                </Button>
                <Button
                    variant="ghost"
                    className="text-xs"
                >
                    <Check className="h-3 w-3 shrink-0" />
                    Apply all
                </Button>
            </div> */}
        </div>
    )
}