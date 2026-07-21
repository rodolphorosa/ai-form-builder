import React, { FC, useState } from "react"
import { FormSchema, Item, Section, SectionItem } from "../../types/form"
import { Button } from "@/components/ui/button"
import { ChevronRight, CircleUser, Folder, Folders, LogOut, Settings, TableOfContents, User } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { strategyIcons, typesNames } from "../registry"
import { Separator } from "@/components/ui/separator"
import { ItemMenu } from "./item"
import { SectionMenu } from "./section"
import { PropertiesTab } from "./props"
import { EditMenu } from "./edit"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTranslations } from "next-intl"

import Image from "next/image"


interface TreeProps {
    schema: FormSchema | null
    selectItem: (item: SectionItem) => void
    selectedItem: SectionItem | null
}

export const TreeMenu: FC<TreeProps> = ({ schema, selectItem, selectedItem }) => {
    const sections: Section[] = schema ? schema.sections : []
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const t = useTranslations("Tree")

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
                    <ItemMenu onEdit={setDrawerOpen}/>
                </div>
            )
        })
    }

    return (
        <div className="flex h-full min-h-0 flex-col border-r bg-card">
            <div className="flex flex-row items-center justify-between p-4 h-14">
                <div className="flex flex-row items-center gap-2 text-sm font-medium">
                    <Folders className="h-4 w-4" />
                    <div>Forms</div>
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
                                <SectionMenu />
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
            <Separator />
            <div className="flex p-4 cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <div className="flex flex-row gap-2">
                            <Avatar>
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium truncate">
                                Rodolpho Rosa da Silva
                            </div>
                        </div>
                    }/>
                    <DropdownMenuContent className="w-auto">
                        <div className="flex flex-row gap-2 p-2">
                            <Avatar>
                                <AvatarFallback>
                                    <User className="h-4 w-4"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-medium">Rodolpho Rosa da Silva</div>
                                <div className="text-xs text-muted-foreground">rodolphorosa05@gmail.com</div>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUser className="h-4 w-4" />
                                {t("profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="h-4 w-4" />
                                {t("settings")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive">
                                <LogOut className="h-4 w-4" />
                                {t("logout")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {schema && <EditMenu schema={schema} item={selectedItem as Item} open={drawerOpen} setOpen={setDrawerOpen}/>}
        </div>
    )
}