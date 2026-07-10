"use client"

import React, { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
    Drawer, 
    DrawerContent, 
    DrawerDescription, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerTitle, 
    DrawerTrigger 
} from "@/components/ui/drawer"

import { Settings as SettingsIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "../types/form"
import { Input } from "@/components/ui/input"
import { InputLabel } from "./inputs/common"

type Provider = "ollama" | "openai" | "gemini"

export const Settings: FC<{}> = ({}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [provider, setProvider] = useState<Provider>("openai")
    const [model, setModel] = useState<string>("gpt-4.1-nano")
    const [apiKey, setApiKey] = useState<string>("")

    const providers = [
        { value: "ollama", label: "Ollama" },
        { value: "openai", label: "OpenAI" },
        { value: "gemini", label: "Gemini" },
    ]

    const models: Record<Provider, Option[]> = {
        "ollama": [
            { value: "llama3.2", label: "llama3.2" }
        ],
        "openai": [
            { value: "gpt-4.1-nano", label: "gpt-4.1-nano" },
            { value: "gpt-5-mini", label: "gpt-5-mini" },
            { value: "gpt-5-nano", label: "gpt-5-nano" }
        ],
        "gemini": [
            { value: "gemini-2.5-flash", label: "gemini-2.5-flash" }
        ]
    }

    const saveSettings = () => {
        const settings = {
            provider,
            model,
            apiKey
        }

        localStorage.setItem("settings", JSON.stringify(settings))
    }
    
    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            swipeDirection="right"
        >
            <DrawerTrigger render={ <Button variant="ghost"><SettingsIcon /></Button> } />
            <DrawerContent>
                <DrawerHeader className="p-4">
                    <DrawerTitle className="flex flex-row gap-2">
                        <SettingsIcon />
                        <div className="text-base font-bold">Settings</div>
                    </DrawerTitle>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-4">
                        <div className="text-base font-medium">AI Settings</div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                <div className="text-base font-normal">Default provider</div>
                                <Select 
                                    items={providers} 
                                    value={provider} 
                                    onValueChange={(value) => {
                                        if (value) {
                                            setProvider(value)
                                            setModel(models[value][0].value)
                                        } else {
                                            setProvider("openai")
                                            setModel(models.openai[0].value)
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {providers?.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-base font-normal">Default model</div>
                                <Select 
                                    items={models[provider]} 
                                    value={model} 
                                    onValueChange={(value) => {
                                        if (value) {
                                            setModel(value)
                                        } else {
                                            if (provider) {
                                                setModel(models[provider][0].value)
                                            } else {
                                                setModel(models.openai[0].value)
                                            }
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full max-w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            {models[provider].map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-base font-normal">
                                API Key
                            </div>
                            <Input 
                                type="password" 
                                placeholder="sk-proj-..." 
                                disabled={provider === "ollama"} 
                                onChange={(e) => setApiKey(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <DrawerFooter className="flex flex-row gap-2 justify-end border-t pt-4">
                    <Button variant="outline" onClick={saveSettings}>Save</Button>
                    <Button variant="outline">Cancel</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
