"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useWorkspace } from "@/contexts/workspace-context"
import { Archive, Astroid, ChevronDown, ChevronsUpDown, CircleUser, FileText, FolderClosed, Home, LibraryBig, LogOut, Pin, Search, Settings, Trash2, User } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

interface MenuOption {
    icon: React.ComponentType
    title: string
    action: () => void
}

function AppSidebar () {
    const i18nSidebar = useTranslations("Sidebar")
    const i18nCommon = useTranslations("Common")

    const { setOpen } = useSidebar()

    const { forms, projects } = useWorkspace()
    const { user, logout } = useAuth()

    const menuOptions: MenuOption[] = [
        {
            icon: Home,
            title: "Home",
            action: () => {}
        },
        {
            icon: Search,
            title: i18nSidebar("search"),
            action: () => {}
        },
        {
            icon: LibraryBig,
            title: i18nSidebar("library"),
            action: () => {}
        },
        {
            icon: FolderClosed,
            title: i18nSidebar("projects"),
            action: () => {}
        },
        {
            icon: Archive,
            title: i18nSidebar("archived"),
            action: () => {}
        },
        {
            icon: Trash2,
            title: i18nSidebar("trash"),
            action: () => {}
        },
    ]
    const pinnedForms = forms.filter(it => it.pinned == true)
    const pinnedProjects = projects.filter(it => it.pinned == true)
    
    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex flex-row items-center justify-between">
                        <SidebarMenuButton onClick={() => setOpen(true)} className="flex-1">
                            <Astroid />
                            Smart Form Builder
                        </SidebarMenuButton>
                        <SidebarTrigger className="group-data-[collapsible=icon]:hidden shrink-0" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuOptions.map(option => {
                                const IconComponent = option.icon as React.ComponentType<{ className?: string }>

                                return (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <IconComponent className="h-5 w-5 shrink-0" />
                                            {option.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-4">
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarGroupLabel 
                                        render={
                                            <CollapsibleTrigger />
                                        }
                                        className="flex justify-between text-sm"
                                    >
                                        {i18nSidebar("pinned")}
                                        <ChevronDown className="h-4 w-4 shrink-0" />
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <div className="flex flex-col">
                                            {pinnedProjects.map(project => (
                                                <div 
                                                    key={project.id}
                                                    className="flex flex-row gap-2 p-2 items-center rounded-lg hover:bg-muted"
                                                >
                                                    <FolderClosed className="h-4 w-4 shrink-0"/>
                                                    <span className="truncate">{project.name}</span>
                                                </div>
                                            ))}
                                            {pinnedForms.map(form => (
                                                <div
                                                    key={form.id}
                                                    className="flex flex-row gap-2 p-2 items-center rounded-lg hover:bg-muted"
                                                >
                                                    <span className="truncate">{form.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarGroupLabel
                                        render={
                                            <CollapsibleTrigger />
                                        }
                                        className="flex justify-between text-sm"
                                    >
                                        {i18nCommon("recent")}
                                        <ChevronDown className="h-4 w-4 shrink-0" />
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <div className="flex flex-col">
                                            {forms.map(form => (
                                                <div
                                                    key={form.id}
                                                    className="flex p-2 items-center rounded-lg hover:bg-muted"
                                                >
                                                    <span className="truncate">{form.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarFallback className="rounded-lg">
                                                <User className="h-4 w-4 shrink-0" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                            <span className="truncate font-medium">{user?.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                                    </SidebarMenuButton>
                                }
                            />
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="right"
                                align="end"
                                sideOffset={4}
                            >
                                <div className="flex flex-row gap-2 p-2">
                                    <Avatar>
                                        <AvatarFallback>
                                            <User className="h-4 w-4 shrink-0" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-sm font-medium">{user?.name}</div>
                                        <div className="text-xs text-muted-foreground">{user?.email}</div>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <CircleUser className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("profile")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}}>
                                        <Settings className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("settings")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={logout}>
                                        <LogOut className="h-4 w-4 shrink-0" />
                                        {i18nSidebar("logout")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar