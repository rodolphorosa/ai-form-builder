"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Form, FormSchema, InputType, Item, Option, Section } from "@/types/form"
import { useEffect, useRef, useState } from "react"
import { itemStrategies, strategyIcons } from "../registry"
import { ArrowDownToLine, ArrowRightLeft, ArrowUpToLine, Asterisk, Astroid, Check, Copy, EllipsisVertical, Icon, Layers, Pencil, Plus, Settings, Sparkle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { Switch } from "@/components/ui/switch"
import { EditableText } from "../inputs/common"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputProps } from "@base-ui/react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Toggle } from "@/components/ui/toggle"
import { set } from "lodash"
import { is } from "date-fns/locale"

interface CanvasProps {
    form: Form
    item?: Item | null
}

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

const EditableComponent = ({ item, selected, sections }: EditableProps) => {
    const t = useTranslations("Tree")
    
    const Component = itemStrategies[item.type]

    if (!Component) return

    return (
        <div
            className={cn(
                "group flex flex-col border border-transparent rounded-md px-6 pb-5 pt-2.5 transition-colors",
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
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            (
                                <Button
                                    variant="outline"
                                    size="icon"
                                >
                                    <EllipsisVertical className="h-4 w-4" />
                                </Button>
                            )
                        }/>
                        <DropdownMenuContent className="w-auto">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Astroid />
                                    <div className="text-sm font-medium truncate">
                                        {t("improve with ai")}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Pencil />
                                    <div className="text-sm font-medium truncate">
                                        {t("edit")}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <ArrowUpToLine />
                                    <div className="text-sm font-medium truncate">
                                        {t("add item above")}
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ArrowDownToLine />
                                    <div className="text-sm font-medium truncate">
                                        {t("add item below")}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Copy />
                                    <div className="text-sm font-medium truncate">
                                        {t("duplicate")}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive">
                                    <Trash />
                                    <div className="text-sm font-medium truncate">
                                        {t("delete")}
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Component item={item} editable={selected} onChange={(value) => console.log(value)} />
        </div>
    )
}

export const Canvas = ({ form }: CanvasProps) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)

    const [titleFocused, setTitleFocused] = useState<boolean>(false)

    const [name, setName] = useState<string>(form.name)
    const [description, setDescription] = useState<string | undefined>(form.description)

    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    const renderSection = (section: Section) => {
        const isSelected = section.id === selectedSection?.id

        return (
            <div className="flex flex-col gap-2">
                <div className="flex flex-col p-5">
                    <div className="flex flex-row">
                        <div
                            onClick={() => setSelectedSection(section)}
                            className="flex flex-col gap-1 border-b pb-1"
                        >
                            <EditableText text={section.label} placeholder="Untitled section" editable={isSelected} className="font-medium"/>
                            <EditableText text={section.description} placeholder="Description (optional)" editable={isSelected} className="text-sm font-normal text-muted-foreground"/>
                        </div>
                        <div
                            className={cn(
                                "w-full flex flex-row gap-1 justify-end",
                                isSelected
                                ? "opacity-100"
                                : "pointer-events-none opacity-0 group-hover:opacity-50"
                            )}
                        >
                            <Button variant="outline" size="icon">
                                <Copy className="h-4 w-4 shrink-0"/>
                            </Button>
                        </div>
                    </div>
                    {section.items.map(it => renderItem(it))}
                    <Button 
                        variant="outline"
                        className="w-fit p-4 gap-2 cursor-pointer text-sm font-normal text-muted-foreground border-dashed self-left"
                    >
                        <Plus className="h4 w-4 shrink-0"/>
                        <span>Adicionar campo nessa seção</span>
                    </Button>
                </div>
                
            </div>
        )
    }
    
    const renderItem = (item: Item) => {
        const isSelected = item.id === selectedItem?.id
        
        return (
            <div 
                ref={(el) => {
                    refs.current[item.id] = el
                }}
                onClick={() => setSelectedItem(item)}
            >
                <EditableComponent item={item} selected={isSelected} sections={form.schema.sections}/>
            </div>
        )
    }

    useEffect(() => {
        if (!selectedItem) return

        refs.current[selectedItem.id]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }, [selectedItem])
    
    return (
        <div className="flex flex-col gap-12 px-8 py-12 min-h-0 h-full bg-card border rounded-lg shadow-sm">
            <div className="w-full" onClick={() => setTitleFocused(true)} onBlur={() => setTitleFocused(false)}>
                <div className="group flex flex-col gap-2 p-5 items-center">
                    <EditableText 
                        text={name} 
                        editable={titleFocused} 
                        placeholder="Untitled Form" 
                        onChange={setName}
                        className="text-lg font-medium"
                    />
                    <EditableText 
                        text={description} 
                        editable={titleFocused} 
                        placeholder="Description (optional)"
                        onChange={setDescription}
                        className="text-sm font-muted-foreground"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                { form.schema.sections.map(section => renderSection(section)) }
            </div>
            <Button 
                variant="outline"
                className="w-fit p-4 gap-2 cursor-pointer text-sm font-normal text-muted-foreground border-dashed self-center"
            >
                <Layers className="h4 w-4 shrink-0"/>
                <span>Adicionar seção</span>
            </Button>
        </div>
    )
}
