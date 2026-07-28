import { InputType, Item, Option, Section } from "@/types/form"
import { useTranslations } from "next-intl"
import { itemStrategies, strategyIcons } from "../registry"
import { cn } from "@/lib/utils"
import { ArrowDownToLine, ArrowRightLeft, ArrowUpToLine, Asterisk, Astroid, Check, Copy, EllipsisVertical, Layers, Pencil, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface EditableProps {
    item: Item
    selected: boolean
    sections?: Section[]
}

const TypeSelect = ({ type, onSelect }: { type: InputType, onSelect: (type: InputType) => void }) => {
    const common = useTranslations("Common")

    const options: Option[] = Object.entries(strategyIcons).map(it => ({
        value: it[0],
        label: it[0],
        extra: { icon: it[1] }
    }))

    const renderTypeOption = (option: Option) => {
        const IconComponent = option.extra?.icon as React.ComponentType<{ className?: string }> | undefined;

        return (
            <div
                className={cn(
                    "grid grid-cols-[1fr_auto] items-center gap-4 p-1.5 rounded-sm text-sm cursor-pointer hover:bg-muted",
                    option.value === type && "bg-muted"
                )}
                onClick={() => onSelect(option.value)}
            >
                <div className="flex items-center gap-1.5">
                    {IconComponent && (
                        <IconComponent className="h-4 w-4 shrink-0" />
                    )}
                    <span className="truncate">
                        {common(option.value)}
                    </span>
                </div>

                <Check
                    className={cn(
                        "h-4 w-4 shrink-0",
                        option.value === type ? "opacity-100" : "opacity-0"
                    )}
                />
            </div>
        )
    }

    const renderTrigger = (option: Option) => {
        const IconComponent = option.extra?.icon as React.ComponentType<{ className?: string }> | undefined;
        
        return (
            <div className="flex items-center gap-1">
                {IconComponent && (
                    <IconComponent className="h-4 w-4 shrink-0" />
                )}
                <span className="text-smtruncate">
                    {common(option.value)}
                </span>
            </div>
        )
    }

    const currentOption: Option = options.find(option => option.value === type)!

    return (
        <Popover>
            <PopoverTrigger 
                render={
                    <Button variant="outline">{renderTrigger(currentOption)}</Button>
                }
            />
            <PopoverContent align="start" className="w-max min-w-[120px] p-1 gap-0.5">
                {options?.map((item) => renderTypeOption(item))}
            </PopoverContent>

        </Popover>
    )
}

export const EditableComponent = ({ item, selected, sections }: EditableProps) => {
    const t = useTranslations("Tree")
    
    const Component = itemStrategies[item.type]

    if (!Component) return

    return (
        <div
            className={cn(
                "flex flex-col border border-transparent rounded-md px-6 pb-5 pt-2.5 transition-colors",
                selected ? "rounded-l-lg bg-card" : "hover:border-muted"
            )}
        >
            <div 
                className={cn(
                    "w-full flex flex-row gap-1 justify-end",
                    selected
                        ? "opacity-100"
                        : "pointer-events-none opacity-0 group-hover:opacity-50"
                )}
            >
                <div className="flex flex-row gap-0.5 items-center">
                    <TypeSelect type={item.type} onSelect={(type) => console.log("novo tipo:", type)}/>
                    <Button variant="outline" size="icon">
                        <Asterisk className="h-4 w-4 shrink-0" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4 shrink-0" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={(
                            <Button variant="outline" size="icon">
                                <ArrowRightLeft className="h-4 w-4 shrink-0"/>
                            </Button>
                        )} />
                        <DropdownMenuContent className="w-auto">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    Mover para
                                </DropdownMenuLabel>
                                {sections?.map(section => (
                                    <DropdownMenuItem>
                                        <Layers className="h-4 w-4 shrink-0"/>
                                        {section.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon">
                        <Astroid className="h-4 w-4 shrink-0"/>
                    </Button>
                </div>
            </div>
            <Component item={item} editable={selected} onChange={(value) => console.log(value)} />
        </div>
    )
}