"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Thinking } from "../inputs/common"
import { formService } from "@/api/form.service"
import { Form, FormSchema, Option, Project } from "@/types/form"
import { projectService } from "@/api/project.service"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DialogProps {
    onCreate: (form: Partial<Form>) => void
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const CreateDialog = ({ onCreate, open, onOpenChange }: DialogProps) => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [projects, setProjects] = useState<Project[]>([])

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>()

    const getProjects = async () => {
        try {

            const response = await projectService.getAll()

            setProjects(response.data as Form[])

        } catch(err) {

            console.log(err)

        } finally {

        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    const handleCreate = () => {
        if (selectedProjectId) {
            onCreate({
                "name": name,
                "description": description,
                "projectId": selectedProjectId
            })
        }
    }

    const projectOptions: Option[] = projects.map(project => ({
        value: project.id,
        label: project.name
    }))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Field>
                        <Label htmlFor="form-name">Name</Label>
                        <Input 
                            id="form-name" 
                            type="text" 
                            placeholder="Name of the form"
                            onChange={e => setName(e.target.value)}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="form-description">
                            Description
                        </Label>
                        <div className="w-full self-end">
                            <Textarea 
                                className="min-h-12 max-h-48 resize-none overflow-y-auto"
                                id="form-description"
                                maxLength={200}
                                value={description ?? ""}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Describe the form you want"
                            />
                        </div>
                        <div className="w-full mt-1 justify-end text-right text-xs text-muted-foreground self-end">
                            {description?.length}/2000
                        </div>
                    </Field>
                    <Field>
                        <Label>
                            Project
                        </Label>
                        <Select items={projectOptions} onValueChange={setSelectedProjectId}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    {projectOptions?.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="secondary">Cancel</Button>} />
                    <Button variant="outline" disabled={!name || name.trim().length === 0} onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
