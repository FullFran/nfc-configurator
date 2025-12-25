// import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateAssetButton } from "@/components/create-asset-button";
import { QRDownloadButton } from "@/components/qr-download-button";

// Disable caching to always read fresh session from cookies
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Middleware handles auth redirect, this is just for getting user data
    // Update: Middleware check removed, layout handles it, but page needs it too to prevent DB errors
    const session = await getSession();

    if (!session.isLoggedIn) {
        // Redundant check because Layout skipped on soft-nav.
        // We need the diagnostics HERE too.
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const cookieVal = cookieStore.get("app_session_v3");
        const controlCookie = cookieStore.get("control_cookie");

        return (
            <div className="p-8 space-y-4 border-2 border-red-500 rounded m-4 bg-white text-black">
                <h2 className="text-xl font-bold text-red-600">DEBUG: Page-Level Session Check Failed</h2>
                <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
                    <div><strong>Session Cookie:</strong> {cookieVal ? "✅ YES" : "❌ NO"} (Len: {cookieVal?.value.length || 0})</div>
                    <div><strong>Control Cookie:</strong> {controlCookie ? "✅ YES" : "❌ NO"} (Val: {controlCookie?.value || "null"})</div>
                </div>
                <p className="text-sm text-gray-600">
                    If Control is YES but Session is NO -> Iron Session Issue.<br />
                    If BOTH are NO -> Browser Client-Nav Issue.
                </p>
            </div>
        );
    }

    const userAssets = await db
        .select()
        .from(assets)
        .where(eq(assets.userId, session.userId));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Mis Assets</h2>
                <CreateAssetButton />
            </div>

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
                                <div className="flex gap-2">
                                    <Button className="flex-1" asChild>
                                        <Link href={`/dashboard/edit/${asset.publicId}`}>Configurar</Link>
                                    </Button>
                                    <QRDownloadButton publicId={asset.publicId} />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
