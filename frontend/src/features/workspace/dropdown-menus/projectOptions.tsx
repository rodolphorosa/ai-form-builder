import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, FolderInput, FolderPlus, FolderSearch, FolderOpen, Download, FileBraces, Pin, Archive, Copy, Trash } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { Project } from "@/types/form"

interface Props {
    onRename: () => void
    onPin: () => void
    onArchive: () => void
    onDelete: () => void
}

export const ProjectDropdown = ({
    onRename,
    onPin,
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
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4" />
                        <div className="text-sm font-medium truncate">
                            {common("rename")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Pin />
                        <div className="text-sm font-medium truncate">
                            {common("pin")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Archive />
                        <div className="text-sm font-medium truncate">
                            {common("archive")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
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