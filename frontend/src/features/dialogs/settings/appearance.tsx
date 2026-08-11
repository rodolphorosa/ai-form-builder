import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuContainer } from "./common"
import { useTranslations, useLocale } from "next-intl"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useInstantTransition } from "motion/react"

export const Appearance = () => {
    const { theme, setTheme } = useTheme()

    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const themes = useTranslations("Theme")
    const languages = useTranslations("Languages")
    const settings = useTranslations("Settings")

    const themeOptions = [
        { value: "light", label: themes("light") },
        { value: "dark", label: themes("dark") },
        { value: "system", label: themes("system") }
    ]

    const languageOptions = [
        { value: "pt", label: languages("pt") },
        { value: "en", label: languages("en") },
        { value: "de", label: languages("de") },
        { value: "es", label: languages("es") },
        { value: "fr", label: languages("fr") },
    ]

    const handleLanguageChange = (locale: string) => {
        router.replace(pathname, { locale })
    }
    
    return (
        <div className="flex flex-col">
            <span className="p-2 text-sm">
                {settings("appearance")}
            </span>
            <Separator className="mt-4"/>
            <div className="flex flex-row p-2 items-center justify-between">
                <span>{settings("theme")}</span>
                <Select items={themeOptions} value={theme} onValueChange={(theme) => setTheme(theme ?? "light")}>
                    <SelectTrigger className="w-fit border-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit bg-white">
                        <SelectGroup>
                            {themeOptions?.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value}>
                                {theme.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator />
            <div className="flex flex-row p-2 items-center justify-between">
                <span>{settings("language")}</span>
                <Select items={languageOptions} value={locale} onValueChange={(locale) => handleLanguageChange(locale ?? "en")}>
                    <SelectTrigger className="w-fit border-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit bg-white">
                        <SelectGroup>
                            {languageOptions.map((language) => (
                                <SelectItem key={language.value} value={language.value}>
                                    {language.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}