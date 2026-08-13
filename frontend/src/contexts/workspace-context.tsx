"use client"

import { formService } from "@/api/form.service";
import { projectService } from "@/api/project.service";
import { Form, Project } from "@/types/form";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";

interface WorkspaceContextType {
    projects: Project[]
    forms: Form[]
    refreshProjects: () => Promise<void>
    refreshForms: () => Promise<void>
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [projects, setProjects] = useState<Project[]>([])
    const [forms, setForms] = useState<Form[]>([])

    const sortByUpdate = <T extends Form | Project>(array: T[]): T[] => {
        return array.sort((a, b) => b.updatedAt - a.updatedAt)
    }

    const refreshProjects = async () => {
        try {
            const response = await projectService.getAll()
            setProjects(sortByUpdate([...response.data]))
        } catch {
            console.error("Error loading projects.")
        } finally {
            // do something
        }
    }

    const refreshForms = async() => {
        try {
            const response = await formService.getAll()
            setForms(sortByUpdate([...response.data]))
        } catch {
            console.error("Error loading forms.")
        } finally {
            // do something
        }
    }

    useEffect(() => {
        if (!user) {
            setProjects([])
            setForms([])
            return
        }

        refreshProjects()
        refreshForms()
    }, [user])

    return (
        <WorkspaceContext.Provider
            value={{
                projects,
                forms,
                refreshProjects,
                refreshForms
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )

}

export function useWorkspace() {
    const context = useContext(WorkspaceContext)

    if (!context) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider") 
    }

    return context
}
