"use client"

import { cn } from "@/lib/utils"
import { Form, Item, Path, Section } from "@/types/form"
import { useEffect, useRef, useState } from "react"
import { Copy, GripVertical, Layers, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditableText } from "../inputs/common"
import { EditableComponent } from "./editable"
import { Separator } from "@/components/ui/separator"
import { useSortable } from "@dnd-kit/react/sortable"
import { DragDropProvider, useDroppable } from "@dnd-kit/react"
import { move } from "@dnd-kit/helpers"
import { ItemsBySection, recordToSections, sectionsToRecord } from "./utils"
import React from "react"

interface CanvasProps {
    form: Form
    onPropertyChange: (path: Path, value: unknown) => void
}

const SortableItem = ({
    item,
    index,
    group,
    sections,
    onSelect,
    selected,
    basePath,
    onPropertyChange,
    itemRef,
}: {
    item: Item
    index: number
    group: string
    sections: Section[]
    onSelect: (item: Item) => void
    selected: boolean
    basePath: Path
    onPropertyChange: (path: Path, value: unknown) => void
    itemRef?: (el: HTMLDivElement | null) => void
}) => {
    const { ref, handleRef } = useSortable({
        id: item.id,
        index,
        group,
        type: "field",
        accept: "field",
    })

    return (
        <div
            ref={(el) => {
                ref(el)
                itemRef?.(el)
            }}
            className="relative"
            onClick={() => onSelect(item)}
        >
            <Button
                ref={handleRef}
                variant="ghost"
                size="icon"
                className={cn(
                    "absolute top-1/2 -left-8 -translate-y-1/2 transition-all duration-200",
                    selected ? "opacity-100" : "pointer-events-none opacity-0"
                )}
            >
                <GripVertical className="h-4 w-4 shrink-0" />
            </Button>
            <EditableComponent
                item={item}
                selected={selected}
                sections={sections}
                onChange={(path, value) => onPropertyChange([...basePath, ...path], value)}
            />
        </div>
    )
}

const DroppableSection = ({
    sectionId,
    children,
}: {
    sectionId: string
    children: React.ReactNode
}) => {
    const { ref, isDropTarget } = useDroppable({
        id: sectionId,
        type: "section",
        accept: "field",
    })

    return (
        <div
            ref={ref}
            className={cn("flex flex-col min-h-6", isDropTarget && "rounded-md bg-muted/30")}
        >
            {children}
        </div>
    )
}

export const Canvas = ({ form, onPropertyChange }: CanvasProps) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [titleFocused, setTitleFocused] = useState<boolean>(false)

    const [itemsBySection, setItemsBySection] = useState<ItemsBySection>(() =>
        sectionsToRecord(form.schema.sections)
    )

    const isDragging = useRef(false)
    const previousItems = useRef(itemsBySection)
    const itemsBySectionRef = useRef(itemsBySection)
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

    itemsBySectionRef.current = itemsBySection

    useEffect(() => {
        if (!isDragging.current) {
            setItemsBySection(sectionsToRecord(form.schema.sections))
        }
    }, [form.schema.sections])

    useEffect(() => {
        if (!selectedItem) return

        itemRefs.current[selectedItem.id]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }, [selectedItem])

    const persistSections = () => {
        onPropertyChange(
            ["schema", "sections"],
            recordToSections(form.schema.sections, itemsBySectionRef.current)
        )
    }

    const finishDrag = (canceled: boolean) => {
        requestAnimationFrame(() => {
            isDragging.current = false

            if (canceled) {
                setItemsBySection(previousItems.current)
                return
            }

            persistSections()
        })
    }

    const renderSection = (section: Section, index: number) => {
        const isSelected = section.id === selectedSection?.id
        const basePath = ["schema", "sections", index]
        const items = itemsBySection[section.id] ?? []

        return (
            <div key={section.id} className="flex flex-col gap-2">
                <div className="flex flex-col px-4">
                    <div
                        className={cn(
                            "w-full flex flex-row gap-1 justify-end",
                            isSelected
                                ? "opacity-100"
                                : "pointer-events-none opacity-0 group-hover:opacity-50"
                        )}
                    >
                        <Button variant="outline" size="icon">
                            <Copy className="h-4 w-4 shrink-0" />
                        </Button>
                    </div>
                    <div
                        onClick={() => setSelectedSection(section)}
                        className="flex flex-col gap-1"
                    >
                        <EditableText
                            text={section.label}
                            placeholder="Untitled section"
                            editable={isSelected}
                            className="font-medium"
                            onChange={(label) => onPropertyChange([...basePath, "label"], label)}
                        />
                        <EditableText
                            text={section.description}
                            placeholder="Description (optional)"
                            editable={isSelected}
                            className="text-sm font-normal text-muted-foreground"
                            onChange={(description) =>
                                onPropertyChange([...basePath, "description"], description)
                            }
                        />
                    </div>
                </div>
                <Separator />
                <DroppableSection sectionId={section.id}>
                    {items.map((item, itemIndex) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            index={itemIndex}
                            group={section.id}
                            sections={form.schema.sections}
                            onSelect={setSelectedItem}
                            selected={item.id === selectedItem?.id}
                            basePath={[...basePath, "items", itemIndex]}
                            onPropertyChange={onPropertyChange}
                            itemRef={(el) => {
                                itemRefs.current[item.id] = el
                            }}
                        />
                    ))}
                </DroppableSection>
                <div className="py-1 px-4">
                    <Button
                        variant="outline"
                        className="w-fit p-4 gap-2 cursor-pointer text-sm font-normal text-muted-foreground border-dashed self-left"
                    >
                        <Plus className="h4 w-4 shrink-0" />
                        <span>Adicionar campo nessa seção</span>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <DragDropProvider
            onDragStart={() => {
                isDragging.current = true
                previousItems.current = itemsBySectionRef.current
            }}
            onDragOver={(event) => {
                setItemsBySection((current) => move(current, event))
            }}
            onDragEnd={(event) => {
                finishDrag(event.canceled)
            }}
        >
            <div className="flex flex-col gap-4 px-8 py-12 min-h-0 h-full bg-card border rounded-lg shadow-sm bg-muted/40">
                <div
                    className="w-full"
                    onClick={() => setTitleFocused(true)}
                    onBlur={() => setTitleFocused(false)}
                >
                    <div className="group flex flex-col gap-2 p-5 items-center">
                        <EditableText
                            text={form.name}
                            editable={titleFocused}
                            placeholder="Untitled Form"
                            onChange={(name) => onPropertyChange(["name"], name)}
                            className="text-center text-lg font-medium"
                        />
                        <EditableText
                            text={form.description}
                            editable={titleFocused}
                            placeholder="Description (optional)"
                            onChange={(description) => onPropertyChange(["description"], description)}
                            className="text-center text-sm font-muted-foreground"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    {form.schema.sections.map((section, index) => renderSection(section, index))}
                </div>
                <div className="px-4">
                    <Button
                        variant="outline"
                        className="w-full p-4 gap-2 cursor-pointer text-sm font-normal text-muted-foreground border-dashed self-center"
                    >
                        <Layers className="h4 w-4 shrink-0" />
                        <span>Adicionar seção</span>
                    </Button>
                </div>
            </div>
        </DragDropProvider>
    )
}
