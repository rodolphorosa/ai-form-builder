"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreate: (name: string, description: string) => void
}

export const ProjectCreate = ({ open, onOpenChange, onCreate }: DialogProps) => {
    const i18nForms = useTranslations("Forms")
    const i18nCommon = useTranslations("Common")

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {i18nForms("new project")}
                    </DialogTitle>

                </DialogHeader>

                <Field>
                    <Label>
                        {i18nCommon("name")}:
                    </Label>
                    <Input 
                        id="project-name"
                        type="text"
                        value={name ?? ""}
                        onChange={e => setName(e.target.value)}
                    />
                </Field>

                <Field>
                    <Label>
                        {i18nCommon("description")}:</Label>
                    <Textarea 
                        id="project-description"
                        maxLength={200}
                        value={description ?? ""}
                        onChange={e => setDescription(e.target.value)}
                        className="min-h-12 max-h-48 resize-none overflow-y-auto"
                    />
                </Field>
                
                <DialogFooter>
                    <DialogClose render={<Button variant="secondary">Cancel</Button>} />
                    <Button 
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault()
                            onCreate(name, description)
                        }}
                        disabled={name === null || name === undefined || name.length == 0}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}