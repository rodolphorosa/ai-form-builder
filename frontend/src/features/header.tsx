"use client"

import React, { FC, useState } from "react"

import { Button } from "@/components/ui/button"
import { Archive, Download, EllipsisVertical, Eye, EyeOff, FolderInput, Form, Moon, Pencil, Pin, Redo, Settings as SettingsIcon, Sun, Trash, Undo } from "lucide-react"
import { Settings } from "./settings"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const Header: FC<{}> = ({}) => {
    const [open, setOpen] = useState<boolean>(false)

    const [mode, setMode] = useState<"edit" | "preview">("edit")

    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    const toggleMode = () => {
        if (mode == "edit") {
            setMode("preview")
        } else {
            setMode("edit")
        }
    }

    const t = useTranslations("Common")

    return (
        <div className="flex flex-row p-3 bg-background w-full">
            <div className="flex flex-row gap-1 w-full justify-end">
                <Button variant="ghost" size="icon">
                    <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Redo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleMode}>
                    { mode === "edit" ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger 
                        render={
                            <Button variant="ghost" size="icon">
                                <EllipsisVertical className="h-4 w-4"/>
                            </Button>
                        }
                    />
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuGroup className="gap-2 p-1">
                            <DropdownMenuItem>
                                <FolderInput />
                                <div className="text-sm font-medium truncate">
                                    {t("move to project")}
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
                                    {t("pin")}
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
