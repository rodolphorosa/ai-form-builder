import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ArrowDownToLine, ArrowUpToLine, Copy, Ellipsis, Pencil, Sparkle, Trash } from "lucide-react"
import { PropertiesTab } from "./props"

const ItemMenuButton = (props: React.ComponentProps<typeof Button>) => {
    return (
        <Button
            {...props}
            size="icon"
            variant="ghost"
            className="
                h-6
                w-6
                mr-1
                opacity-0
                group-hover:opacity-100
                transition-opacity
                text-muted-foreground
                hover:text-foreground
            "
        >
            <Ellipsis />
        </Button>
    )
}

interface ItemMenuProps {
    onEdit: (edit: boolean) => void
}

export const ItemMenu = ({ onEdit }: ItemMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<ItemMenuButton />} />
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkle />
                        <div className="text-sm font-medium truncate">
                            Improve with AI
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => onEdit(true)}>
                        <Pencil />
                        <div className="text-sm font-medium truncate">
                            Edit
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ArrowUpToLine />
                        <div className="text-sm font-medium truncate">
                            Add item above
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ArrowDownToLine />
                        <div className="text-sm font-medium truncate">
                            Add item below
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Copy />
                        <div className="text-sm font-medium truncate">
                            Duplicate
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <Trash />
                        <div className="text-sm font-medium truncate">
                            Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}