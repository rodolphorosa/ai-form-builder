import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, FolderInput, FolderPlus, FolderSearch, FolderOpen, Download, FileBraces, Pin, Archive, Copy, Trash, PinOff } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { Project } from "@/types/form"

interface Props {
    project: Project
    onRename: (project: Project) => void
    onPin: (project: Project) => void
    onUnpin: (project: Project) => void
    onArchive: (project: Project) => void
    onDelete: (project: Project) => void
}

export const ProjectDropdown = ({
    project,
    onRename,
    onPin,
    onUnpin,
    onArchive,
    onDelete
}: Props) => {
    const common = useTranslations("Common")
    const tree = useTranslations("Tree")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={(
                <Button size="icon" variant="ghost" onClick={(e) => e.preventDefault()}>
                    <EllipsisVertical className="h-4 w-4" />
                </Button>
            )} />
            <DropdownMenuContent className="w-fit">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onRename(project)
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                        <div className="text-sm font-medium truncate">
                            {common("rename")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            project?.pinned ? onUnpin(project) : onPin(project)
                        }}
                    >
                        {project?.pinned && (
                            <PinOff />
                        )}
                        {!project?.pinned && (
                            <Pin />
                        )}
                        <div className="text-sm font-medium truncate">
                            {project?.pinned ? common("unpin") : common("pin")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onArchive(project)
                        }}
                    >
                        <Archive />
                        <div className="text-sm font-medium truncate">
                            {common("archive")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem 
                        variant="destructive"
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete(project)
                        }}
                    >
                        <Trash />
                        <div className="text-sm font-medium truncate">
                            {common("delete")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}