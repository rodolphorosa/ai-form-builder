import { Button } from "@/components/ui/button"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVertical, X, Plus } from "lucide-react"
import { EditableText } from "../inputs/common"
import { Option } from "@/types/form"

export const OptionsEditor = ({ options, type, onAdd, onDelete, onEdit }: {
    options: Option[] 
    type?: "select" | "radio" | "checkbox"
    onAdd?: (option: Option) => void
    onDelete?: (option: Option) => void
    onEdit?: (option: Option) => void
}) => {

    const createOption = (): Option => {
        const baseValue = "option"
        const baseLabel = "Nova opção"

        const getNextValue = () => {
            let index = 1

            while (
                options.some(option =>
                    option.value === (index === 1 ? baseValue : `${baseValue}${index}`)
                )
            ) {
                index++
            }

            return index === 1 ? baseValue : `${baseValue}${index}`
        }

        const getNextLabel = () => {
            let index = 1

            while (
                options.some(option =>
                    option.label === (index === 1 ? baseLabel : `${baseLabel} ${index}`)
                )
            ) {
                index++
            }

            return index === 1 ? baseLabel : `${baseLabel} ${index}`
        }

        return {
            value: getNextValue(),
            label: getNextLabel(),
        }
    }

    const editOption = (currentOption: Option, value: string) => {
        const exists = options.some(
            option => 
                option !== currentOption && 
                option.label.trim().toLowerCase() === value.trim().toLowerCase()
        )

        if (!exists) {
            onEdit?.({
                value: currentOption.value,
                label: value
            })
        }
    }


    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
                {options.map((option, index) => {
                    return (
                        <div className="group flex flex-row gap-1.5 text-xs font-normal items-center w-full">
                            <Button 
                                variant="ghost" 
                                size="xs" 
                                className={cn(
                                    "p-1 cursor-grab opacity-0",
                                    "group-hover:opacity-100"
                                )}
                            >
                                <GripVertical className="h-3 w-3 shrink-0"/>
                            </Button>
                            {type === "select" && <span>{index + 1}.</span>}
                            {type === "radio" && <RadioGroupItem className="h-3 w-3"  value={option.value} id={option.value} disabled />}
                            {type === "checkbox" && <Checkbox className="h-3 w-3" id={option.value} name={option.value} disabled />}
                            <EditableText 
                                text={option.label} 
                                editable={true} 
                                placeholder="Nova opção" 
                                onChange={(value) => editOption(option, value)}
                                className="flex-1"
                            />
                            <Button 
                                variant="ghost" 
                                size="xs" 
                                className={cn(
                                    "p-1 cursor-pointer opacity-0 self-end",
                                    "group-hover:opacity-100"
                                )}
                                onClick={() => onDelete?.(option)}
                            >
                                <X className="h-3 w-3 shrink-0"/>
                            </Button>
                        </div>
                    )
                })}
            </div>
            <Button 
                variant="outline" 
                className="border-dashed w-fit text-xs font-normal cursor-pointer" 
                size="sm"
                onClick={() => onAdd?.(createOption())}
            >
                <Plus className="h-3 w-3 shrink-0" />
                Adicionar nova opção
            </Button>
        </div>
    )
}