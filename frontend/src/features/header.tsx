"use client"

import React, { FC, useState } from "react"

import { Button } from "@/components/ui/button"
import { Form, Moon, Settings as SettingsIcon, Sun } from "lucide-react"
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
            </div>
            
        </div>
    )
}
