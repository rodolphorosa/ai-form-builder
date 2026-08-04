import { Button } from "@/components/ui/button"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { GripVertical, X, Plus } from "lucide-react"
import { EditableText } from "../inputs/common"
import { Option } from "@/types/form"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { DragDropProvider } from "@dnd-kit/react"
import { useEffect, useRef, useState } from "react"
import { moveSortable } from "./utils"

const SortableOption = ({
    option,
    index,
    type,
    editOption,
    onDelete,
}: {
    option: Option
    index: number
    type: string
    editOption: (option: Option, value: string) => void
    onDelete: (option: Option) => void
}) => {
    const { ref, handleRef } = useSortable({
        id: option.value,
        index,
        type: "option",
        accept: "option",
        group: "options",
    })

    return (
        <div
            ref={ref}
            className="group flex flex-row gap-1.5 text-xs font-normal items-center w-full"
        >
            <Button
                ref={handleRef}
                variant="ghost"
                size="xs"
                className={cn("p-1 cursor-grab opacity-0", "group-hover:opacity-100")}
            >
                <GripVertical className="h-3 w-3 shrink-0" />
            </Button>
            {type === "select" && <span>{index + 1}.</span>}
            {type === "radio" && (
                <RadioGroupItem className="h-3 w-3" value={option.value} id={option.value} disabled />
            )}
            {type === "checkbox" && (
                <Checkbox className="h-3 w-3" id={option.value} name={option.value} disabled />
            )}
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
                className={cn("p-1 cursor-pointer opacity-0 self-end", "group-hover:opacity-100")}
                onClick={() => onDelete?.(option)}
            >
                <X className="h-3 w-3 shrink-0" />
            </Button>
        </div>
    )
}

export const OptionsEditor = ({
    options,
    type,
    onAdd,
    onDelete,
    onEdit,
    onSort,
}: {
    options: Option[]
    type?: "select" | "radio" | "checkbox"
    onAdd?: (option: Option) => void
    onDelete?: (option: Option) => void
    onEdit?: (option: Option) => void
    onSort?: (sortedOptions: Option[]) => void
}) => {
    const [localOptions, setLocalOptions] = useState(options)
    const isDragging = useRef(false)
    const previousOptions = useRef(localOptions)
    const localOptionsRef = useRef(localOptions)

    localOptionsRef.current = localOptions

    useEffect(() => {
        if (!isDragging.current) {
            setLocalOptions(options)
        }
    }, [options])

    const createOption = (): Option => {
        const baseValue = "option"
        const baseLabel = "Nova opção"

        const getNextValue = () => {
            let index = 1

            while (
                localOptions.some(
                    (option) => option.value === (index === 1 ? baseValue : `${baseValue}${index}`)
                )
            ) {
                index++
            }

            return index === 1 ? baseValue : `${baseValue}${index}`
        }

        const getNextLabel = () => {
            let index = 1

            while (
                localOptions.some(
                    (option) => option.label === (index === 1 ? baseLabel : `${baseLabel} ${index}`)
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
        const exists = localOptions.some(
            (option) =>
                option !== currentOption &&
                option.label.trim().toLowerCase() === value.trim().toLowerCase()
        )

        if (!exists) {
            onEdit?.({
                value: currentOption.value,
                label: value,
            })
        }
    }

    const finishDrag = (canceled: boolean) => {
        requestAnimationFrame(() => {
            isDragging.current = false

            if (canceled) {
                setLocalOptions(previousOptions.current)
                return
            }

            onSort?.(localOptionsRef.current)
        })
    }

    return (
        <DragDropProvider
            onDragStart={() => {
                isDragging.current = true
                previousOptions.current = localOptionsRef.current
            }}
            onDragOver={(event) => {
                const { source } = event.operation
                if (!isSortable(source)) return

                const { index } = source.sortable
                setLocalOptions((current) => {
                    const from = current.findIndex((option) => option.value === source.id)
                    if (from === -1 || from === index) return current
                    return moveSortable(current, from, index)
                })
            }}
            onDragEnd={(event) => {
                finishDrag(event.canceled)
            }}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                    {localOptions.map((option, index) => (
                        <SortableOption
                            key={option.value}
                            option={option}
                            index={index}
                            type={type ?? "select"}
                            editOption={editOption}
                            onDelete={(option) => onDelete?.(option)}
                        />
                    ))}
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
        </DragDropProvider>
    )
}
