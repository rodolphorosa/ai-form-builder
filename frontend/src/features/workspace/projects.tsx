"use client"

import { useState } from "react"

import { useTranslations } from "next-intl"
import { Project } from "@/types/form"
import { mockProjects } from "../mock"
import { EllipsisVertical, FolderOpen, Pin, PinOff, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { columns, DataTable } from "./table"

interface ProjectsPros {

}

export const Projects = ({}: ProjectsPros) => {
    const tCommon = useTranslations("Common")
    const tTree = useTranslations("Tree")
    
    const [projects, setProjects] = useState<Project[]>(mockProjects)

    const [recent, setRecent] = useState<Project[]>([mockProjects[0], mockProjects[1], mockProjects[2]])

    const renderProjectCard = (project: Project) => {
        return (
            <div className="flex flex-col justify-between p-4 gap-3 border rounded-lg shadow-sm h-fit w-[300px] bg-card">
                <div className="flex flex-row gap-4 justify-between">
                    <div className="flex flex-row gap-2 items-center min-w-0 flex-1">
                        <FolderOpen className="h-4 w-4 shrink-0" />
                        <div className="text-sm font-medium truncate">
                            {project.name}
                        </div>
                    </div>

                    <div className="flex flex-row items-center shrink-0">
                        <Button variant="ghost" size="icon">
                            {project.archived ? (
                                <PinOff className="h-4 w-4" />
                            ) : (
                                <Pin className="h-4 w-4"/>
                            )}
                        </Button>

                        <Button variant="ghost" size="icon">
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="text-sm font-normal">
                    3 formulários
                </div>
                <div className="text-sm font-normal text-muted-foreground">
                    {tCommon("updated")} há 3 dias
                </div>
            </div>
        )
    }

    const renderProjectTable = (projects: Project[]) => {
        const data = mockProjects
        
        return (
            <div className="w-full mx-auto bg-card">
                <DataTable columns={columns} data={projects} />
            </div>
        )

    }
    
    return (
        <div className="flex flex-col p-8 gap-8">
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-normal">
                    {tTree("projects")}
                </div>
                <Button variant="outline" size="default">
                    <Plus className="h-4 w-4" />
                    {tTree("new project")}
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">{tTree("recent")}</div>
                <div className="flex flex-wrap gap-4 items-start content-start mx-auto">
                    {recent.map(project => renderProjectCard(project))}
                </div>
            </div>
            <div className="text-sm font-medium">
                Todos os projetos
            </div>
            {renderProjectTable(projects)}
        </div>
    )
}