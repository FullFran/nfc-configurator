import { db } from "@/lib/db";
import { assets, users, redirectEvents } from "@/lib/db/schema";
import { count, eq, isNull, isNotNull } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Package, Users, MousePointerClick, PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
    // Fetch global metrics
    const [totalAssetsResult] = await db.select({ count: count() }).from(assets);
    const [claimedAssetsResult] = await db.select({ count: count() }).from(assets).where(isNotNull(assets.userId));
    const [unclaimedAssetsResult] = await db.select({ count: count() }).from(assets).where(isNull(assets.userId));
    const [totalUsersResult] = await db.select({ count: count() }).from(users);
    const [totalClicksResult] = await db.select({ count: count() }).from(redirectEvents);

    const stats = [
        {
            title: "Total Assets",
            value: totalAssetsResult?.count ?? 0,
            icon: Package,
            description: "Activos en el sistema",
        },
        {
            title: "Assets Reclamados",
            value: claimedAssetsResult?.count ?? 0,
            icon: PackageOpen,
            description: "Vinculados a usuarios",
        },
        {
            title: "Usuarios Registrados",
            value: totalUsersResult?.count ?? 0,
            icon: Users,
            description: "Cuentas activas",
        },
        {
            title: "Total Escaneos",
            value: totalClicksResult?.count ?? 0,
            icon: MousePointerClick,
            description: "Redirecciones totales",
        },
    ];

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Panel de Administración</h2>
                <Button asChild>
                    <Link href="/admin/factory">Generar Assets</Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gestión de Assets</CardTitle>
                    <CardDescription>Ver y gestionar todos los assets del sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" asChild>
                        <Link href="/admin/assets">Ver Todos los Assets</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
