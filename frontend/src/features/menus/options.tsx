import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { FormSchema, Item, Option } from "@/src/types/form"
import { GripVertical, Pencil, Plus, Trash, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"

import { useSortable, isSortable } from '@dnd-kit/react/sortable'
import { DragDropProvider } from "@dnd-kit/react"
import { formService } from "@/src/api/form"
import { SuggestionCard } from "./suggestions/card"
import { Change, Suggestion } from "@/src/types/ai"
import { SuggestionRequest } from "@/src/api/types"
import { Suggestions } from "./suggestions/suggestions"

interface OptionsTabProps {
    item: Item | null
    schema?: FormSchema
}

interface SortableOptionProps {
    option: Option
    index: number
    removeOption: (option: Option) => void
}

const SortableOption = ({ option, index, removeOption }: SortableOptionProps) => {
    const { ref, handleRef, isDragging } = useSortable({ id: option.value, index: index })

    return (
        <div ref={ref}>
            <Popover>
                <PopoverTrigger
                    render={
                        <div className="flex items-center gap-0.5 text-xs font-medium shadow-sm w-auto p-1 rounded-lg cursor-pointer">
                            <Button ref={handleRef} variant="secondary" size="xs">
                                <GripVertical className="h-3 w-3" />
                            </Button>
                            <div className="text-xs font-medium p-1 flex-1">
                                {option.label}
                            </div>
                            <Button
                                variant="destructive"
                                size="xs"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeOption(option)
                                }}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    }
                />
                <PopoverContent align="start">
                    <div className="flex flex-col gap-2 p-1">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-xs font-medium">Value:</span>
                            <Input
                                type="text"
                                value={option.value}
                                className="text-xs font-normal"
                            />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-xs font-medium">Label:</span>
                            <Input
                                type="text"
                                value={option.label}
                                className="text-xs font-normal"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export const OptionsTab = ({ item, schema }: OptionsTabProps) => {
    const [localOptions, setLocalOptions] = useState<Option[]>(item?.options ?? [])

    const [value, setValue] = useState<string>("")
    const [label, setLabel] = useState<string>("")

    const addOption = () => {
        if (value.trim().length == 0 || label.trim().length == 0) return

        setLocalOptions(prev => [
            ...prev,
            { value: value, label: label }
        ])
    }

    const removeOption = (option: Option) => {

        setLocalOptions(prev => 
            prev.filter(opt => opt.value !== option.value)
        )
    }

    const editOption = (option: Option) => { /** TODO: implement */ }

    const moveOption = (array: Option[], from: number, to: number) => {
        if (from === to) return array
        
        const copy = [...array]
        const [removed] = copy.splice(from, 1)
        copy.splice(to, 0, removed)
        
        return copy
    }

    const onDragEnd = (event: any) => {
        const { source, target } = event.operation

        if (isSortable(source)) {
            const { initialIndex, index } = source.sortable
            
            if (initialIndex !== index) {
                setLocalOptions((prev) => moveOption(prev, initialIndex, index))
            }
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-4 px-4 py-2">
                <div className="text-sm font-medium">Options</div>
                <div className="flex flex-col gap-2">
                    <DragDropProvider onDragEnd={onDragEnd}>
                        <div className="flex flex-wrap items-start content-start gap-1 p-2 rounded-lg min-h-42 shadow-sm">
                            {localOptions.map((option, index) => (
                                <SortableOption
                                    key={option.value}
                                    option={option}
                                    index={index}
                                    removeOption={removeOption}
                                />
                            ))}
                        </div>
                    </DragDropProvider>
                    <div className="flex flex-row gap-1 w-full self-end">
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-xs font-medium">Value:</span>
                            <Input type="text" placeholder="Ex.: full_name" onChange={(e) => setValue(e.target.value ?? "")}/>
                            <div className="flex flex-row gap-1 italic text-xs">
                                <span className="font-medium">Help:{" "}</span>
                                <span className="font-light">Must be unique.</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span className="text-xs font-medium">Label:</span>
                            <Input type="text" placeholder="Ex.: Full name" onChange={(e) => setLabel(e.target.value ?? "")}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium invisible">Action</span>
                            <Button className="rounded-full shadow-xs" variant="outline" size="icon" onClick={() => addOption()}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
                { (item && schema) && <Suggestions item={item} schema={schema} context="options" />}
            </div>
        </div>
    )
}
