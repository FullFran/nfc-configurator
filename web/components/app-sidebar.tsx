"use client"

import * as React from "react"
import {
    BookOpen,
    LayoutDashboard,
    LogOut,
    PlusCircle,
    ShieldCheck,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user?: {
        role: string;
    };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const pathname = usePathname()

    const navItems = [
        {
            title: "Mis Assets",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Activar NFC",
            url: "/dashboard/activar",
            icon: PlusCircle,
        },
        {
            title: "Guía de Inicio",
            url: "/dashboard/docs",
            icon: BookOpen,
        },
    ]

    const adminItems = user?.role === "ADMIN" ? [
        {
            title: "Panel Admin",
            url: "/admin",
            icon: ShieldCheck,
        },
    ] : []

    const sidebarGroups = [
        {
            title: "Menú",
            items: navItems,
        },
        ...(adminItems.length > 0 ? [{ title: "Administración", items: adminItems }] : []),
    ];

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <LayoutDashboard className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none text-left">
                                    <span className="font-semibold">NFC Config</span>
                                    <span className="text-xs text-muted-foreground">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {sidebarGroups.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={pathname === item.url}
                                        >
                                            <Link href={item.url}>
                                                {item.icon && <item.icon className="size-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Cerrar Sesión">
                            <Link href="/logout">
                                <LogOut className="size-4" />
                                <span>Cerrar Sesión</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
