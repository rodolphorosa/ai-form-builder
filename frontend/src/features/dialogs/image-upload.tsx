import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Form } from "@/types/form"
import { Check, CloudUpload, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Thinking } from "../inputs/common"
import { useTranslations } from "next-intl"
import { formService } from "@/api/form.service"
import { useRouter } from "@/i18n/navigation"
import { formatFileSize } from "./utils"
import { FileAttachment } from "./attachment"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface ImageImportProps {
    onImport: (image: File) => void
    image: File | null
}

type ImportState =
    | "idle"
    | "ready"
    | "loading"
    | "success"
    | "failed"

export const ImageImport = ({ onImport, image }: ImageImportProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const importImage = (file?: File) => {
        if (!file) return
        onImport(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        importImage(e.dataTransfer.files[0])
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        importImage(e.target.files?.[0])
    }

    return (
        <div className="flex flex-col gap-2">
            {image && (
                <div className="flex flex-col gap-2">
                    <FileAttachment file={image} type="image" />
                    <div className="flex flex-row gap-1 items-center text-sm font-medium">
                        <div className="p-2 bg-muted rounded-full">
                            <Check className="h-4 w-4 shrink-0"/>
                        </div>
                        Imagem carregada com sucesso!
                    </div>
                </div>
            )}
            {!image && (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col gap-2 items-center border-2 border-dashed rounded-lg p-8 text-center"
                    )}
                >
                    <CloudUpload />
                    <span className="text-sm font-normal text-muted-foreground">Arraste uma imagem aqui<br/>ou</span>
                    <Button
                        className="w-fit"
                        onClick={() => inputRef.current?.click()}
                    >
                        Escolher imagem
                    </Button>

                    <input
                        ref={inputRef}
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            )}
        </div>
    )
}

const FakeLoader = ({ image }: { image: File }) => {
    const status = [
        "Preparando imagem...",
        "Analisando conteúdo...",
        "Identificando campos e seções...",
        "Gerando estrutura do formulário...",
        "Finalizando...",
    ]

    const [step, setStep] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((current) => {
                if (current >= status.length - 1) {
                    clearInterval(interval)
                    return current
                }

                return current + 1
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-2.5">
            <FileAttachment file={image} type="image" />
            <div className="flex flex-col gap-1">
                {status.slice(0, step).map((text) => (
                    <div
                        key={text}
                        className="flex items-center gap-2 text-sm justify-start"
                    >
                        <Check className="size-4 text-primary" />
                        <span>{text}</span>
                    </div>
                ))}

                {step < status.length && (
                    <div className="justify-start">
                        <Thinking step={status[step]} />
                    </div>
                )}
            </div>
        </div>
    )
}

export const ImageDialog = ({ open, onOpenChange }: DialogProps) => {
    const router = useRouter()

    const i18nCommon = useTranslations("Common")

    const [image, setImage] = useState<File | null>(null)
    const [form, setForm] = useState<Form | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const [state, setState] = useState<ImportState>("idle")

    const workspace = useTranslations("Workspace")

    const onCreateFromImage = async () => {
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
        
        } catch (err) {
            setState("failed")
            setMessage("Could not create form from image.")
        } finally {
            setState("success")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{workspace("image up")}</DialogTitle>
                </DialogHeader>
                
                {(state === "idle" || state === "ready") && (
                    <ImageImport 
                        onImport={(image) => {
                            if (image) {
                                setState("ready")
                                setImage(image)
                            }
                        }} 
                        image={image} 
                    />
                )}

                {state === "loading" && <FakeLoader image={image!} />}

                {state === "success" && (
                    <div className="flex flex-col gap-2">
                        <FileAttachment file={image!} type="image" />
                        <div className="flex flex-row gap-1 items-center text-sm font-medium">
                            <div className="p-2 bg-muted rounded-full">
                                <Check className="h-4 w-4 shrink-0"/>
                            </div>
                            Formulado criado com sucesso!
                        </div>
                        <div className="text-xs font-muted-foreground">
                            {message}
                        </div>
                    </div>
                )}
                
                {["idle", "ready", "loading"].includes(state) && (
                    <DialogFooter>
                        <DialogClose render={<Button variant="secondary">{i18nCommon("cancel")}</Button>} />
                        <Button 
                            variant="outline" 
                            onClick={onCreateFromImage}
                            disabled={!image}
                        >
                            {i18nCommon("create form")}
                        </Button>
                    </DialogFooter>
                )}
                
                {state === "success" && (
                    <DialogFooter>
                        <DialogClose render={<Button variant="secondary">Close</Button>} />
                        <Button 
                            variant="outline" 
                            onClick={() => {
                                router.push(`/forms/${form?.id}`)
                            }}
                        >
                            Abrir formulário
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}