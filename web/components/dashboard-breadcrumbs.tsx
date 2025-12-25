"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

const routeMap: Record<string, string> = {
    dashboard: "Dashboard",
    activar: "Activar NFC",
    docs: "Guía de Inicio",
}

export function DashboardBreadcrumbs() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    const url = `/${segments.slice(0, index + 1).join("/")}`
                    const isLast = index === segments.length - 1
                    const label = routeMap[segment] || segment

                    return (
                        <React.Fragment key={url}>
                            <BreadcrumbItem className={index === 0 && segments.length > 1 ? "hidden md:block" : ""}>
                                {isLast ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
