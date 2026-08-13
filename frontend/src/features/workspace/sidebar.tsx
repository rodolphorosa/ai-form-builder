"use client"

import { Form, Project } from "@/types/form"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { EllipsisVertical, Form as FormIcon, Pencil, FolderOpen, Pin, Archive, Trash, Astroid, SquarePen, Search, User, CircleUser, Settings, LogOut, Trash2, House, FolderInput, FolderPlus, FolderSearch, Download, FileBraces, Copy, File, LibraryBig, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import { FaRegFilePdf } from "react-icons/fa"
import { FormDropdown } from "./dropdown-menus/form-options"
import { ProjectDropdown } from "./dropdown-menus/project-options"
import { cn } from "@/lib/utils"
import { SettingsDialog } from "../dialogs/settings/settings"
import { useAuth } from "@/contexts/auth-context"
import useForms from "@/hooks/use-forms"
import useProjects from "@/hooks/use-projects"

interface Props {
    forms: Form[]
    projects: Project[]
}

export const Sidebar = ({ forms, projects }: Props) => {
    const { user, logout } = useAuth()

    const {
        renameForm,
        moveForm,
        moveToNewProject,
        pinForm,
        unpinForm,
        archiveForm,
        deleteForm,
        duplicateForm,
        exportForm
    } = useForms()

    const {
        renameProject,
        pinProject,
        unpinProject,
        archiveProject,
        deleteProject
    } = useProjects()

    const sidebari18n = useTranslations("Sidebar")

    const [hasScroll, setHasScroll] = useState(false)
    
    const [recentOpen, setRecentOpen] = useState<boolean>(true)
    const [pinnedOpen, setPinnedOpen] = useState<boolean>(true)

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setHasScroll(e.currentTarget.scrollTop > 0)
    }

    const [showSettings, setShowSettings] = useState<boolean>(false)

    const renderRecent = (form: Form, displayIcon: boolean = false) => {
        return (
            <Link href={`/forms/${form.id}`}>
                <div className="w-full group flex flex-row items-center rounded-sm justify-between hover:bg-muted cursor-pointer">
                    <div className="flex-1 min-w-0 flex text-sm font-normal px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm truncate">
                        {displayIcon && <FileText className="h-4 w-4 shrink-0" />}
                        <span className="truncate">{form.name}</span>
                    </div>
                    <FormDropdown 
                        form={form}
                        projects={projects}
                        onRename={() => {}}
                        onMove={() => {}}
                        onExport={() => {}}
                        onPin={pinForm}
                        onUnpin={unpinForm}
                        onArchive={archiveForm}
                        onDuplicate={duplicateForm}
                        onDelete={deleteForm}
                    />
                </div>
            </Link>
        )
    }

    const renderPinnedProject = (project: Project) => {
        return (
            <Link href="">
                <div className="w-full group flex flex-row items-center rounded-sm justify-between hover:bg-muted cursor-pointer">
                    <div className="flex-1 min-w-0 flex text-sm font-normal px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm truncate">
                        <FolderOpen className="h-4 w-4 shrink-0" />
                        <span className="truncate">{project.name}</span>
                    </div>
                    <ProjectDropdown 
                        project={project}
                        onRename={() => {}}
                        onPin={pinProject}
                        onUnpin={unpinProject}
                        onArchive={archiveProject}
                        onDelete={deleteProject}
                    />
                </div>
            </Link>
        )
    }

    const pinnedForms = forms.filter(it => it.pinned == true)
    const pinnedProjects = projects.filter(it => it.pinned == true)

    return (
        <div className="flex flex-col h-full w-[300px] min-h-0 border-r bg-card">
            <div className={cn(
                "flex flex-col gap-2 p-1 justify-left",
                hasScroll && "border-b"
            )}>
                <div className="p-3">
                    <Button variant="outline" size="icon" className="border rounded-full">
                        <Astroid className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-row py-2 px-3 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                    <SquarePen className="h-4 w-4" />
                    {sidebari18n("new form")}
                </div>
            </div>
            <div className="gap-2 h-[100%] overflow-hidden">
                <div className="flex flex-col gap-3 h-full px-1 overflow-y-auto" onScroll={handleScroll}>
                    <div className="flex flex-col sticky">
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <House className="h-4 w-4" />
                            Home
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <Search className="h-4 w-4" />
                            {sidebari18n("search")}
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <LibraryBig className="h-4 w-4" />
                            {sidebari18n("library")}
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <FolderOpen className="h-4 w-4" />
                            {sidebari18n("projects")}
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <Archive className="h-4 w-4" />
                            {sidebari18n("archived")}
                        </div>
                        <div className="flex flex-row px-3 py-2 gap-2 text-sm font-normal items-center hover:bg-muted rounded-sm cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                            {sidebari18n("trash")}
                        </div>
                    </div>
                    {(pinnedForms.length > 0 || pinnedProjects.length > 0) && (
                        <Collapsible key="pinned" open={pinnedOpen} className="flex flex-col">
                            <div className="px-3 py-2 text-sm font-medium" onClick={() => setPinnedOpen(!pinnedOpen)}>
                                {sidebari18n("pinned")}
                            </div>
                            <CollapsibleContent className="pt-0.5">
                                <div className="flex flex-col gap-0.5">
                                    {pinnedProjects.map(project => renderPinnedProject(project))}
                                    {pinnedForms.map(form => renderRecent(form, true))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                    <Collapsible key="recent" open={recentOpen} className="flex flex-col">
                        <div className="px-3 py-2 text-sm font-medium" onClick={() => setRecentOpen(!recentOpen)}>
                            {sidebari18n("recent")}
                        </div>
                        <CollapsibleContent className="pt-0.5">
                            <div className="flex flex-col gap-0.5">
                                {forms.filter(it => it.pinned == false).map(form => renderRecent(form))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
            <Separator />
            <div className="flex p-4 cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <div className="flex flex-row gap-2">
                            <Avatar>
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5">
                                <div className="text-sm font-medium truncate">
                                    {user?.name}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    }/>
                    <DropdownMenuContent className="w-auto">
                        <div className="flex flex-row gap-2 p-2">
                            <Avatar>
                                <AvatarFallback>
                                    <User className="h-4 w-4"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm font-medium">{user?.name}</div>
                                <div className="text-xs text-muted-foreground">{user?.email}</div>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <CircleUser className="h-4 w-4" />
                                {sidebari18n("profile")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowSettings(!showSettings)}>
                                <Settings className="h-4 w-4" />
                                {sidebari18n("settings")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive" onClick={logout}>
                                <LogOut className="h-4 w-4" />
                                {sidebari18n("logout")}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <SettingsDialog open={showSettings} onOpenChange={setShowSettings}/>
        </div>
    )
}