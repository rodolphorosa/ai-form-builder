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
import { useState } from "react"
import { Thinking } from "../inputs/common"
import { formService } from "@/api/form"
import { FormSchema } from "@/types/form"

interface DialogProps {
    onSchemaCreate: (schema: FormSchema) => void
}

export const CreateDialog = ({ onSchemaCreate }: DialogProps) => {
    const [title, setTitle] = useState<string>("")
    const [prompt, setPrompt] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    const createForm = async (prompt: string) => {
        setLoading(true)
        
        try {
            const { data } = await formService.createForm({
                prompt: prompt,
                provider: "openai",
                model: "gpt-4.1-nano"
            })
            // @ts-ignore
            onSchemaCreate(data.schema)
        } catch (error) {
            console.error("Failed to generate form", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger render={<Button>Create Form</Button>} />
            <DialogContent className="sm:w-auto">
                <DialogHeader>
                    <DialogTitle>Create form</DialogTitle>
                    <DialogDescription>
                        Describe the form you want and AI Assitant will create it for you.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Field>
                        <Label htmlFor="form-name">Name</Label>
                        <Input 
                            id="form-name" 
                            type="text" 
                            placeholder="Name of the form"
                            onChange={e => setTitle(e.target.value)}
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
                                minLength={50}
                                maxLength={2000}
                                value={prompt ?? ""}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder="Describe the form you want"
                            />
                        </div>
                        <div className="w-full mt-1 justify-end text-right text-xs text-muted-foreground self-end">
                            {prompt?.length}/2000
                        </div>
                    </Field>
                </div>
                {loading && <Thinking />}
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button variant="secondary" disabled={!title || title.trim().length === 0}>Create empty</Button>
                    <Button 
                        disabled={!prompt || prompt.trim().length === 0}
                        onClick={() => createForm(prompt)}
                    >
                        <Sparkles />Create with AI
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
