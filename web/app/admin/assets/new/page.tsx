import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function NewAssetsPage() {
    const session = await getSession();

    if (!session.isLoggedIn || session.role !== "ADMIN") {
        redirect("/login");
    }

    async function generateTags(formData: FormData) {
        "use server";
        const countStr = formData.get("count") as string;
        const count = parseInt(countStr, 10);

        if (isNaN(count) || count <= 0 || count > 100) return;

        for (let i = 0; i < count; i++) {
            const publicId = nanoid(10);
            const claimCode = nanoid(12);

            await db.insert(assets).values({
                publicId,
                claimCode,
                status: "NO_CLAIMED",
            });
        }

        redirect("/admin/assets");
    }

    return (
        <div className="container mx-auto p-6 max-w-sm">
            <Card>
                <CardHeader>
                    <CardTitle>Generar Nuevos Tags</CardTitle>
                    <CardDescription>Crea nuevos IDs y Claim Codes de forma masiva.</CardDescription>
                </CardHeader>
                <form action={generateTags}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="count">Cantidad (Máx 100)</Label>
                            <Input
                                id="count"
                                name="count"
                                type="number"
                                min="1"
                                max="100"
                                defaultValue="10"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Generar Batch</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
