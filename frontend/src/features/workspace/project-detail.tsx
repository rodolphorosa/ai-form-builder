import { useWorkspace } from "@/contexts/workspace-context"
import { parseUpdateDate } from "@/lib/utils"
import { Form } from "@/types/form"
import { ColumnDef } from "@tanstack/react-table"
import { FileText, FolderClosed, FolderOpen } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import DataTable from "../table/table"

function ProjectPage() {
    const locale = useLocale()
    const i18nCommon = useTranslations("Common")

    const { forms } = useWorkspace()
    
    const columns: ColumnDef<Form>[] = [
        {
            id: "form",
            header: i18nCommon("name"),
            cell: ({ row }) => {
                const form = row.original

                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="p-2 bg-muted rounded-sm">
                            <FileText className="h-4 w-4 shrink-0" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm">
                                {form.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {form.description}
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
        }
    ]


    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-2 items-center">
                <FolderOpen />
                <span className="text-2xl">
                    Project
                </span>
            </div>
            <DataTable 
                columns={columns}
                data={forms}
            />
        </div>
    )
}

export default ProjectPage