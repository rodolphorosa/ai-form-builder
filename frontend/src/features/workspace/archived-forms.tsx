"use client"

import { useWorkspace } from "@/contexts/workspace-context"
import DataTable from "../table/table"
import { ColumnDef } from "@tanstack/react-table"
import { Form } from "@/types/form"
import { useLocale, useTranslations } from "next-intl"
import { ArchiveX, Ellipsis, FileArchive, FileText, Trash } from "lucide-react"
import { parseUpdateDate } from "@/lib/utils"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { formService } from "@/api/form.service"
import useForms from "@/hooks/use-forms"
import { useRouter } from "@/i18n/navigation"

function ArchivedForms () {
    const locale = useLocale()
    const i18nCommon = useTranslations("Common")
    const { unarchiveForm, deleteForm } = useForms()
    const { archivedForms, refreshArchivedForms, refreshForms } = useWorkspace()

    const router = useRouter()

    const columns: ColumnDef<Form>[] = [
        {
            accessorKey: "name",
            header: i18nCommon("name"),
            cell: ({ row }) => {
                const form = row.original

                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="p-2 bg-green-400/25 text-green-400 rounded-sm">
                            <FileArchive className="h-4 w-4 shrink-0" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm">
                                {form.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {i18nCommon("project")}: {form.projectName}
                            </span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "updated-at",
            accessorFn: (form: Form) => parseUpdateDate(form.updatedAt, locale),
            header: i18nCommon("updated")
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const form = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                            render={
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => e.stopPropagation()}
                                    // onPointerDown={(e) => e.stopPropagation()}
                                    className="w-8 h-8"
                                >
                                    <Ellipsis className="h-4 w-4 shrink-0" />
                                </Button>
                            }
                        />
                        <DropdownMenuContent className="w-fit">
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        unarchiveForm(form)
                                        .then(() => {
                                            refreshArchivedForms()
                                            refreshForms()
                                        })
                                    }}
                                >
                                    <ArchiveX className="h-4 w-4 shrink-0" />
                                    {i18nCommon("unarchive")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem 
                                    variant="destructive"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteForm(form)
                                        .then(() => {
                                            refreshArchivedForms()
                                            refreshForms()
                                        })
                                    }}
                                >
                                    <Trash className="h-4 w-4 shrink-0" />
                                    {i18nCommon("delete")}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]


    const onFormClick = (row: unknown): void => {
        const form = row as Form
        router.push(`/forms/${form.id}`)
    }

    return (
        <div className="bg-card">
            <DataTable columns={columns} data={archivedForms} onRowClick={onFormClick} />
        </div>
    )
}

export default ArchivedForms