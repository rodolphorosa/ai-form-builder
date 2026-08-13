"use client"

import { Form, FormSchema, Item, MoveAction, Project } from "@/types/form"
import { useEffect, useState } from "react"
import { Sidebar } from "./sidebar"
import { Astroid, ChevronDown, File, FileUp, ImageUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"

import { formatDistanceToNow, Locale } from "date-fns"
import { ptBR, enUS, de, es, fr } from "date-fns/locale"
import { FormDropdown } from "./dropdown-menus/form-options"
import { ProjectDropdown } from "./dropdown-menus/project-options"
import { CreateDialog } from "../dialogs/form"
import { useRouter } from "@/i18n/navigation"
import { FileDialog } from "../dialogs/json-upload"
import { ImageDialog } from "../dialogs/image-upload"
import { ProjectCreate } from "../dialogs/project"
import { useAuth } from "@/contexts/auth-context"
import { RenameForm } from "../dialogs/rename-form"
import { useWorkspace } from "@/contexts/workspace-provider"
import useForms from "@/hooks/use-forms"
import useProjects from "@/hooks/use-projects"
import { RenameProject } from "../dialogs/rename-project"


interface CreationOption {
    icon: React.ComponentType
    title: string
    description: string
    action?: () => void
    href?: string
}

export const Workspace = () => {
    const router = useRouter()
    const locale = useLocale()
    
    const { isLoading, isAuthenticated } = useAuth()
    const { projects, forms } = useWorkspace()
    
    const {
        createForm,
        renameForm,
        moveToNewProject,
        moveForm,
        pinForm,
        unpinForm,
        archiveForm,
        duplicateForm,
        deleteForm,
        exportForm
    } = useForms()
    
    const {
        renameProject,
        pinProject,
        unpinProject,
        archiveProject,
        deleteProject
    } = useProjects()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login")
        }
    }, [isLoading, isAuthenticated, router])

    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [importOpen, setImportOpen] = useState<boolean>(false)
    const [importImageOpen, setImportImageOpen] = useState<boolean>(false)
    const [projectCreateOpen, setProjectCreateOpen] = useState<boolean>(false)
    const [renameFormOpen, setRenameFormOpen] = useState<boolean>(false)
    const [renameProjectOpen, setRenameProjectOpen] = useState<boolean>(false)

    const [formToRename, setFormToRename] = useState<Form | null>(null)
    const [projectToRename, setProjectToRename] = useState<Project | null>(null)
    
    const [moveAction, setMoveAction] = useState<MoveAction | undefined>()

    const workspace = useTranslations("Workspace")

    const options: CreationOption[] = [
        {
            icon: Astroid,
            title: workspace("create with ai"),
            description: workspace("create with ai / subtext"),
            action: () => {},
            href: "/forms/new"
        },
        {
            icon: File,
            title: workspace("blank"),
            description: workspace("blank / subtext"),
            action: () => setCreateOpen(true)
        },
        {
            icon: FileUp,
            title: workspace("file up"),
            description: workspace("file up / subtext"),
            action: () => setImportOpen(true)
        },
        {
            icon: ImageUp,
            title: workspace("image up"),
            description: workspace("image up / subtext"),
            action: () => setImportImageOpen(true)
        }
    ]

    const common = useTranslations("Common")

    const countItems = (schema: FormSchema) => {
        return schema.sections.reduce((acc, cur) => {
            return acc + cur.items.length
        }, 0)
    }

    const parseUpdateDate = (updatedAt: number) => {
        const language: Locale = {
            "pt": ptBR,
            "en": enUS,
            "de": de,
            "es": es,
            "fr": fr
        }[locale] ?? ptBR

        return formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            locale: language,
        })
    }

    const onCreate = async (form: Partial<Form>) => {
        try {
            const createdForm = await createForm(form)
            router.push(`/forms/${createdForm.id}`)
        } catch(err) {
            console.error(err)
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

    const onMoveForm = (action: MoveAction) => {
        if (action.type == "create") {
            setProjectCreateOpen(true)
            setMoveAction(action)
        }

        if (action.type == "search") {

        }

        if (action.type == "project") {
            moveForm(action.form, action.project)
        }
    }

    const onCreateProject = async (name: string, description: string) => {
        try {
            await moveToNewProject(name, description, moveAction!.form)
        } catch(err) {
            console.error(err)
        } finally {
            setProjectCreateOpen(false)
            setMoveAction(undefined)
        }
    }

    const onDuplicateForm = async (form: Form) => {
        try {
            await duplicateForm(form)
        } catch(error) {
            console.error(error)
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
                                
                                <div className="text-xs font-normal text-muted-foreground self-start truncate">
                                    {common("edited")} {parseUpdateDate(form.updatedAt)}
                                </div>
                            </div>
                            <FormDropdown 
                                form={form}
                                projects={projects}
                                onRename={(form) => {
                                    setFormToRename(form)
                                    setRenameFormOpen(true)
                                }}
                                onMove={(action) => onMoveForm(action)}
                                onExport={() => {}}
                                onPin={(form) => pinForm(form)}
                                onUnpin={(form) => unpinForm(form)}
                                onArchive={(form) => archiveForm(form)}
                                onDuplicate={(form) => onDuplicateForm(form)}
                                onDelete={(form) => deleteForm(form)}
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
                        <div className="text-xs font-normal text-muted-foreground self-start truncate">
                            {common("updated")} {parseUpdateDate(project.updatedAt)}
                        </div>
                    </div>
                    <ProjectDropdown 
                        project={project}
                        onRename={(project) => {
                            setProjectToRename(project)
                            setRenameProjectOpen(true)
                        }}
                        onPin={(project) => pinProject(project)}
                        onUnpin={(project) => unpinProject(project)}
                        onArchive={(project) => archiveProject(project)}
                        onDelete={(project) => deleteProject(project)}
                    />
                </div>
            </div>
        )
    }

    if (isLoading || !isAuthenticated) {
        return null
    }

    return (
        <div className="flex flex-row h-screen w-screen overflow-hidden">
            <Sidebar forms={forms} projects={projects} />
            <div className="flex flex-col p-8 gap-8 overflow-y-auto mx-auto">
                <div className="flex flex-col gap-2 max-w-[976px]">
                    <span className="text-2xl flex flex-row gap-2 items-center">
                        <Astroid className="text-indigo-600 fill-indigo-600/10" />
                        {workspace("create today")}
                    </span>
                    <span className="text-lg">
                        {workspace("use AI to create")}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">Criar novo formulário</div>
                    <div className="flex flex-wrap gap-4 items-start content-start">
                        {options.map(option => renderOptionCard(option))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-auto">
                    <div 
                        className="
                            w-full 
                            flex flex-row 
                            items-center justify-between 
                            text-sm font-medium"
                        >
                        <span>
                            {workspace("keep on")}
                        </span>
                        {forms.length > 4 && (
                            <span className="text-muted-foreground cursor-pointer">
                                {workspace("see more")}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4 items-start content-start ">
                        {forms.slice(0, 4).map(form => renderFormCard(form))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-auto">
                    <div 
                        className="
                            w-full 
                            flex flex-row 
                            items-center justify-between 
                            text-sm font-medium"
                        >
                        <span>
                            {workspace("your recent projects")}
                        </span>
                        {projects.length > 4 && (
                            <span className="text-muted-foreground cursor-pointer">
                                {workspace("see more")}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4 items-start content-start ">
                        {projects.slice(0, 4).map(project => renderProjectCard(project))}
                    </div>
                </div>
                <CreateDialog onCreate={onCreate} open={createOpen} onOpenChange={setCreateOpen} />
                <FileDialog open={importOpen} onOpenChange={setImportOpen}/>
                <ImageDialog open={importImageOpen} onOpenChange={setImportImageOpen} />
                <ProjectCreate 
                    open={projectCreateOpen} 
                    onOpenChange={setProjectCreateOpen} 
                    onCreate={onCreateProject} 
                />
                <RenameForm 
                    form={formToRename!} 
                    open={renameFormOpen} 
                    onOpenChange={setRenameFormOpen} 
                    onSave={(form, name) => {
                        renameForm(form, name)
                        setFormToRename(null)
                        setRenameFormOpen(false)
                    }}
                    onCancel={() => {}} 
                />
                <RenameProject 
                    project={projectToRename!}
                    open={renameProjectOpen}
                    onOpenChange={setRenameProjectOpen}
                    onSave={(project, name) => {
                        renameProject(project, name)
                        setProjectToRename(null)
                        setRenameProjectOpen(false)
                    }}
                    onCancel={() => {}}
                />
            </div>
        </div>
    )
}