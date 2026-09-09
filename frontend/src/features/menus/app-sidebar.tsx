"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
    Collapsible, 
    CollapsibleContent, 
    CollapsibleTrigger 
} from "@/components/ui/collapsible"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarGroupLabel, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem, 
    SidebarMenuSkeleton, 
    SidebarSeparator, 
    SidebarTrigger, 
    useSidebar 
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useWorkspace } from "@/contexts/workspace-context"
import { Link, useRouter } from "@/i18n/navigation"
import { 
    Archive, 
    Astroid, 
    ChevronDown, 
    ChevronsUpDown, 
    CircleUser, 
    FolderClosed, 
    Home, 
    LibraryBig, 
    LogOut, 
    Pin, 
    PinOff, 
    Search, 
    Settings, 
    Trash2, 
    User 
} from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { FormDropdown } from "../workspace/dropdown-menus/form-options"
import { ProjectDropdown } from "../workspace/dropdown-menus/project-options"
import useForms from "@/hooks/use-forms"
import useProjects from "@/hooks/use-projects"
import { Button } from "@/components/ui/button"
import DeleteForm from "../dialogs/delete-form"
import { Form, MoveAction, Project } from "@/types/form"
import { SettingsDialog } from "../dialogs/settings/settings"
import { ProjectCreate } from "../dialogs/project"
import { RenameForm } from "../dialogs/rename-form"
import { RenameProject } from "../dialogs/rename-project"

interface MenuOption {
    icon: React.ComponentType
    title: string
    action?: () => void
    href: string
}

