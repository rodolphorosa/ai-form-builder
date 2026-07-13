import React, { FC, useState } from "react"
import { FormSchema, Section, SectionItem } from "../../types/form"
import { Button } from "@/components/ui/button"
import { ChevronRight, Ellipsis, Folder, Pencil, Plus, TableOfContents, Trash } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { strategyIcons, typesNames } from "../registry"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { capitalize } from "lodash"


interface StructureMenuProps {
    schema: FormSchema | null
    selectItem: (item: SectionItem) => void
}

export const StructureMenu: FC<StructureMenuProps> = ({ schema, selectItem }) => {
    const sections: Section[] = schema ? schema.sections : []
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (sectionId: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }))
    }

    const renderContent = (items: SectionItem[]) => {
        return items.map((item) => {
            const IconComponent = strategyIcons[item.type] as React.ComponentType<{ className?: string }> | undefined;
            
            return (
                <div 
                    key={item.id || item.label}
                    className="group flex flex-row items-center gap-2 py-1.5 pl-9 rounded-md cursor-pointer hover:bg-muted select-none justify-between"
                    onClick={() => selectItem(item)}
                >
                    <div className="group/row flex flex-row gap-2">
                        {IconComponent && (
                            <IconComponent className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <div className="text-sm font-medium text-foreground/80 truncate">
                            {item.label}
                        </div>
                    </div>
                    {renderItemMenu()}
                </div>
            )
        })
    }

    const SectionMenuButton = (props: React.ComponentProps<typeof Button>) => {
        return (
            <Button
                {...props}
                size="icon"
                variant="ghost"
                className="
                    h-6
                    w-6
                    mr-1
                    text-muted-foreground
                    hover:text-foreground
                "
            >
                <Plus className="h-3.5 w-3.5" />
            </Button>
        )
    }

    const ItemMenuButton = (props: React.ComponentProps<typeof Button>) => {
        return (
            <Button
                {...props}
                size="icon"
                variant="ghost"
                className="
                    h-6
                    w-6
                    mr-1
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    text-muted-foreground
                    hover:text-foreground
                "
            >
                <Ellipsis />
            </Button>
        )
    }

    const renderSectionMenu = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger render={<SectionMenuButton />} />

                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                New item
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {Object.keys(strategyIcons).map(it => {
                                        const IconComponent = strategyIcons[it] as React.ComponentType<{ className?: string }> | undefined;

                                        return (
                                            <DropdownMenuItem key={it}>
                                                <div className="flex flex-row gap-1">
                                                    {IconComponent && (
                                                        <IconComponent className="h-4 w-4 text-muted-foreground shrink-0" />
                                                    )}

                                                    <div className="text-sm font-medium text-foreground/80 truncate">
                                                        {typesNames[it]}
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                            <Trash />
                            <div className="text-sm font-medium truncate">
                                Delete
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const renderItemMenu = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger render={<ItemMenuButton />} />

                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Pencil />
                            <div className="text-sm font-medium truncate">
                                Edit
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                            <Trash />
                            <div className="text-sm font-medium truncate">
                                Delete
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="flex h-full min-h-0 flex-col border-r bg-background">
            <div className="flex flex-row items-center justify-between p-4 h-14">
                <div className="flex flex-row items-center gap-2 text-sm font-medium">
                    <TableOfContents className="h-4 w-4" />
                    <div>Form structure</div>
                </div>
            </div>

            <Separator />

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sections.map((section) => {
                    const isOpen = !!openSections[section.id];

                    return (
                        <Collapsible 
                            key={section.id}
                            open={isOpen}
                            className="flex flex-col"
                        >
                            <div className="group flex flex-row items-center rounded-md hover:bg-accent/50">
                                <Button
                                    variant="ghost"
                                    className="
                                        flex-1
                                        justify-start
                                        gap-2
                                        px-2
                                        py-1.5
                                        h-8
                                        text-sm
                                        font-medium
                                        hover:bg-transparent
                                    "
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <ChevronRight 
                                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                                            isOpen ? "rotate-90" : ""
                                        }`}
                                    />

                                    <Folder className="h-4 w-4 text-muted-foreground" />

                                    <span className="truncate">
                                        {section.label}
                                    </span>
                                </Button>
                                {renderSectionMenu()}
                            </div>
                            <CollapsibleContent className="pt-0.5">
                                <div className="flex flex-col gap-0.5">
                                    {renderContent(section.items)}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )
                })}
            </div>
        </div>
    )
}