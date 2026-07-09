import React, { FC } from "react"
import { FormSchema, Item, Section, SectionItem } from "../types/form"
import { Button } from "@/components/ui/button"
import { Folder, Form, Plus, TableOfContents } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { strategyIcons } from "./registry"
import { Separator } from "@/components/ui/separator"

interface StructureMenuProps {
    schema: FormSchema | null
    selectItem: (item: SectionItem) => void
}

export const StructureMenu: FC<StructureMenuProps> = ({ schema, selectItem }) => {
    let sections: Section[] = [];

    if (schema) {
        sections = schema.sections
    }

    const renderContent = (items: SectionItem[]) => {
        return (
            items.map((item) => {
                const IconComponent = strategyIcons[item.type]
                return (
                    <div 
                        className="flex flex-row gap-3 py-2 px-4 rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => selectItem(item)}
                    >
                        <IconComponent />
                        <div className="text-base font-normal">{item.label}</div>
                    </div>
                )
            })
        )
    }

    return (
        <div className="flex h-full min-h-0 flex-col border-r">
            <div className="flex flex-row justify-between p-4">
                <div className="flex flex-row gap-2">
                    <TableOfContents />
                    <div>Form structure</div>
                </div>
                <Button variant="ghost">
                    <Plus />
                </Button>
            </div>
            <Separator />
            <div className="flex-1 overflow-y-auto p-4">
                <Accordion multiple className="max-w-lg" defaultValue={["notifications"]}>
                    {sections.map((section) => (
                        <AccordionItem className="border-none" key={section.id} value={section.id}>
                            <AccordionTrigger>
                                <div className="flex flex-row gap-2 self-end">
                                    <Folder />
                                    <div className="text-base font-semibold">{section.label}</div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>{renderContent(section.items)}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
