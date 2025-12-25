import { getSession } from "@/lib/auth";
// import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

// Disable caching to always read fresh session from cookies
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // Strict admin-only access
    if (!session.isLoggedIn) {
        return <div className="p-10 text-red-500 font-bold">DEBUG: Session Lost in Admin Layout (Redirect Prevented)</div>;
        // redirect("/login");
    }

    if (session.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <SidebarProvider>
            <AppSidebar user={{ role: session.role }} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <DashboardBreadcrumbs />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
