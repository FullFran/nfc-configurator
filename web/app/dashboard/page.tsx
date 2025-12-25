import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    const userAssets = await db
        .select()
        .from(assets)
        .where(eq(assets.userId, session.userId));

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userAssets.length === 0 ? (
                    <Card className="col-span-full p-12 flex flex-col items-center justify-center text-center">
                        <CardTitle className="text-xl mb-2">No tienes assets activados</CardTitle>
                        <p className="text-muted-foreground mb-4">
                            Escanea un código QR o ingresa un ID para empezar.
                        </p>
                    </Card>
                ) : (
                    userAssets.map((asset) => (
                        <Card key={asset.publicId}>
                            <CardHeader>
                                <CardTitle className="truncate">{asset.name || "Asset sin nombre"}</CardTitle>
                                <p className="text-sm text-muted-foreground">ID: {asset.publicId}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm">
                                    <span className="font-semibold text-primary">Destino:</span>{" "}
                                    <span className="truncate block">{asset.destinationUrl || "No configurado"}</span>
                                </div>
                                <Button className="w-full" asChild>
                                    <Link href={`/dashboard/edit/${asset.publicId}`}>Configurar</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
