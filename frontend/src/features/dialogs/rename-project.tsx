"use client"

import { Button } from "@/components/ui/button"
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogFooter, 
    DialogHeader 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Project } from "@/types/form"
import { useState } from "react"

export const RenameProject = ({ 
    project, 
    open,
    onSave,
    onCancel,
    onOpenChange
}: { 
    project: Project
    open: boolean 
    onSave: (project: Project, name: string) => void
    onCancel: () => void
    onOpenChange: (open: boolean) => void
}) => {
    const [name, setName] = useState<string>("")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="font-medium">
                    Rename project
                </DialogHeader>
                <Input 
                    type="text"
                    placeholder={project?.name}
                    onChange={(e) => setName(e.target.value ?? "")}
                />
                <DialogFooter className="bg-transparent border-t-0">
                    <DialogClose render={<Button variant="ghost">Cancel</Button>} />
                    <Button
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault()
                            onSave(project, name)
                        }}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}