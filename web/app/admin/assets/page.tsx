import { db } from "@/lib/db";
import { assets, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminAssetsPage() {
    const allAssets = await db
        .select({
            publicId: assets.publicId,
            name: assets.name,
            status: assets.status,
            userId: assets.userId,
            createdAt: assets.createdAt,
            claimedAt: assets.claimedAt,
            destinationUrl: assets.destinationUrl,
        })
        .from(assets)
        .orderBy(assets.createdAt);

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Todos los Assets</h2>
                <Badge variant="secondary">{allAssets.length} registros</Badge>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Público</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Propietario</TableHead>
                                <TableHead>Destino</TableHead>
                                <TableHead>Creado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allAssets.map((asset) => (
                                <TableRow key={asset.publicId}>
                                    <TableCell className="font-mono text-sm">{asset.publicId}</TableCell>
                                    <TableCell>{asset.name || "—"}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            asset.status === "ACTIVE" ? "default" :
                                                asset.status === "NO_CLAIMED" ? "secondary" : "destructive"
                                        }>
                                            {asset.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {asset.userId ? asset.userId.slice(0, 8) + "..." : "Sin reclamar"}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate text-xs">
                                        {asset.destinationUrl || "—"}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {asset.createdAt.toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
