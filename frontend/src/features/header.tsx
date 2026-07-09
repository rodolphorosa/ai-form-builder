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

export const Header: FC<{}> = ({}) => {
    const [theme, settheme] = useState<"light" | "dark">("light")
    const [open, setOpen] = useState<boolean>(false)

    const toggleTheme = () => {
        if (theme === "dark") {
            settheme("light")
        } else {
            settheme("dark")
        }
    }

    return (
        <div className="flex flex-row justify-between p-4 border border-border bg-background shadow-sm">
            <div className="flex flex-row gap-2 self-end">
                <Form />
                <div className="text-lg font-bold">Smart Form Builder</div>
            </div>
            <div className="flex flex-row gap-1 self-end">
                <Button>Save</Button>
                <Button>Export JSON</Button>
                <Button variant="ghost" onClick={toggleTheme}>
                    { theme === "light" ? <Sun /> : <Moon /> }
                </Button>
                <Settings />
            </div>
            
        </div>
    )
}
