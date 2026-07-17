import { Button } from "@/components/ui/button"
import { ChevronRight, RefreshCcw, Sparkles, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Thinking } from "../../inputs/common"
import { Progress } from "@/components/ui/progress"
import { SuggestionCard } from "./card"
import { Separator } from "@/components/ui/separator"
import { formService } from "@/api/form"
import { Suggestion } from "@/types/ai"
import { Item, FormSchema } from "@/types/form"

interface SuggestionsProps {
    item: Item
    schema: FormSchema | null
    context: "properties" | "options" | "validation"
}

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
        <div className="flex flex-row gap-4 p-4 rounded-lg shadow-lg items-start">
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

export const Suggestions = ({ item, schema, context }: SuggestionsProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    
    const [suggestion, setSuggestion] = useState<Suggestion | null>()

    const suggest = async () => {
        if (!item || !schema) return

        setLoading(true)

        try {
            const { data } = await formService.suggest({
                schema: schema,
                subject: item,
                context: context,
                provider: "openai",
                model: "gpt-4.1-nano"
            })

            setSuggestions(data.suggestions)
        
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading(false)
        }
    }

    const navigateBack = () => {
        setSuggestion(null)
    }

    if (suggestions.length == 0) {
        return <NoSuggestions loading={loading} onCreate={suggest} />
    }

    if (suggestion) {
        return (
            <SuggestionCard 
                suggestion={suggestion} 
                applyChanges={() => {}}
                backToSuggestions={true}
                navigateBack={navigateBack}
            />
        )
    }

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg">
            <div className="flex flex-row p-1 justify-between items-center text-xs">
                <div className="flex flex-row gap-2 items-center">
                    <Sparkles className="h-4 w-4" />
                    <div className="font-semibold">AI Suggestions</div>
                </div>
                <div>
                    Suggestions ({suggestions.length})
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {suggestions.map(suggestion => {
                    return (
                        <div 
                            className="
                                flex flex-row items-center justify-between 
                                rounded-lg shadow-sm
                                text-xs
                                cursor-pointer p-1"

                            onClick={() => setSuggestion(suggestion)}
                            >
                            <div className="flex flex-row items-center gap-1">
                                <div className="rounded-lg p-2">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div>
                                    {suggestion.title}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                        </div>    
                    )
                })}
            </div>
            <div className="flex flex-row gap-1 justify-end">
                <Button variant="ghost" className="border-none shadow-sm">
                    <RefreshCcw />
                    Regenerate
                </Button>
                <Button className="border-none shadow-sm">
                    <Trash2 />
                    Dismiss all
                </Button>
            </div>
        </div>
    )
}