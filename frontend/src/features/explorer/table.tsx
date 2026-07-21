import { Project } from "@/types/form"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Archive, Ellipsis, Pencil, Pin, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "createdAt",
        header: "Data de criação"
    },
    {
        accessorKey: "updatedAt",
        header: "Modificado"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button size="icon" variant="ghost"><Ellipsis className="h-4 w-4" /></Button>} />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="text-sm font-medium">
                                <Pencil className="h-4 w-4" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm font-medium">
                                <Pin className="h-4 w-4" />
                                Fixar projeto
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-sm font-medium">
                                <Archive className="h-4 w-4" />
                                Arquivar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive" className="text-sm font-medium">
                                <Trash className="h-4 w-4" />
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead 
                                    key={header.id}
                                    className="text-sm font-medium px-4 py-2"
                                >
                                    {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell 
                                    key={cell.id}
                                    className="text-sm font-normal px-4 py-2"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )
                }
                </TableBody>
            </Table>
        </div>
    )
}