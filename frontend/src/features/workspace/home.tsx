"use client"

import { Form, FormSchema, Item, Project } from "@/types/form"
import { useEffect, useState } from "react"
import { Sidebar } from "./sidebar"
import { Astroid, ChevronDown, EllipsisVertical, File, FilePlusCorner, FileUp, FolderOpen, Form as FormIcon, ImageUp, Import } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation";
import { formService } from "@/api/form.service"
import { projectService } from "@/api/project.service"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FormDropdown } from "./dropdown-menus/formOptions"
import { ProjectDropdown } from "./dropdown-menus/projectOptions"
import { CreateDialog } from "../dialogs/create"
import { useRouter } from "@/i18n/navigation"
import { UploadDialog } from "../dialogs/fileUpload"
import { ImageDialog } from "../dialogs/imageUpload"


interface CreationOption {
    icon: React.ComponentType
    title: string
    description: string
    action?: () => void
    href?: string
}

export const Workspace = () => {
    const router = useRouter()
    
    const [projects, setProjects] = useState<Project[]>([])
    const [forms, setForms] = useState<Form[]>([])

    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [importOpen, setImportOpen] = useState<boolean>(false)
    const [importImageOpen, setImportImageOpen] = useState<boolean>(false)

    const workspace = useTranslations("Workspace")

    const options: CreationOption[] = [
        {
            icon: Astroid,
            title: workspace("create with ai"),
            description: "Descreva o que você precisa e a IA irá gerar para você",
            action: () => console.log("criar com ia"),
            href: "/forms/new"
        },
        {
            icon: File,
            title: workspace("blank"),
            description: "Comece do zero com um formulário em branco.",
            action: () => setCreateOpen(true)
        },
        {
            icon: FileUp,
            title: workspace("file up"),
            description: "Importe um formulário a partir de um arquivo JSON.",
            action: () => setImportOpen(true)
        },
        {
            icon: ImageUp,
            title: workspace("image up"),
            description: "Importe um formulário a partir de uma foto ou desenho.",
            action: () => setImportImageOpen(true)
        }
    ]

    const getForms = async () => {
        try {
            const response = await formService.getAll()
            setForms(sortByUpdate(response.data) as Form[])

        } catch (err) {
            console.log(err)
        } finally {

        }
    }

    const getProjects = async () => {
        try {
            const response = await projectService.getAll()
            setProjects(sortByUpdate(response.data) as Project[])

        } catch (err) {
            console.log(err)
        } finally {

        }
    }

    useEffect(() => {

        getForms()
        getProjects()

    }, [])


    const common = useTranslations("Common")

    const sortByUpdate = (array: Form[] | Project[]): Form[] | Project[] => {
        return array.sort((a, b) => b.updatedAt - a.updatedAt)
    }

    const countItems = (schema: FormSchema) => {
        return schema.sections.reduce((acc, cur) => {
            return acc + cur.items.length
        }, 0)
    }

    const parseUpdateDate = (updatedAt: number) => {
        return formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            locale: ptBR,
        })
    }

    const onCreate = async (form: Partial<Form>) => {
        try {
            const response = await formService.createBlank(form)
            router.push(`/forms/${response.data.id}`)

        } catch(err) {
            console.log(err)

        } finally {

        }
    }

    
    const renderOptionCard = (option: CreationOption) => {
        const IconComponent = option.icon as React.ComponentType<{ className?: string }>

        return (
            <Link href={option.href ?? ""}>
                <div 
                    className="flex flex-row p-3 gap-4 border rounded-lg shadow-sm h-fit bg-card items-center h-fit w-[240px] cursor-pointer"
                    onClick={(e) => {
                        if (!option.href) {
                            e.preventDefault()
                            option.action?.()
                        }
                    }}
                >
                    <div className="p-4 rounded-sm border bg-muted">
                        <IconComponent />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium">{option.title}</div>
                        <div className="text-xs font-normal text-muted-foreground">{option.description}</div>
                    </div>

                </div>
            </Link>
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

    const renderFormCard = (form: Form) => {
        return (
            <Link href={`/forms/${form.id}`}>
                <div className="group border rounded-lg shadow-sm h-fit w-[240px]">
                    <div className="h-[180px] bg-muted/60 p-2 flex justify-center overflow-hidden">
                        <div 
                            className="
                                flex flex-col gap-1 
                                bg-card border rounded-sm shadow-sm 
                                w-full p-4 scale-[0.95] origin-top overflow-y-auto 
                                transition-transform duration-300 group-hover:scale-100"
                        >
                            <div className="text-center text-[8px] font-semibold">
                                {form.name}
                            </div>
                            <div className="flex flex-col gap-1">
                                {form.schema.sections.map(section => (
                                    <div key={section.id} className="space-y-2">
                                        <div className="text-[8px] font-medium">
                                            {section.label}
                                        </div>

                                        <div className="flex flex-col gap-1">
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
                                                    {renderItemThumbnail(item)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div 
                        className="flex flex-col justify-between p-3 gap-4 rounded-b-lg bg-card cursor-pointer"
                    >
                        <div className="flex flex-row gap-4 justify-between">
                            <div className="flex flex-col gap-1 min-w-0">
                                <div className="text-sm font-medium leading-tight truncate">
                                    {form.name}
                                </div>

                                <div className="text-xs font-medium text-muted-foreground truncate">
                                    {projects.find(it => it.id === form.projectId)?.name ?? "Sem projeto"}
                                </div>
                                
                                <div className="text-xs font-normal text-muted-foreground self-start">
                                    {common("edited")} {parseUpdateDate(form.updatedAt)}
                                </div>
                            </div>
                            <FormDropdown 
                                projects={projects}
                                onRename={() => {}}
                                onMove={() => []}
                                onExport={() => {}}
                                onPin={() => {}}
                                onArchive={() => {}}
                                onDuplicate={() => []}
                                onDelete={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    const renderProjectCard = (project: Project) => {
        return (
            <div className="flex flex-col justify-between p-3 gap-4 border rounded-lg shadow-sm h-fit w-[240px] bg-card">
                <div className="flex flex-row gap-4 justify-between">
                    <div className="flex flex-col gap-1 min-w-0">
                        <div className="text-sm font-medium leading-tight truncate">
                            {project.name}
                        </div>

                        <div className="text-xs text-muted-foreground truncate">
                            3 formulários
                        </div>
                        <div className="text-xs font-normal text-muted-foreground self-start">
                            {common("updated")} {parseUpdateDate(project.updatedAt)}
                        </div>
                    </div>
                    <ProjectDropdown 
                        onRename={() => {}}
                        onPin={() => {}}
                        onArchive={() => {}}
                        onDelete={() => {}}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <Sidebar forms={forms} projects={projects} />
            <div className="flex flex-col p-8 gap-8 overflow-y-auto mx-auto">
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Criar novo formulário</div>
                    <div className="flex flex-wrap gap-4 items-start content-start">
                        {options.map(option => renderOptionCard(option))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Continue de onde parou</div>
                    <div className="flex flex-wrap gap-4 items-start content-start ">
                        {forms.slice(0, 4).map(form => renderFormCard(form))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Seus projetos recentes</div>
                    <div className="flex flex-wrap gap-4 items-start content-start ">
                        {projects.slice(0, 4).map(project => renderProjectCard(project))}
                    </div>
                </div>
                <CreateDialog onCreate={onCreate} open={createOpen} onOpenChange={setCreateOpen} />
                <UploadDialog onUpload={(form) => console.log(form)} open={importOpen} onOpenChange={setImportOpen}/>
                <ImageDialog open={importImageOpen} onOpenChange={setImportImageOpen} />
            </div>
        </div>
    )
}