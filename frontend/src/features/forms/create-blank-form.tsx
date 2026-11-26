'use client'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { File } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import CreateFormCard from "./create-form-card"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ProjectSelect from "./project-select"
import useForms from "@/hooks/use-forms"
import { useRouter } from "@/i18n/navigation"

export default function CreateBlankForm() {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [projectId, setProjectId] = useState<string | null>(null)

    const i18nCommon = useTranslations("Common")
    const i18nWorkspace = useTranslations("Workspace")

    const { createForm } = useForms()

    const router = useRouter()

    async function handleCreate() {
        try {
            if (projectId) {
                const form = await createForm({ 
                    name: name, 
                    description: description, 
                    projectId: projectId 
                })

                router.push(`/forms/${form.id}`)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <button
                    className="
                        flex 
                        flex-row 
                        p-3 
                        gap-4 
                        border 
                        rounded-lg 
                        shadow-sm 
                        bg-card 
                        items-center 
                        h-fit 
                        w-[240px] 
                        cursor-pointer
                        text-left
                    "
                >
                    <CreateFormCard 
                        icon={File}
                        title={i18nWorkspace("blank")}
                        description={i18nWorkspace("blank / subtext")}
                    />
                </button>
            }/>
            
            <DialogContent>
                
                <DialogHeader>
                    <DialogTitle>
                        {i18nCommon("create form")}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">

                    <Field>
                        <Label htmlFor="form-name">
                            {i18nCommon("name")}
                        </Label>
                        <Input 
                            id="form-name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="form-description">
                            {i18nCommon("description")}
                        </Label>
                        <Textarea 
                            id="form-description"
                            className="
                                w-full 
                                self-end
                                min-h-12 
                                max-h-36 
                                resize-none 
                                overflow-y-auto
                            "
                            maxLength={2000}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="
                            w-full 
                            mt-1 
                            justify-end 
                            text-right 
                            text-xs 
                            text-muted-foreground 
                            self-end
                        ">
                            {description?.length}/2000
                        </div>
                    </Field>

                    <Field>
                        <Label>
                            {i18nCommon("project")}
                        </Label>
                        <ProjectSelect onValueChange={setProjectId}/>
                    </Field>

                </div>

                <DialogFooter>
                    <DialogClose 
                        render={
                            <Button variant="secondary">
                                {i18nCommon("cancel")}
                            </Button>
                        }
                    />
                    <Button 
                        variant="outline"
                        disabled={!name || name.trim().length === 0}
                        onClick={handleCreate}
                    >
                        {i18nCommon("create")}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
