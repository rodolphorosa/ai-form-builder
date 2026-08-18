"use client"

import { useWorkspace } from "@/contexts/workspace-context"
import { Project } from "@/types/form"
import { ColumnDef } from "@tanstack/react-table"
import { useLocale, useTranslations } from "next-intl"
import DataTable from "../table/table"
import { ArchiveX, Ellipsis, FolderArchive, Trash } from "lucide-react"
import { parseUpdateDate } from "@/lib/utils"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { projectService } from "@/api/project.service"
import { useEffect, useState } from "react"

function ArchivedProjects () {
    const locale = useLocale()
    const i18nCommon = useTranslations("Common")
    
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        getProjects()
    }, [])

    const getProjects = async () => {
        try {
            const response = await projectService.getArchived()
            setProjects(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: "name",
            header: i18nCommon("name"),
            cell: ({ row }) => {
                const project = row.original

                const formCount = project.formCount || 0

                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="p-2 bg-indigo-400/25 text-indigo-400 rounded-sm">
                            <FolderArchive className="h-4 w-4 shrink-0"/>
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
            id: "updated-at",
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
                                <Button variant="ghost" size="icon">
                                    <Ellipsis className="h-4 w-4 shrink-0" />
                                </Button>
                            }
                        />
                        <DropdownMenuContent className="w-fit">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <ArchiveX className="h-4 w-4 shrink-0" />
                                    {i18nCommon("unarchive")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive">
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
        <div className="bg-card">
            <DataTable columns={columns} data={projects} />
        </div>
    )
}

export default ArchivedProjects