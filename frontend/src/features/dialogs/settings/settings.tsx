"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Astroid, CircleUser, FileText, Palette, Wrench, X } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { Appearance } from "./appearance"
import { MenuContainer } from "./common"
import { Button } from "@/components/ui/button"
import { AI } from "./ai"

interface SettingsProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const SettingsOption = ({ title, Icon, onSelect, active }: {
    title: string
    Icon: React.ComponentType<{ className?: string }>
    onSelect: () => void
    active: boolean
}) => {
    const settings = useTranslations("Settings")

    return (
        <div 
            className="flex flex-row p-2 gap-1.5 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer"
            onClick={onSelect}
        >
            <Icon className="h-4 w-4 shrink-0" />
            { settings(title) }
        </div>
    )
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsProps) => {
    const [activeMenu, setActiveMenu] = useState<string>("appearance")

    console.log(activeMenu)

    const settingsOptions: { title: string, icon: React.ComponentType }[] = [
        { title: "appearance", icon: Palette },
        { title: "editor", icon: Wrench },
        { title: "form", icon: FileText },
        { title: "ai", icon: Astroid },
        { title: "account", icon: CircleUser },
    ]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="min-w-[48rem] p-0">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-4 p-2 border-r min-w-[150px]">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="p-4" 
                                onClick={() => onOpenChange(false)}
                            >
                                <X className="h-4 w-4 shrink-0" />
                            </Button>
                            <div className="flex flex-col">
                                {settingsOptions.map(setting => (
                                    <SettingsOption 
                                        title={setting.title} 
                                        Icon={setting.icon} 
                                        onSelect={() => setActiveMenu(setting.title)} 
                                        active={activeMenu == setting.title} 
                                    />
                                ))}
                            </div>
                        </div>
                        <MenuContainer>
                            {activeMenu === "appearance" && <Appearance />}
                            {activeMenu === "ai" && <AI />}
                        </MenuContainer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}