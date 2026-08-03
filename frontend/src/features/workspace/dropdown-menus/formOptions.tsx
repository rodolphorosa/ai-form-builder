import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, FolderInput, FolderPlus, FolderSearch, FolderOpen, Download, FileBraces, Pin, Archive, Copy, Trash } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { Form, FormUpdateAction, MoveAction, Project } from "@/types/form"


interface Props {
    form: Form,
    projects: Project[]
    onRename: () => void
    onMove: (action: MoveAction) => void
    onExport: () => void
    onPinUnpin: (action: FormUpdateAction) => void
    onArchive: (action: FormUpdateAction) => void
    onDuplicate: () => void
    onDelete: (action: FormUpdateAction) => void
}


export const FormDropdown = ({
    form,
    projects,
    onRename,
    onMove,
    onExport,
    onPinUnpin,
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
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onMove({ type: "create", form: form })
                                    }}
                                >
                                    <FolderPlus className="h-4 w-4 shrink-0" />
                                    <div className="text-sm font-medium truncate">
                                        Novo projeto
                                    </div>
                                </DropdownMenuItem>
                                {projects && projects.length > 0 && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onMove({ type: "search", form: form })
                                            }}
                                        >
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
                                        <DropdownMenuItem 
                                            key={project.id}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                onMove({ 
                                                    type: "project", 
                                                    form: form, 
                                                    project: project 
                                                })
                                            }}
                                        >
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
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onPinUnpin({ 
                                type: form?.pinned ? "unpin" : "pin", 
                                form: form
                            })
                        }}
                    >
                        <Pin />
                        <div className="text-sm font-medium truncate">
                            {form?.pinned ? common("unpin") : common("pin")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onArchive({ type: "archive", form: form })
                        }}
                    >
                        <Archive />
                        <div className="text-sm font-medium truncate">
                            {common("archive")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Copy className="h-4 w-4 shrink-0" />
                        <div className="text-sm font-medium truncate">
                            {common("duplicate")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem 
                        variant="destructive"
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete({ type: "delete", form: form })
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