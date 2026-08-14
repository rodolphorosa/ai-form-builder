import { 
    ColumnDef, 
    flexRender, 
    getCoreRowModel, 
    useReactTable 
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: unknown) => void
}

function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="flex flex-1 w-full overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow 
                            key={headerGroup.id}
                        >
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
                            className={cn(
                                onRowClick && "cursor-pointer",
                                row.id == "actions" && "max-w-12"
                            )}
                            onClick={(e) => {
                                onRowClick?.(row.original)
                            }}
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

export default DataTable