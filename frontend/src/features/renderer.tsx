"use client"

import { FC, useEffect, useRef } from "react"
import { FormSchema, Group, Section, SectionItem } from "../types/form"
import { ItemGroup } from "./inputs/group"
import { itemStrategies } from "./registry"
import { cn } from "@/lib/utils"
import { EmptyRenderer } from "./emptyRenderer"

interface RendererProps {
    schema: FormSchema | null
    selectedItem: SectionItem | null
    onCreate: () => void
    onSchemaCreate: (schema: FormSchema) => void
}

export const Renderer: FC<RendererProps> = ({ 
    schema, 
    selectedItem, 
    onCreate, 
    onSchemaCreate 
}) => {

    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    const isGroup = (item: SectionItem): item is Group => {
        return "items" in item
    }

    const renderSectionItem = (item: SectionItem) => {

        if(isGroup(item)) {
            return (
                <ItemGroup group={item} />
            )
        }

        const Component = itemStrategies[item.type]

        if(!Component) {
            return (<div>Unsupported input type</div>)
        }

        return (
            <div 
                ref={(el) => {
                    refs.current[item.id] = el
                }}
                className={cn(
                    "rounded-lg border-transparent transition-all p-1",
                    selectedItem?.id === item.id &&
                        "shadow-sm bg-muted/80",
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
                <div className="text-left text-base font-semibold">{section.label}</div>
                <div className="grid grid-cols-2 gap-3">
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

    if(!schema) {
        return <EmptyRenderer onCreate={onCreate} onSchemaCreate={onSchemaCreate}/>
    }
    
    return (
        <div className="flex flex-col gap-4 p-1 min-h-0 h-full">
            <div className="text-center text-lg font-semibold">
                {schema.title}
            </div>
            <div className="flex flex-col gap-5">
                { schema.sections.map(section => renderSection(section)) }
            </div>
        </div>
    )
}
