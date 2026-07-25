"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Form, FormSchema, Item, Section } from "@/types/form"
import { useState } from "react"
import { itemStrategies } from "../registry"
import { ArrowDownToLine, ArrowUpToLine, Astroid, Copy, EllipsisVertical, Pencil, Settings, Sparkle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { Switch } from "@/components/ui/switch"
import { EditableText } from "../inputs/common"

interface CanvasProps {
    form: Form
}

interface EditableProps {
    item: Item
    selected: boolean
}

const EditableComponent = ({ item, selected }: EditableProps) => {
    const t = useTranslations("Tree")
    
    const Component = itemStrategies[item.type]

    if (!Component) return

    return (
        <div
            className={cn(
                "group flex flex-col gap-1 border border-transparent rounded-md px-6 pb-5 pt-2.5 transition-colors",
                selected ? "border-border bg-muted/40" : "hover:bg-muted/20"
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
                <div className="flex flex-row gap-1.5 items-center">
                    <span className="text-xs font-normal">Required</span>
                    <Switch id={`${item.id}_required`} checked={item.required} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        (
                            <Button
                                size="icon"
                                variant="ghost"
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

            <Component item={item} editable={selected} />
        </div>
    )
}

export const Canvas = ({ form }: CanvasProps) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    const [titleFocused, setTitleFocused] = useState<boolean>(false)

    const renderSection = (section: Section) => {
        return (
            <div className="flex flex-col gap-2">
                {section.items.map(it => renderItem(it))}
            </div>
        )
    }
    
    const renderItem = (item: Item) => {
        const isSelected = item.id === selectedItem?.id
        
        return (
            <div 
                onClick={() => setSelectedItem(item)}
            >
                <EditableComponent item={item} selected={isSelected} />
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-4 px-8 py-12 bg-card border rounded-lg shadow-sm">
            <div className="w-full" onClick={() => setTitleFocused(true)} onBlur={() => setTitleFocused(false)}>
                {titleFocused ? (
                    <div className="flex flex-col gap-2 p-5">
                        <EditableText 
                            id="form-title" 
                            value={form.name} 
                            placeholder="Title" 
                            onChange={(value) => console.log(value)} 
                            onBlur={(value) => console.log(value)} 
                            className="!text-lg font-semibold text-center h-8"
                            autofocus={true} 
                        />
                        <EditableText 
                            id="form-title" 
                            value={form.description ?? ""}
                            placeholder="Description placeholder" 
                            onChange={(value) => console.log(value)} 
                            className="font-medium text-center h-8 text-muted-foreground"
                            onBlur={(value) => console.log(value)} 
                        />
                    </div>
                ):(
                    <div className="flex flex-col gap-2 p-5">
                        <div className="text-center h-8 text-lg font-semibold">
                            {form.name}
                        </div>
                        <div className="text-center h-8 text-sm text-muted-foreground">
                            {form.description}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col gap-2">
                { form.schema.sections.map(section => renderSection(section)) }
            </div>
        </div>
    )
}
