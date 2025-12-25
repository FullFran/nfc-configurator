import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function EditAssetPage({ params }: { params: Promise<{ publicId: string }> }) {
    const { publicId } = await params;
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/login");
    }

    const [asset] = await db
        .select()
        .from(assets)
        .where(and(eq(assets.publicId, publicId), eq(assets.userId, session.userId)));

    if (!asset) {
        notFound();
    }

    async function updateAsset(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const destinationUrl = formData.get("destinationUrl") as string;

        if (!destinationUrl.startsWith("https://")) {
            return; // Basic validation
        }

        await db
            .update(assets)
            .set({ name, destinationUrl, status: "ACTIVE" })
            .where(eq(assets.publicId, publicId));

        revalidatePath("/dashboard");
        redirect("/dashboard");
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Configurar Asset</CardTitle>
                    <CardDescription>ID: {publicId}</CardDescription>
                </CardHeader>
                <form action={updateAsset}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del Asset</Label>
                            <Input id="name" name="name" defaultValue={asset.name || ""} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="destinationUrl">URL de Destino (HTTPS)</Label>
                            <Input
                                id="destinationUrl"
                                name="destinationUrl"
                                type="url"
                                placeholder="https://su-sitio.com"
                                defaultValue={asset.destinationUrl || ""}
                                pattern="https://.*"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" asChild>
                            <Link href="/dashboard">Cancelar</Link>
                        </Button>
                        <Button type="submit">Guardar Cambios</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
