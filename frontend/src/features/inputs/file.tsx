import { InputProps } from "@/types/inputs"
import { FC, useRef, useState } from "react"
import { EditableLabel } from "./common"
import { Button } from "@/components/ui/button"
import { FileAttachment } from "../dialogs/attachment"
import { formatFileSize } from "../dialogs/utils"

interface FileImporterProps {
    onImport: (file: File) => void
    placeholder: string
    file: File | null
    maxSize: number
    acceptedTypes: string[]
}

const FileImporter = ({ onImport, placeholder, file, maxSize, acceptedTypes }: FileImporterProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const importFile = (file?: File) => {
        if (!file) return
        if (!validateFile(file)) return
        onImport(file)
    }

    const validateFile = (file: File) => {
        console.log(file.type)
        console.log(formatFileSize(maxSize))
        console.log(formatFileSize(file.size))
        if (file.size > maxSize) return false
        if (!acceptedTypes.includes(file.type)) return false
        return true
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
            {file && <FileAttachment file={file} type="image" failed={false} errorMessage={""} />}

            <div
                className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-8 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <span className="text-sm text-muted-foreground">
                    {placeholder}
                    <br />
                    ou
                </span>

                <Button onClick={() => inputRef.current?.click()}>
                    Escolher arquivo ou imagem
                </Button>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept={acceptedTypes.join(",")}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export const FileInput: FC<InputProps> = ({ item, editable, onChange }) => {
    const [file, setFile] = useState<File | null>(null)

    console.log(file)

    console.log(item.validation)

    return (
        <div className="flex flex-col gap-1 w-full">
            <EditableLabel label={item.label} required={item.required} editable={editable} onChange={(value) => onChange?.(["label"], value)} />
            {!editable && (
                <FileImporter 
                    onImport={setFile}
                    placeholder={item.ui?.placeholder || "Arraste um arquivo ou imagem aqui"}
                    file={file} 
                    maxSize={item.validation?.maxSize || 0} 
                    acceptedTypes={item.validation?.acceptedTypes || []} 
                />
            )}
            {editable && (
                <FileImporter 
                    onImport={setFile} 
                    placeholder={item.ui?.placeholder || "Arraste um arquivo ou imagem aqui"}
                    file={file} 
                    maxSize={item.validation?.maxSize || 0} 
                    acceptedTypes={item.validation?.acceptedTypes || []} 
                />
            )}
        </div>
    )
}