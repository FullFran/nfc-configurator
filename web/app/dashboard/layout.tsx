import { AppSidebar } from "@/components/app-sidebar"
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { cookies } from "next/headers";

// Disable caching to always read fresh session from cookies
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // ...

    // Check session - if not logged in, SHOW DEBUG ERROR instead of redirect
    const session = await getSession();

    if (!session.isLoggedIn) {
        const cookieStore = await cookies();
        const cookieVal = cookieStore.get("app_session_v3");

        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-red-50 text-red-900 font-mono">
                <div className="max-w-2xl space-y-4 border-2 border-red-500 p-8 rounded bg-white">
                    <h1 className="text-3xl font-bold text-red-600">⚠️ SESSION INVALID (Debug Mode)</h1>
                    <p>The Server received your request but found no valid session.</p>

                    <div className="bg-gray-100 p-4 rounded text-sm space-y-2 text-black">
                        <div><strong>Cookie Name:</strong> app_session_v3</div>
                        <div><strong>Cookie Present:</strong> {cookieVal ? "YES ✅" : "NO ❌"}</div>
                        <div><strong>Cookie Length:</strong> {cookieVal?.value.length || 0} chars</div>
                        <div><strong>Session UserID:</strong> {session.userId || "undefined"}</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded text-sm text-blue-800">
                        <strong>Diagnosis:</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            {!cookieVal && <li>The BROWSER did not send the cookie. (Check Network Tab)</li>}
                            {cookieVal && <li>The Cookie was sent but decryption FAILED. (Check Password/Keys)</li>}
                        </ul>
                    </div>

                    <a href="/login" className="block w-full text-center bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700">
                        Go to Login
                    </a>
                </div>
            </div>
        );
        // redirect("/login");
    }

    return (
        <SidebarProvider>
            <AppSidebar user={{ role: session.role || "USER" }} />
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
    )
}
