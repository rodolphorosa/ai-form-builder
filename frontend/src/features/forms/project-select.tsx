'use client'

import { projectService } from "@/api/project.service"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option, Project } from "@/types/form"
import { useEffect, useState } from "react"

interface Props {
    onValueChange: (value: string | null) => void
}

export default function ProjectSelect({ onValueChange }: Props) {
    const [projects, setProjects] = useState<Project[]>([])

    const options: Option[]  = projects.map(project => ({
        value: project.id,
        label: project.name
    }))

    async function getProjects() {
        try {
            const response = await projectService.getAll()

            if (response) {
                setProjects(response.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProjects()
    }, [])


    return (
        <Select items={options} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
