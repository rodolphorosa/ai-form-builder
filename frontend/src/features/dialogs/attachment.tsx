import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { FileBraces, X } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { formatFileSize } from "./utils"

interface AttachmentProps {
    file: File
    type: "json" | "image" | "pdf"
    orientation?: "vertical" | "horizontal"
    failed?: boolean
    errorMessage?: string
}

interface Metadata {
    name: string
    size: number
    type: string
    lastModified: Date
}

const types: Record<string, string> = {
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "application/json": "JSON",
    "application/pdf": "PDF",
}

export const FileAttachment = ({ file, type, orientation, failed, errorMessage }: AttachmentProps) => {
    const metadata: Metadata = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified)
    }

    const preview = type === "image" ? URL.createObjectURL(file) : null

    return (
        <Attachment 
            orientation={orientation ?? "horizontal"} 
            size="default" 
            className="w-full" 
            state={failed ? "error" : "done"}
        >
            <AttachmentMedia variant="image">
                {type === "image" && (
                    <img
                        src={preview!}
                        alt={file?.name}
                        className="rounded-md object-cover"
                    />
                )}
                {type === "json" && (
                    <FileBraces className="h-4 w-4 shrink-0" />
                )}
                {type === "pdf" && (
                    <FaRegFilePdf className="h-4 w-4 shrink-0" />
                )}
            </AttachmentMedia>
            <AttachmentContent>
                <AttachmentTitle>{metadata.name}</AttachmentTitle>
                <AttachmentDescription>
                    { failed ? (
                        errorMessage ?? "Could not processs uploaded file"
                    ): (
                         `${types[metadata.type]} · ${formatFileSize(metadata.size)}`
                    )}
                </AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
                <AttachmentAction>
                    <X className="h-4 w-4 shrink-0"/>
                </AttachmentAction>
            </AttachmentActions>
        </Attachment>
    )
}