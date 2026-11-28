'use client'

import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog"
import { useState } from "react"
import CreateFormTrigger from "./create-form-trigger"
import CreateFormCard from "./create-form-card"
import { Check, CloudUpload, ImageUp } from "lucide-react"
import { useTranslations } from "next-intl"
import FileDropzone from "./file-dropzone"
import { FileAttachment } from "../dialogs/attachment"
import FakeLoader from "./fake-loader"
import { Form } from "@/types/form"
import { formService } from "@/api/form.service"
import { Button } from "@/components/ui/button"
import { useRouter } from "@/i18n/navigation"

type ImportState =
    | "idle"
    | "ready"
    | "loading"
    | "success"
    | "failed"

export default function CreateFromImage() {
    const [open, setOpen] = useState(false)

    const [image, setImage] = useState<File | null>()

    const [state, setState] = useState<ImportState>("idle")

    const [form, setForm] = useState<Form | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const router = useRouter()
    
    const i18nForms = useTranslations("Forms")
    const i18nCommon = useTranslations("Common")
    const i18nWorkspace = useTranslations("Workspace")

    async function createFromImage() {
        if (!image) return

        setState("loading")

        try {
            const formData = new FormData()

            formData.append("image", image)
            formData.append("provider", "openai")
            formData.append("model", "gpt-5.6-terra")

            const response = await formService.createFromImage(formData)
            const data = response.data
            setForm(data.form)
            setMessage(data.message)

        } catch (error) {
            setState("failed")
            setMessage("Could not create form from uploaded image")
        } finally {
            setState("success")
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger render={
                <CreateFormTrigger role="button">
                    <CreateFormCard 
                        icon={ImageUp}
                        title={i18nWorkspace("image up")}
                        description={i18nWorkspace("image up / subtext")}
                    />
                </CreateFormTrigger>
            }/>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        {i18nWorkspace("image up")}
                    </DialogTitle>
                </DialogHeader>

                {(state === "idle" || state === "ready") && (
                    <div className="flex flex-col gap-2">
                        {image && <FileAttachment file={image} type="image" />}

                        <FileDropzone 
                            accept="image/*"
                            onFileSelect={(file) => {
                                if(file) {
                                    setState("ready")
                                    setImage(file)
                                }
                            }}
                            dropIcon={CloudUpload}
                            dropText="Drop image here"
                            selectText="Select image"
                        />

                    </div>
                )}

                {state === "loading" && <FakeLoader image={image!} />}

                {state === "success" && (
                    <div className="flex flex-col gap-2">
                        <FileAttachment 
                            file={image!} 
                            type="image" 
                        />
                        
                        <div 
                            className="
                                flex 
                                flex-row 
                                gap-1 
                                items-center 
                                text-sm 
                                font-medium
                            "
                        >
                            <div className="p-2 bg-muted rounded-full">
                                <Check className="h-4 w-4 shrink-0"/>
                            </div>
                            {i18nForms("form successfully created")}
                        </div>
                        
                        <div className="text-xs font-muted-foreground">
                            {message}
                        </div>
                    </div>
                )}

                {["idle", "ready", "loading"].includes(state) && (
                    <DialogFooter>
                        <DialogClose render={
                            <Button variant="secondary">
                                {i18nCommon("cancel")}
                            </Button>
                        }/>
                        
                        <Button 
                            variant="outline" 
                            onClick={createFromImage}
                            disabled={!image}
                        >
                            {i18nCommon("create form")}
                        </Button>
                    </DialogFooter>
                )}
                
                {state === "success" && (
                    <DialogFooter>
                        <DialogClose render={
                            <Button variant="secondary">
                                {i18nCommon("close")}
                            </Button>
                        }/>
                        
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                router.push(`/forms/${form?.id}`)
                            }}
                        >
                            {i18nCommon("open form")}
                        </Button>
                    </DialogFooter>
                )}

            </DialogContent>

        </Dialog>
    )
}
