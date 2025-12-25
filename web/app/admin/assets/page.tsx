import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminAssetsPage() {
    const session = await getSession();

    if (!session.isLoggedIn || session.role !== "ADMIN") {
        redirect("/login");
    }

    const allAssets = await db.select().from(assets).orderBy(desc(assets.createdAt));

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Inventario de Tags</h1>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Public ID</TableHead>
                            <TableHead>Claim Code</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Registrado el</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAssets.map((asset) => (
                            <TableRow key={asset.publicId}>
                                <TableCell className="font-mono text-xs">{asset.publicId}</TableCell>
                                <TableCell className="font-mono text-xs">{asset.claimCode}</TableCell>
                                <TableCell>
                                    <Badge variant={asset.status === "ACTIVE" ? "default" : "secondary"}>
                                        {asset.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {new Date(asset.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
