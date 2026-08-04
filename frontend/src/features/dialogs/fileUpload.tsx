import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/types/form"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { FileAttachment } from "./attachment"
import { formService } from "@/api/form.service"
import { useRouter } from "@/i18n/navigation"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface JsonImportProps {
    file: File | null
    onImport: (file: File) => void
    failed?: boolean
    errorMessage?: string
}

function JsonImport({ file, onImport, failed, errorMessage }: JsonImportProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const importFile = (file?: File) => {
        if (!file) return

        const isJson =
            file.type === "application/json" ||
            file.name.toLowerCase().endsWith(".json")

        if (!isJson) return

        onImport(file)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        importFile(e.dataTransfer.files[0])
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        importFile(e.target.files?.[0])
        e.target.value = ""
    }

    return (
        <div className="flex flex-col gap-2">
            {file && <FileAttachment file={file} type="json" failed={failed} errorMessage={errorMessage} />}

            <div
                className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <span className="text-sm text-muted-foreground">
                    Arraste um arquivo JSON aqui
                    <br />
                    ou
                </span>

                <Button onClick={() => inputRef.current?.click()}>
                    Escolher arquivo
                </Button>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept=".json,application/json"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export function FileDialog({ open, onOpenChange }: DialogProps) {
    const workspace = useTranslations("Workspace")

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [form, setForm] = useState<Form | null>(null)

    const [state, setState] = useState<"success" | "failure">()
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const handleImport = async (file: File) => {
        setSelectedFile(file)
        setError(null)

        try {
            const text = await file.text()
            const json = JSON.parse(text) as Form

            setForm(json)
            setState("success")
        } catch {
            setForm(null)
            setState("failure")
            setError("O arquivo JSON é inválido.")
        }
    }

    const handleCreate = async () => {
        if (!form) return

        try {

            const response = await formService.create_from_json({"form": form})

            const data = response.data

            router.push(`/forms/${data.id}`)

        } catch (err) {

        } finally {

        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{workspace("file up")}</DialogTitle>
                </DialogHeader>

                <JsonImport
                    file={selectedFile}
                    onImport={handleImport}
                    failed={state === "failure"}
                    errorMessage={error ?? "Could not process uploaded file."}
                />

                <DialogFooter>
                    <DialogClose render={(<Button variant="secondary">Cancel</Button>)} />

                    <Button
                        variant="outline"
                        disabled={!form}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}