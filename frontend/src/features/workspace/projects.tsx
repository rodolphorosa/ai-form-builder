"use client"

import { useState } from "react"

import { useLocale, useTranslations } from "next-intl"
import { Project } from "@/types/form"
import { mockProjects } from "../mock"
import { Archive, Ellipsis, EllipsisVertical, FolderClosed, FolderOpen, Pencil, Pin, PinOff, Plus, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import useProjects from "@/hooks/use-projects"
import { useWorkspace } from "@/contexts/workspace-context"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import DataTable from "../table/table"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { parseUpdateDate } from "@/lib/utils"
import AppContentWrapper from "../common/app-content-wrapper"

export function Projects () {
    const i18nCommon = useTranslations("Common")
    const i18nWorkspace = useTranslations("Workspace")
    const i18nForms = useTranslations("Forms")
    const i18nProjects = useTranslations("Projects")

    const locale = useLocale()

    const { 
        projects, 
        refreshForms, 
        refreshProjects 
    } = useWorkspace()

    const {
        renameProject,
        pinProject,
        unpinProject,
        archiveProject,
        deleteProject
    } = useProjects()

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: "name",
            header: i18nCommon("name"),
            cell: ({ row }) => {
                const project = row.original

                const formCount = project.formCount

                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="p-2 bg-indigo-400/25 text-indigo-400 rounded-sm">
                            <FolderClosed className="h-4 w-4 shrink-0"/>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm">
                                {project.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {
                                    formCount ? (
                                        formCount > 1? 
                                        `${formCount} ${i18nCommon("forms")}` : 
                                        `${formCount} ${i18nCommon("form")}`
                                    ) : "Sem formulários"
                                }
                            </span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorFn: (project: Project) => parseUpdateDate(project.updatedAt, locale),
            header: i18nCommon("updated")
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const project = row.original
    
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                            render={
                                <Button 
                                    size="icon" 
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <Ellipsis className="h-4 w-4 shrink-0" />
                                </Button>
                            } 
                        />
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    className="text-sm font-medium"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <Pencil className="h-4 w-4 shrink-0" />
                                    {i18nCommon("rename")}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-sm font-medium"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        pinProject(project)
                                    }}
                                >
                                    <Pin className="h-4 w-4 shrink-0" />
                                    {i18nCommon("pin")}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-sm font-medium"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        archiveProject(project)
                                    }}
                                >
                                    <Archive className="h-4 w-4 shrink-0" />
                                    {i18nCommon("archive")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    variant="destructive" 
                                    className="text-sm font-medium"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteProject(project)
                                    }}
                                >
                                    <Trash className="h-4 w-4 shrink-0" />
                                    {i18nCommon("delete")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]
    
    return (
        <AppContentWrapper>
            <div className="w-[1072px] h-fit flex flex-col p-8 gap-8 mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="text-2xl font-normal">
                        {i18nCommon("projects")}
                    </div>
                    <div className="flex flex-row gap-1">
                        <InputGroup className="max-w-xs">
                            <InputGroupInput 
                                type="text"
                                placeholder={i18nProjects("search projects")}
                            />
                            <InputGroupAddon align="inline-start">
                                <Search className="h-4 w-4 shrink-0" />
                            </InputGroupAddon>
                        </InputGroup>
                        <Button 
                            variant="ghost"
                            size="default"
                        >
                            {i18nForms("new project")}
                        </Button>
                    </div>
                </div>
                <DataTable 
                    columns={columns} 
                    data={projects} 
                    onRowClick={(row) => console.log(row)}
                />
            </div>
        </AppContentWrapper>
    )
}
