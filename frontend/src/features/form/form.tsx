"use client"

import { FC, useEffect, useRef } from "react"
import { FormSchema, Group, Item, Section, SectionItem } from "@/types/form"
import { ItemGroup } from "../inputs/group"
import { itemStrategies } from "../registry"
import { cn } from "@/lib/utils"
import { EmptyRenderer } from "./empty"
import { Skeleton } from "@/components/ui/skeleton"

interface FormProps {
    schema: FormSchema
    selectedItem?: SectionItem | null
}

export const Form: FC<FormProps> = ({ 
    schema, 
    selectedItem
}) => {

    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    console.log("item", selectedItem?.id)

    const renderSectionItem = (item: Item) => {
        const Component = itemStrategies[item.type]

        return (
            <div 
                ref={(el) => {
                    refs.current[item.id] = el
                }}
                className={cn(
                    "rounded-lg transition-all p-2",
                    selectedItem?.id === item.id &&
                        "bg-muted",
                    item.type === "textarea" && "col-span-2"
                )}
            >
                <Component item={item} />
            </div>
        )

    }

    const renderSection = (section: Section) => {
        return (
            <div className="flex flex-col gap-4">
                <div className="px-2 text-left text-base font-semibold">{section.label}</div>
                <div className="flex flex-col gap-2">
                    { section.items.map(item => renderSectionItem(item)) }
                </div>
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
        <div className="flex flex-col gap-4 px-8 py-12 min-h-0 h-full bg-card border rounded-lg shadow-sm">
            <div className="text-center text-lg font-semibold">
                {schema.title}
            </div>
            <div className="flex flex-col gap-2">
                { schema.sections.map(section => renderSection(section)) }
            </div>
        </div>
    )
}
