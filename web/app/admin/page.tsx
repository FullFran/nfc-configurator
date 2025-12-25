import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets, users, redirectEvents } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const session = await getSession();

    if (!session.isLoggedIn || session.role !== "ADMIN") {
        redirect("/login");
    }

    // Basic Stats
    const [totalAssets] = await db.select({ value: count() }).from(assets);
    const [claimedAssets] = await db.select({ value: count() }).from(assets).where(eq(assets.status, "ACTIVE"));
    const [totalUsers] = await db.select({ value: count() }).from(users);
    const [totalEvents] = await db.select({ value: count() }).from(redirectEvents);

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Panel de Administración</h1>
                <div className="space-x-4">
                    <Button asChild>
                        <Link href="/admin/assets/new">Generar Tags</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">Ver mi Panel Particular</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAssets.value}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Tags Vinculados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{claimedAssets.value}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers.value}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Redirecciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEvents.value}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Gestión Rápida</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/admin/assets"
                        className="flex items-center p-4 rounded-lg border hover:bg-muted transition-colors"
                    >
                        <div className="flex-1">
                            <div className="font-medium">Inventario de Tags</div>
                            <div className="text-sm text-muted-foreground">Ver todos los IDs y Códigos de Reclamación</div>
                        </div>
                    </Link>
                    {/* Placeholder for future admin tools */}
                </div>
            </div>
        </div>
    );
}
