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
import { EditableComponent } from "./editable"

interface CanvasProps {
    form: Form
    item?: Item | null
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
                className="w-full p-4 gap-2 cursor-pointer text-sm font-normal text-muted-foreground border-dashed self-center"
            >
                <Layers className="h4 w-4 shrink-0"/>
                <span>Adicionar seção</span>
            </Button>
        </div>
    )
}
