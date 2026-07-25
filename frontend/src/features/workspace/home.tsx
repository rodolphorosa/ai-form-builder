"use client"

import { FormSchema, Item, Project, Section } from "@/types/form"
import { useEffect, useState } from "react"
import { Sidebar } from "./sidebar"
import { Astroid, ChevronDown, EllipsisVertical, FilePlus, FilePlusCorner, Folder, FolderOpen, Form as FormIcon, Import, Pin, PinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { mockProjects, mockSchemas } from "../mock"
import { FormRenderer } from "../form/form"
import { Chevron } from "react-day-picker"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Link } from "@/i18n/navigation";

interface CreationOption {
    icon: React.ComponentType
    title: string
    description: string
    action: () => void
}

export const Workspace = () => {
    const [projects, setProjects] = useState<Project[]>(mockProjects)
    const [forms, setForms] = useState<FormSchema[]>(mockSchemas)

    const workspace = useTranslations("Workspace")

    const options: CreationOption[] = [
        {
            icon: Astroid,
            title: workspace("create with ai"),
            description: "Descreva o que você precisa e a IA irá gerar para você",
            action: () => console.log("criar com ia")
        },
        {
            icon: FilePlusCorner,
            title: workspace("blank"),
            description: "Comece do zero com um formulário em branco.",
            action: () => console.log("criar em branco")
        },
        {
            icon: Import,
            title: workspace("import"),
            description: "Importe um formulário a partir de um arquivo JSON.",
            action: () => console.log("importar json")
        },
    ]


    const tCommon = useTranslations("Common")

    const countItems = (schema: FormSchema) => {
        return schema.sections.reduce((acc, cur) => {
            return acc + cur.items.length
        }, 0)
    }
    
    const renderOptionCard = (option: CreationOption) => {
        const IconComponent = option.icon as React.ComponentType<{ className?: string }>

        return (
            <div 
                className="flex flex-row p-3 gap-4 border rounded-lg shadow-sm h-fit bg-card items-center h-fit w-[240px] cursor-pointer"
                onClick={option.action}
            >
                <div className="p-4 rounded-sm border bg-muted">
                    <IconComponent />
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">{option.title}</div>
                    <div className="text-xs font-normal text-muted-foreground">{option.description}</div>
                </div>

            </div>
        )
    }

    const renderItemThumbnail = (item: Item) => {
        switch (item.type) {
            case "text":
                return <div className="p-1 w-full bg-muted rounded" />

            case "textarea":
                return <div className="p-2 w-full bg-muted rounded" />

            case "checkbox":
                return (
                    <div className="flex gap-1">
                        <div className="size-1.5 border rounded-[1px]" />
                        <div className="flex-1 p-1 w-full bg-muted rounded" />
                    </div>
                )

            case "radio":
                return (
                    <div className="flex gap-1">
                        <div className="size-1.5 rounded-full border" />
                        <div className="flex-1 p-1 w-1/2 bg-muted rounded" />
                    </div>
                )

            case "select":
                return (
                    <div className="p-1 w-full bg-muted rounded flex justify-end items-center px-1">
                        <ChevronDown className="h-1 w-1 shrink-0" />
                    </div>
                )
            default:
                return <div className="p-1 w-full bg-muted rounded" />
        }
    }

    const renderFormCard = (schema: FormSchema) => {
        const id = mockSchemas.indexOf(schema)
        
        return (
            <Link href={`/forms/${id}`}>
                <div 
                    className="group flex flex-col justify-between p-3 gap-4 border rounded-lg shadow-sm h-fit w-[240px] bg-card cursor-pointer"
                >
                    <div className="h-[180px] bg-muted/40 p-3 flex justify-center overflow-hidden">
                        <div 
                            className="
                                flex flex-col gap-1 
                                bg-card border rounded-sm shadow-sm 
                                w-full p-4 scale-[0.95] origin-top overflow-hidden 
                                transition-transform duration-300 group-hover:scale-105"
                        >
                            <div className="text-center text-[8px] font-semibold">
                                {schema.title}
                            </div>
                            <div className="flex flex-col gap-1">
                                {schema.sections.slice(0, 1).map(section => (
                                    <div key={section.id} className="space-y-2">
                                        <div className="text-[8px] font-medium">
                                            {section.label}
                                        </div>

                                        <div className="grid grid-cols-2 gap-1">
                                            {section.items.map(item => (
                                                <div 
                                                    key={item.id} 
                                                    className={cn(
                                                        "space-y-1",
                                                        item.type === "textarea" && " col-span-2"
                                                    )}
                                                >
                                                    <div className="text-[6px] text-muted-foreground">
                                                        {item.label}
                                                    </div>

                                                    {/* <div className="p-1 w-full bg-muted rounded-sm" /> */}
                                                    {renderItemThumbnail(item)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-between">
                        <div className="flex gap-2 items-start min-w-0 flex-1">
                            <FormIcon className="h-4 w-4 shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-1 min-w-0">
                                <div className="text-sm font-medium leading-tight truncate">
                                    {schema.title}
                                </div>

                                <div className="text-xs font-medium text-muted-foreground truncate">
                                    {projects[0]?.name ?? "Sem projeto"}
                                </div>
                                
                                <div className="text-xs font-normal text-muted-foreground self-start">
                                    {tCommon("edited")} há 3 dias
                                </div>
                            </div>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <EllipsisVertical className="h-4 w-4 shrink-0" />
                        </Button>
                    </div>
                </div>
            </Link>
        )
    }

    const renderProjectCard = (project: Project) => {
        return (
            <div className="flex flex-col justify-between p-3 gap-4 border rounded-lg shadow-sm h-fit w-[240px] bg-card">
                <div className="flex flex-row gap-4 justify-between">
                    <div className="flex gap-2 items-start min-w-0 flex-1">
                        <FolderOpen className="h-4 w-4 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1 min-w-0">
                            <div className="text-sm font-medium leading-tight truncate">
                                {project.name}
                            </div>

                            <div className="text-xs text-muted-foreground truncate">
                                3 formulários
                            </div>
                            <div className="text-xs font-normal text-muted-foreground self-start">
                                {tCommon("updated")} há 3 dias
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                </div>
                
            </div>
        )
    }

    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col p-8 gap-8 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Criar novo formulário</div>
                    <div className="flex flex-wrap gap-4 items-start content-start">
                        {options.map(option => renderOptionCard(option))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Continue de onde parou</div>
                    <div className="flex flex-wrap gap-4 items-start content-start mx-auto">
                        {forms.slice(0, 5).map(form => renderFormCard(form))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Seus projetos recentes</div>
                    <div className="flex flex-wrap gap-4 items-start content-start mx-auto">
                        {projects.slice(0, 5).map(project => renderProjectCard(project))}
                    </div>
                </div>
            </div>
        </div>
    )
}