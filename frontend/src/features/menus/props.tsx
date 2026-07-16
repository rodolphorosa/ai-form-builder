import { FC, useEffect, useState } from "react"
import { FormSchema, Item } from "../../types/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { formService } from "@/src/api/form"
import { Change, Suggestion } from "@/src/types/ai"
import { SuggestionCard } from "./suggestion"

interface PropertiesTabProps {
    item: Item | null
    schema?: FormSchema
}

export const PropertiesTab: FC<PropertiesTabProps> = ({ item, schema }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])

    const suggest = async () => {
        if (!item || !schema) return

        try {
            const { data } = await formService.suggest({
                schema: schema,
                subject: item,
                context: "properties",
                provider: "openai",
                model: "gpt-4.1-nano"
            })

            setSuggestions(data.suggestions)
        
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            //
        }
    }

    useEffect(() => {
        if (!item || !schema) return

        suggest()
    }, [item, schema])

    const applyChanges = (changes: Change[]) => {
        
    }


    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="text-sm font-medium">Base properties</div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-med">Identifier:</div>
                    <Input type="text" defaultValue={item?.id}/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-normal">Name:</div>
                    <Input type="text" defaultValue={item?.label}/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-normal">Placeholder:</div>
                    <Input type="text" defaultValue={item?.ui?.placeholder}/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-normal">Description:</div>
                    <div className="flex flex-col gap-1">
                        <Textarea 
                            defaultValue={item?.description}
                            maxLength={250}
                            className="resize-none min-h-12 max-h-48 overflow-y-auto"
                        />
                        <div className="mt-1 flex justify-end text-xs text-muted-foreground self-end">{`${ item?.description?.length ?? 0 }/250`}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-normal">Help text:</div>
                    <div className="flex flex-col gap-1">
                        <Textarea 
                            defaultValue={item?.ui?.helpText}
                            maxLength={250}
                            className="resize-none min-h-12 max-h-48 overflow-y-auto"
                        />
                        <div className="mt-1 flex justify-end text-xs text-muted-foreground self-end">{`${ item?.description?.length ?? 0 }/250`}</div>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="text-sm font-normal">Required</div>
                    <Switch id="item-required" checked={item?.required} />
                </div>
                <div className="flex flex-row gap-4">
                    <div className="text-sm font-normal">Disabled</div>
                    <Switch id="item-disabled" checked={item?.disabled} />
                </div>
                <div className="grid grid-cols-4 gap-1">
                    {suggestions.map(suggestion => (
                        <SuggestionCard suggestion={suggestion} applyChanges={applyChanges}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
