"use client"

import { FormSchema } from "@/types/form"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { mockSchemas } from "../mock"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { EllipsisVertical, Pencil, FolderOpen, Pin, Archive, Trash, Astroid, SquarePen, Search, User, CircleUser, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const Sidebar = () => {
    const tTree = useTranslations("Tree")
    const tCommon = useTranslations("Common")

    const [schemas, setSchemas] = useState<FormSchema[]>(mockSchemas)

    const [open, setOpen] = useState<boolean>(true)

    const renderRecent = (schema: FormSchema) => {
        return (
            <div className="group flex flex-row items-center rounded-sm justify-between hover:bg-muted cursor-pointer">
                <div className="text-sm font-normal px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm">
                    {schema.title}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger render={(
                        <Button size="icon" variant="ghost">
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    )} />
                    <DropdownMenuContent className="w-fit">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4" />
                                <div className="text-sm font-medium truncate">
                                    {tCommon("rename")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <FolderOpen className="h-4 w-4" />
                                <div className="text-sm font-medium truncate">
                                    {tTree("move to project")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Pin className="h-4 w-4" />
                                <div className="text-sm font-medium truncate">
                                    {tCommon("pin")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Archive className="h-4 w-4" />
                                <div className="text-sm font-medium truncate">
                                    {tCommon("archive")}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive">
                                <Trash className="h-4 w-4" />
                                <div className="text-sm font-medium truncate">
                                    {tCommon("delete")}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                    
                </DropdownMenu>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full min-h-0 border-r bg-card">
            <div className="flex flex-col gap-2 p-1 justify-left">
                <div className="p-3">
                    <Button variant="outline" size="icon" className="border rounded-full">
                        <Astroid className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-row py-2 px-3 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                    <SquarePen className="h-4 w-4" />
                    {tTree("new form")}
                </div>
            </div>
            <Separator />
            <div className="gap-2 h-[100%] overflow-hidden">
                <div className="flex flex-col h-full p-1 overflow-y-auto">
                    <div className="flex flex-col">
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <Search className="h-4 w-4" />
                            {tTree("search")}
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <FolderOpen className="h-4 w-4" />
                            {tTree("projects")}
                        </div>
                    </div>
                    <Collapsible key="recent" open={open} className="flex flex-col">
                        <div className="px-3 py-2 text-sm font-medium" onClick={() => setOpen(!open)}>
                            {tTree("recent")}
                        </div>
                        <CollapsibleContent className="pt-0.5">
                            <div className="flex flex-col gap-0.5">
                                {schemas.map(schema => renderRecent(schema))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
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
                                {tTree("profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="h-4 w-4" />
                                {tTree("settings")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive">
                                <LogOut className="h-4 w-4" />
                                {tTree("logout")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}