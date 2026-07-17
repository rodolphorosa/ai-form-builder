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
import { useTranslations } from "next-intl";
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

    const t = useTranslations("Common")

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
                                    {t("rename")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download />
                                <div className="text-sm font-medium truncate">
                                    {t("export")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Pin />
                                <div className="text-sm font-medium truncate">
                                    {t("fix")}
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Archive />
                                <div className="text-sm font-medium truncate">
                                    {t("archive")}
                                </div>
                            </DropdownMenuItem>
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
        </div>
    )
}
