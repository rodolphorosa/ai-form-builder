import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Pencil, FolderInput, FolderPlus, FolderSearch, FolderOpen, Download, FileBraces, Pin, Archive, Copy, Trash, PinOff } from "lucide-react"
import { FaRegFilePdf } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { Form, FormUpdateAction, MoveAction, Project } from "@/types/form"

interface Props {
    form: Form,
    projects: Project[]
    onRename: (form: Form) => void
    onMove: (action: MoveAction) => void
    onExport: (form: Form) => void
    onPin: (form: Form) => void
    onUnpin: (form: Form) => void
    onArchive: (form: Form) => void
    onDuplicate: (form: Form) => void
    onDelete: (form: Form) => void
}

export const FormDropdown = ({
    form,
    projects,
    onRename,
    onMove,
    onExport,
    onPin,
    onUnpin,
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
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onRename?.(form)
                        }}
                    >
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
                                {projects?.filter(project => project.id !== form.projectId ).slice(0, 3).map(project => {
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
                            form?.pinned ? onUnpin(form) : onPin(form)
                        }}
                    >
                        {form?.pinned && (
                            <PinOff />
                        )}
                        {!form?.pinned && (
                            <Pin />
                        )}
                        <div className="text-sm font-medium truncate">
                            {form?.pinned ? common("unpin") : common("pin")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onArchive(form)
                        }}
                    >
                        <Archive />
                        <div className="text-sm font-medium truncate">
                            {common("archive")}
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault()
                            onDuplicate(form)
                        }}
                    >
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
                            onDelete(form)
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