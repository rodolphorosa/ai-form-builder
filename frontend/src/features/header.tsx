"use client"

import React, { FC, useState } from "react"

import { Button } from "@/components/ui/button"
import { Archive, Download, EllipsisVertical, Form, Moon, Pencil, Pin, Settings as SettingsIcon, Sun, Trash } from "lucide-react"
import { 
    Drawer, 
    DrawerContent, 
    DrawerDescription, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerTitle, 
    DrawerTrigger 
} from "@/components/ui/drawer"
import { Settings } from "./settings"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const Header: FC<{}> = ({}) => {
    // const [theme, setTheme] = useState<"light" | "dark">("light")
    const [open, setOpen] = useState<boolean>(false)

    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <div className="flex flex-row justify-between p-4 border border-border bg-background shadow-sm">
            <div className="flex flex-row gap-2 self-end">
                <Form />
                <div className="text-lg font-bold">Smart Form Builder</div>
            </div>
            <div className="flex flex-row gap-1 self-end">
                <Button variant="outline">Save</Button>
                <Button variant="outline">Export JSON</Button>
                <Button variant="ghost" onClick={toggleTheme}>
                    { theme === "light" ? <Sun /> : <Moon /> }
                </Button>
                <Settings />
                <DropdownMenu>
                    <DropdownMenuTrigger 
                        render={
                            <Button variant="ghost" size="icon">
                                <EllipsisVertical />
                            </Button>
                        }
                    />
                    <DropdownMenuContent>
                        <DropdownMenuGroup className="gap-2 p-1">
                            <DropdownMenuItem>
                                <Pencil />
                                <div className="text-sm font-medium truncate">
                                    Rename
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download />
                                <div className="text-sm font-medium truncate">
                                    Export
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Pin />
                                <div className="text-sm font-medium truncate">
                                    Fix
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Archive />
                                <div className="text-sm font-medium truncate">
                                    Archive
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem variant="destructive">
                                <Trash />
                                <div className="text-sm font-medium truncate">
                                    Delete
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
