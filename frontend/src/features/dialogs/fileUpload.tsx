import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Form } from "@/types/form"
import { FileBraces, X } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"

interface DialogProps {
    onUpload: (form: Partial<Form>) => void
    open: boolean
    onOpenChange: (open: boolean) => void

}

interface JsonImportProps<T> {
    onImport: (data: T) => void
}

interface Metadata {
    name: string
    size: number
    type: string
    lastModified: Date
}

export function JsonImport<T>({ onImport }: JsonImportProps<T>) {
    const [metadata, setMetadata] = useState<Metadata>()

    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const file = e.dataTransfer.files[0]

        if (!file) return

        try {
            const text = await file.text()
            const json = JSON.parse(text) as T

            setMetadata({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified)
            })

            onImport(json)
        } catch (error) {
            console.error(error)
            // alert("Arquivo JSON inválido.")
        } finally {
            // Permite importar o mesmo arquivo novamente
            // @ts-ignore
            e.target.value = ""
        }
    }

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        try {
            const text = await file.text()
            const json = JSON.parse(text) as T

            setMetadata({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified)
            })

            onImport(json)
        } catch (error) {
            console.error(error)
            alert("Arquivo JSON inválido.")
        } finally {
            // Permite importar o mesmo arquivo novamente
            e.target.value = ""
        }
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) {
            return `${bytes} B`
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`
        }

        if (bytes < 1024 * 1024 * 1024) {
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
        }

        return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
    }

    return (
        <div className="flex flex-col gap-1">
            {metadata && (
                <Attachment className="w-full">
                    <AttachmentMedia>
                        <FileBraces />
                    </AttachmentMedia>
                    <AttachmentContent>
                        <AttachmentTitle>{metadata.name}</AttachmentTitle>
                        <AttachmentDescription>
                            JSON · {formatFileSize(metadata.size)}
                        </AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                        <AttachmentAction>
                            <X className="h-4 w-4 shrink-0"/>
                        </AttachmentAction>
                    </AttachmentActions>
                </Attachment>
            )}
            {
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex flex-col gap-2 items-center border-2 border-dashed rounded-lg p-8 text-center"
                >
                    <span className="text-sm font-normal text-muted-foreground">Arraste um arquivo JSON aqui</span>
                    <Button
                        className="w-fit"
                        onClick={() => inputRef.current?.click()}
                    >
                        Escolher arquivo
                    </Button>

                    <input
                        ref={inputRef}
                        hidden
                        type="file"
                        accept=".json"
                        onChange={handleChange}
                    />
                </div>
            }
        </div>
    )
}

export const UploadDialog = ({ onUpload, open, onOpenChange }: DialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import form</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Field>
                        <Label>Arquivo</Label>
                        <JsonImport onImport={(json) => console.log(json)}/>
                    </Field>
                </div>
                <DialogFooter>
                    <DialogClose render={<Button variant="secondary">Cancel</Button>} />
                    <Button variant="outline" onClick={() => {}}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}