function AppSidebar () {
    const i18nSidebar = useTranslations("Sidebar")
    const i18nCommon = useTranslations("Common")

    const { setOpen } = useSidebar()

    const { forms, projects } = useWorkspace()
    const { user, logout } = useAuth()
    const router = useRouter()

    const [openItemId, setOpenItemId] = useState<string | null>()
    const [hoverItemId, setHoverItemId] = useState<string | null>()

    const [projectCreateOpen, setProjectCreateOpen] = useState<boolean>(false)
    const [renameFormOpen, setRenameFormOpen] = useState<boolean>(false)
    const [renameProjectOpen, setRenameProjectOpen] = useState<boolean>(false)

    const [formToRename, setFormToRename] = useState<Form | null>(null)
    const [projectToRename, setProjectToRename] = useState<Project | null>(null)

    const [deleteFormOpen, setDeleteFormOpen] = useState<boolean>(false)
    const [formToDelete, setFormToDelete] = useState<Form | null>(null)

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)

    const [moveAction, setMoveAction] = useState<MoveAction | undefined>()

    const {
        renameForm,
        moveForm,
        moveToNewProject,
        exportForm,
        pinForm,
        unpinForm,
        archiveForm,
        duplicateForm,
        deleteForm
    } = useForms()
    
    const {
        renameProject,
        pinProject,
        unpinProject,
        archiveProject,
        deleteProject
    } = useProjects()

    const menuOptions: MenuOption[] = [
        {
            icon: Home,
            title: "Home",
            action: () => {},
            href: '/'
        },
        {
            icon: Search,
            title: i18nSidebar("search"),
            action: () => {},
            href: '/search'
        },
        {
            icon: LibraryBig,
            title: i18nSidebar("library"),
            action: () => {},
            href: '/library'
        },
        {
            icon: FolderClosed,
            title: i18nSidebar("projects"),
            action: () => {},
            href: '/projects'
        },
        {
            icon: Archive,
            title: i18nSidebar("archived"),
            action: () => {},
            href: '/archived'
        },
        {
            icon: Trash2,
            title: i18nSidebar("trash"),
            action: () => {},
            href: '/trash'
        },
    ]
    const pinnedForms = forms.filter(it => it.pinned == true)
    const pinnedProjects = projects.filter(it => it.pinned == true)

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
    
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex flex-row items-center justify-between">
                        <SidebarMenuButton onClick={() => setOpen(true)} className="flex-1">
                            <Astroid />
                            <span className="font-semibold">Smart Form Builder</span>
                        </SidebarMenuButton>
                        <SidebarTrigger className="group-data-[collapsible=icon]:hidden shrink-0" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuOptions.map(option => {
                                const IconComponent = option.icon as React.ComponentType<{ className?: string }>

                                return (
                                    <Link
                                        key={option.title}
                                        href={option.href}
                                    >
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                tooltip={option.title}
                                            >
                                                <IconComponent className="h-5 w-5 shrink-0" />
                                                {option.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </Link>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-4">
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarGroupLabel 
                                        render={
                                            <CollapsibleTrigger />
                                        }
                                        className="flex justify-between text-sm"
                                    >
                                        {i18nSidebar("pinned")}
                                        <ChevronDown className="h-4 w-4 shrink-0" />
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <div className="flex flex-col">
                                            {pinnedProjects.map(project => (
                                                <Link
                                                    key={`pinned-${project.id}`}
                                                    href={`/projects/${project.id}`}
                                                >
                                                    <div 
                                                        className="w-full group/pinned flex flex-row items-center rounded-lg justify-between hover:bg-muted cursor-pointer"
                                                        onMouseEnter={() => setHoverItemId(project.id)}
                                                        onMouseLeave={() => setHoverItemId(null)}
                                                    >
                                                        <div className="flex flex-row gap-1 items-center truncate py-2 pl-2">
                                                            <FolderClosed className="h-4 w-4 shrink-0"/>
                                                            <span className="truncate">{project.name}</span>
                                                        </div>
                                                        {project.id == hoverItemId && (
                                                            <div className="flex flex-row items-center">
                                                                <PinOff 
                                                                    className="h-3 w-3 shrink-0 rotate-30 mx-1 text-muted-foreground hover:text-foreground" 
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        unpinProject(project)
                                                                    }}
                                                                />
                                                                <ProjectDropdown 
                                                                    project={project}
                                                                    onRename={() => {}}
                                                                    onPin={(project) => pinProject(project)}
                                                                    onUnpin={(project) => unpinProject(project)}
                                                                    onArchive={(project) => archiveProject(project)}
                                                                    onDelete={(project) => deleteProject(project)}
                                                                    className="text-muted-foreground hover:text-foreground"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                            {pinnedForms.map(form => (
                                                <Link
                                                    key={`pinned-${form.id}`}
                                                    href={`/forms/${form.id}`}
                                                >
                                                    <div 
                                                        className="w-full group/pinned flex flex-row items-center rounded-lg justify-between hover:bg-muted cursor-pointer"
                                                        onMouseEnter={() => setHoverItemId(form.id)}
                                                        onMouseLeave={() => setHoverItemId(null)}
                                                    >
                                                        <div className="truncate py-2 pl-2">
                                                            <span className="truncate">{form.name}</span>
                                                        </div>
                                                        {form.id == hoverItemId && (
                                                            <div className="flex flex-row items-center">
                                                                <PinOff 
                                                                    className="h-3 w-3 shrink-0 rotate-30 mx-1 text-muted-foreground hover:text-foreground" 
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        unpinForm(form)
                                                                    }}
                                                                />
                                                                <FormDropdown 
                                                                    form={form}
                                                                    projects={projects}
                                                                    onRename={(form) => {
                                                                        setFormToRename(form)
                                                                        setRenameFormOpen(true)
                                                                    }}
                                                                    onExport={(form, format) => exportForm(form, format)}
                                                                    onPin={(form) => pinForm(form)}
                                                                    onUnpin={(form) => unpinForm(form)}
                                                                    onArchive={(form) => archiveForm(form)}
                                                                    onDelete={(form) => {
                                                                        setFormToDelete(form)
                                                                        setDeleteFormOpen(true)
                                                                    }}
                                                                    onDuplicate={(form) => duplicateForm(form)}
                                                                    onMove={(action) => onMoveForm(action)}
                                                                    className="text-muted-foreground hover:text-foreground"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarGroupLabel
                                        render={
                                            <CollapsibleTrigger />
                                        }
                                        className="flex justify-between text-sm"
                                    >
                                        {i18nCommon("recent")}
                                        <ChevronDown className="h-4 w-4 shrink-0" />
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <div className="flex flex-col">
                                            {forms.filter(it => !it.pinned).map(form => (
                                                <Link 
                                                    key={`recent-${form.id}`}
                                                    href={`/forms/${form.id}`}
                                                >
                                                    <div 
                                                        className="w-full group/recent flex flex-row items-center rounded-lg justify-between hover:bg-muted cursor-pointer"
                                                        onMouseEnter={() => setHoverItemId(form.id)}
                                                        onMouseLeave={() => setHoverItemId(null)}
                                                    >
                                                        <div className="truncate py-2 pl-2">
                                                            <span className="truncate">{form.name}</span>
                                                        </div>
                                                        {form.id === hoverItemId && (
                                                            <div className="flex flex-row items-center">
                                                                <Pin 
                                                                    className="h-3 w-3 shrink-0 rotate-30 mx-1 text-muted-foreground hover:text-foreground" 
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        pinForm(form)
                                                                    }}
                                                                />
                                                                <FormDropdown 
                                                                    form={form}
                                                                    projects={projects}
                                                                    onRename={(form) => {
                                                                        setFormToRename(form)
                                                                        setRenameFormOpen(true)
                                                                    }}
                                                                    onMove={(action) => onMoveForm(action)}
                                                                    onExport={(form, format) => exportForm(form, format)}
                                                                    onPin={(form) => pinForm(form)}
                                                                    onUnpin={(form) => unpinForm(form)}
                                                                    onArchive={(form) => archiveForm(form)}
                                                                    onDelete={(form) => {
                                                                        setFormToDelete(form)
                                                                        setDeleteFormOpen(true)
                                                                    }}
                                                                    onDuplicate={(form) => duplicateForm(form)}
                                                                    className="text-muted-foreground hover:text-foreground"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <SidebarMenuSkeleton />
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">
                                                <User className="h-4 w-4 shrink-0" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                            <span className="truncate font-medium">{user?.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                                    </SidebarMenuButton>
                                }
                            />
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="right"
                                align="end"
                                sideOffset={4}
                            >
                                <div className="flex flex-row gap-2 p-2">
                                    <Avatar>
                                        <AvatarFallback>
                                            <User className="h-4 w-4 shrink-0" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-sm font-medium">{user?.name}</div>
                                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <CircleUser className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("profile")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setSettingsOpen(true)
                                        }}
                                    >
                                        <Settings className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("settings")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={logout}>
                                        <LogOut className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("logout")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            {formToDelete && (
                <DeleteForm 
                    form={formToDelete} 
                    open={deleteFormOpen} 
                    onOpenChange={setDeleteFormOpen} 
                    onDelete={(form) => {
                        deleteForm(form)
                        setFormToDelete(null)
                    }}
                />
            )}
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
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
        </Sidebar>
    )
}

export default AppSidebar