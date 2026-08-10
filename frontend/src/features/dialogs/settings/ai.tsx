"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Option } from "@/types/form"
import { useTranslations } from "next-intl"
import { useState } from "react"

export const AI = () => {
    const settings = useTranslations("Settings")

    const [provider, setProvider] = useState<string>("openai")
    const [model, setModel] = useState<string>("gpt-4.1-nano")

    const providers: Option[] = [
        { value: "gemini", label: "Gemini" },
        { value: "ollama", label: "Ollama" },
        { value: "openai", label: "OpenAI" },
    ]

    const models: Record<string, Option[]> = {
        "gemini": [
            { value: "gemini-2.5-flash", label: "gemini-2.5-flash" }
        ],
        "ollama": [
            { value: "llama3.2", label: "llama3.2" }
        ],
        "openai": [
            { value: "gpt-4.1-nano", label: "gpt-4.1-nano" },
            { value: "gpt-5-mini", label: "gpt-5-mini" },
            { value: "gpt-5-nano", label: "gpt-5-nano" }
        ]
    }

    return (
        <div className="flex flex-col">
            <span className="p-2 text-sm">
                {settings("ai")}
            </span>
            <Separator className="mt-4"/>
            <div className="flex flex-row p-2 items-center justify-between">
                <span>Preferred provider</span>
                <Select items={providers} value={provider} onValueChange={(provider) => setProvider(provider ?? "openai")}>
                    <SelectTrigger className="w-fit border-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit bg-white">
                        <SelectGroup>
                            {providers.map(provider => (
                                <SelectItem key={provider.value} value={provider.value}>
                                    {provider.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
            <div className="flex flex-row p-2 items-center justify-between">
                <span>Preferred model</span>
                <Select items={providers} value={model} onValueChange={(model) => setModel(model ?? "gpt-4.1-nano")}>
                    <SelectTrigger className="w-fit border-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit bg-white">
                        <SelectGroup>
                            {models[provider].map(model => (
                                <SelectItem key={model.value} value={model.value}>
                                    {model.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}