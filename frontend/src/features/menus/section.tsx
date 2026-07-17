import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash, ArrowDownToLine, Copy, SquarePlus, Sparkle, ListPlus } from "lucide-react";
import { strategyIcons, typesNames } from "../registry";

import { useTranslations } from "next-intl";

const SectionMenuButton = (props: React.ComponentProps<typeof Button>) => {
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
            <Plus className="h-3.5 w-3.5" />
        </Button>
    )
}

export const SectionMenu = () => {
    const tCommon = useTranslations("Common")
    const tTree = useTranslations("Tree")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<SectionMenuButton />} />
            <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkle />
                        <div className="text-sm font-medium truncate">
                            {tTree("improve with ai")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Pencil />
                        <div className="text-sm font-medium truncate">
                            {tTree("rename")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ListPlus />
                            <div className="text-sm font-medium truncate">
                                {tTree("add item")}
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {Object.keys(strategyIcons).map(it => {
                                    const IconComponent = strategyIcons[it] as React.ComponentType<{ className?: string }> | undefined;

                                    return (
                                        <DropdownMenuItem key={it}>
                                            <div className="flex flex-row gap-2">
                                                {IconComponent && (
                                                    <IconComponent className="h-4 w-4 shrink-0" />
                                                )}

                                                <div className="text-sm font-medium truncate">
                                                    {tCommon(it)}
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ArrowDownToLine />
                        <div className="text-sm font-medium truncate">
                            {tTree("add section below")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Copy />
                        <div className="text-sm font-medium truncate">
                            {tTree("duplicate")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <Trash />
                        <div className="text-sm font-medium truncate">
                            {tTree("delete")}
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
