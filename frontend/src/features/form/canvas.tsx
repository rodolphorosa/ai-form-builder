"use client"

import { cn } from "@/lib/utils"
import { Form, Item, Path, Section } from "@/types/form"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Copy, GripVertical, Layers, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditableText } from "../inputs/common"
import { EditableComponent } from "./editable-input"
import { Separator } from "@/components/ui/separator"
import { useSortable } from "@dnd-kit/react/sortable"
import { DragDropProvider, useDroppable } from "@dnd-kit/react"
import { move } from "@dnd-kit/helpers"
import { isSystemGeneratedName, ItemsBySection, recordToSections, sectionsToRecord, slugify } from "./utils"
import React from "react"
import { useTranslations } from "next-intl"

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
    onDelete,
    onDuplicate,
    onMove,
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
    onDelete: () => void
    onDuplicate: () => void
    onMove: (toSection: Section) => void
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
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                onMove={onMove}
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

    const i18nCanvas = useTranslations("Canvas")

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

    const createItemCopy = (item: Item): Item => {
        var copy = structuredClone(item)

        const randomId = crypto.randomUUID()
        
        copy.id = randomId
        copy.name = isSystemGeneratedName(item.name) ? `field_${randomId.slice(0, 8)}` : `${item.name}_copy`
        copy.label = `${item.label} (${i18nCanvas("copy")})`
        
        return copy
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
                        <Button variant="ghost" size="icon">
                            <ChevronUp className="h-4 w-4 shrink-0" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4 shrink-0" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
                            onChange={(label) => {
                                if(isSystemGeneratedName(section.name)) {
                                    onPropertyChange(
                                        basePath, 
                                        {
                                            ...section, 
                                            label: label, 
                                            name: slugify(label)
                                        }
                                    )
                                } else {
                                    onPropertyChange([...basePath, "label"], label)
                                }
                            }}
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
                            onDelete={() => {
                                onPropertyChange(
                                    [...basePath, "items"], 
                                    items.filter(it => it.id !== item.id)
                                )
                            }}
                            onDuplicate={() => {
                                const copy = createItemCopy(item)

                                onPropertyChange(
                                    [...basePath, "items"],
                                    [...items, copy]
                                )
                            }}
                            onMove={(toSection) => {
                                const fromCopy = structuredClone(section)
                                const toCopy = structuredClone(toSection)

                                fromCopy.items = fromCopy.items.filter(it => it.id !== item.id)
                                toCopy.items = [...toCopy.items, item]

                                onPropertyChange(
                                    ["schema", "sections"],
                                    form.schema.sections.map(
                                        (section) => section.id === fromCopy.id ? fromCopy : section.id === toCopy.id ? toCopy : section
                                    )
                                )
                            }}
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
                        onClick={(e) => {
                            e.preventDefault()

                            const randomId = crypto.randomUUID()

                            const item: Item = {
                                id: randomId,
                                name: `field_${randomId.slice(0, 8)}`,
                                label: i18nCanvas("new question"),
                                required: false,
                                disabled: false,
                                type: "text"
                            }

                            onPropertyChange([...basePath, "items"], [...items, item])
                        }}
                    >
                        <Plus className="h4 w-4 shrink-0" />
                        <span>
                            {i18nCanvas("add field in this section")}
                        </span>
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
                        onClick={(e) => {
                            e.preventDefault()

                            const randomId = crypto.randomUUID()

                            const section: Section = {
                                id: randomId,
                                name: `section_${randomId.slice(0, 8)}`,
                                label: i18nCanvas("new section"),
                                items: []
                            }

                            onPropertyChange(["schema", "sections"], [...form.schema.sections, section])
                        }}
                    >
                        <Layers className="h4 w-4 shrink-0" />
                        <span>
                            {i18nCanvas("add section")}
                        </span>
                    </Button>
                </div>
            </div>
        </DragDropProvider>
    )
}
