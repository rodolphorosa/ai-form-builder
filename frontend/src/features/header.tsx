"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Archive, Copy, Download, EllipsisVertical, Eye, FileBraces, FolderInput, FolderOpen, FolderPlus, FolderSearch, Moon, Pencil, Pin, Redo, Sun, Trash, Undo } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Project } from "@/types/form"

import { FaRegFilePdf } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface HeaderProps {
    undo: () => void
    redo: () => void
    undoDisabled: boolean
    redoDisabled: boolean
    mode: "edit" | "preview"
    toggleMode: () => void
    projects?: Project[]
    updatedAt?: number
    status?: string
}

export const Header = ({ undo, redo, undoDisabled, redoDisabled, mode, toggleMode, projects, updatedAt, status }: HeaderProps) => {
    const common = useTranslations("Common")

    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    const parseUpdateDate = (updatedAt: number) => {
        return formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            locale: ptBR,
        })
    }

    return (
        <div className="flex flex-row p-3 bg-background w-full items-center">
            <div className="flex flex-row gap-1 w-full items-center justify-end">
                <span
                    className="text-xs font-normal"
                >
                    {status && common(status)} {updatedAt && parseUpdateDate(updatedAt)}
                </span>
                <Button variant="ghost" size="icon" onClick={undo} disabled={undoDisabled}>
                    <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={redo} disabled={redoDisabled}>
                    <Redo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleMode}>
                    { mode === "edit" ? <Eye className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" onClick={toggleTheme}>
                    { theme === "light" ? <Sun className="h-4 w-4"/> : <Moon /> }
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger 
                        render={
                            <Button variant="ghost" size="icon">
                                <EllipsisVertical className="h-4 w-4"/>
                            </Button>
                        }
                    />
                    <DropdownMenuContent className="w-full">
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
            </div>
        </div>
    )
}
