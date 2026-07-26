import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, FolderInput, FolderPlus, FolderSearch, FolderOpen, Download, FileBraces, Pin, Archive, Copy, Trash } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { Form, Project } from "@/types/form"

interface Props {
    projects: Project[]
    onRename: () => void
    onMove: () => void
    onExport: () => void
    onPin: () => void
    onArchive: () => void
    onDuplicate: () => void
    onDelete: () => void
}


export const FormDropdown = ({
    projects,
    onRename,
    onMove,
    onExport,
    onPin,
    onArchive,
    onDuplicate,
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
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <FolderInput />
                            <div className="text-sm font-medium truncate">
                                {common("move to project")}
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <FolderPlus className="h-4 w-4 shrink-0" />
                                    <div className="text-sm font-medium truncate">
                                        Novo projeto
                                    </div>
                                </DropdownMenuItem>
                                {projects && projects.length > 0 && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <FolderSearch className="h-4 w-4 shrink-0" />
                                            <div className="text-sm font-medium truncate">
                                                Buscar projetos
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Recentes</DropdownMenuLabel>
                                    </>
                                )}
                                {projects?.slice(0, 3).map(project => {
                                    return (
                                        <DropdownMenuItem key={project.id}>
                                            <FolderOpen className="h-4 w-4 shrink-0" />
                                            <div className="text-sm font-medium truncate">
                                                {project.name}
                                            </div>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Download className="h-4 w-4 shrink-0" />
                            <div className="text-sm font-medium truncate">
                                {common("export")}
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <FaRegFilePdf className="h-4 w-4 shrink-0" />
                                    <div className="text-sm font-medium truncate">
                                        PDF
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FileBraces className="h-4 w-4 shrink-0" />
                                    <div className="text-sm font-medium truncate">
                                        JSON
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
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
                    <DropdownMenuItem>
                        <Copy className="h-4 w-4 shrink-0" />
                        <div className="text-sm font-medium truncate">
                            Duplicar
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