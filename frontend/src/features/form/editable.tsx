import { InputType, Item, Option, Path, Section } from "@/types/form"
import { useTranslations } from "next-intl"
import { itemStrategies, strategyIcons } from "../registry"
import { cn } from "@/lib/utils"
import { ArrowDownToLine, ArrowRightLeft, ArrowUpToLine, Asterisk, Astroid, Check, Copy, EllipsisVertical, GitBranch, Layers, Pencil, Sparkles, Trash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface EditableProps {
    item: Item
    selected: boolean
    onChange: (path: Path, value: unknown) => void
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
                        <IconComponent className="h-3 w-3 shrink-0" />
                    )}
                    <span className="text-xs font-normal truncate">
                        {common(option.value)}
                    </span>
                </div>

                <Check
                    className={cn(
                        "h-3 w-3 shrink-0",
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
                    <IconComponent className="!h-3 !w-3 shrink-0" />
                )}
                <span className="text-xs font-normal truncate">
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
                    <Button variant="outline" className="border-0 cursor-pointer">{renderTrigger(currentOption)}</Button>
                }
            />
            <PopoverContent align="start" className="w-max min-w-[120px] p-1 gap-0.5 shadow-lg">
                {options?.map((item) => renderTypeOption(item))}
            </PopoverContent>

        </Popover>
    )
}

export const EditableComponent = ({ item, selected, onChange, sections }: EditableProps) => {
    const t = useTranslations("Tree")
    
    const Component = itemStrategies[item.type]

    if (!Component) return

    return (
        <div
            className={cn(
                "relative flex flex-col gap-2 border border-transparent p-4 rounded-md transition-colors",
                selected ? "rounded-l-lg bg-card border-ring" : "hover:border-border hover:bg-card"
            )}
        >
            <div 
                className={cn(
                    "absolute left-1/2 -top-5 -translate-x-1/2 z-10 transition-all duration-200 rounded-lg shadow-lg",
                    selected
                        ? "opacity-100"
                        : "pointer-events-none opacity-0 group-hover:opacity-50"
                )}
            >
                <div className="flex flex-row gap-0.5 p-1 items-center border border-border rounded-lg bg-card">
                    <TypeSelect 
                        type={item.type} 
                        onSelect={(type) => {
                            onChange(["type"], type)
                        }}
                    />
                    <Separator orientation="vertical" />
                    <Button 
                        className="border-0 cursor-pointer"
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                            onChange(["required"], !item.required)
                        }}
                    >
                        <Asterisk className="h-3 w-3 shrink-0" />
                    </Button>
                    <Button 
                        className="border-0 cursor-pointer"
                        variant="outline" 
                        size="sm"
                    >
                        <Copy className="h-3 w-3 shrink-0" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={(
                            <Button 
                                className="border-0 cursor-pointer"
                                variant="outline" 
                                size="sm"
                            >
                                <ArrowRightLeft className="h-3 w-3 shrink-0"/>
                            </Button>
                        )} />
                        <DropdownMenuContent className="w-auto shadow-lg">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    Mover para
                                </DropdownMenuLabel>
                                {sections?.map(section => (
                                    <DropdownMenuItem className="text-xs">
                                        <Layers className="h-3 w-3 shrink-0" />
                                        {section.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                        className="border-0 cursor-pointer"
                        variant="outline" 
                        size="sm"
                    >
                        <Sparkles className="h-3 w-3 shrink-0"/>
                    </Button>
                    <Separator orientation="vertical" />
                    <Button 
                        className="border-0 cursor-pointer bg-card"
                        variant="destructive" 
                        size="sm"
                    >
                        <Trash className="h-3 w-3 shrink-0" />
                    </Button>
                </div>
            </div>
            <Component 
                item={item} 
                editable={selected} 
                onChange={(path, value) => onChange(path, value)} 
            />
            <div className="w-fit flex flex-row gap-1 p-2 items-center border rounded-sm text-xs font-normal bg-muted/50 cursor-pointer">
                <GitBranch className="h-3 w-3 shrink-0" />
                Lógica condicional ativa
            </div>
        </div>
    )
}