"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClaimPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const publicIdFromQuery = searchParams.get("id") || "";

    const [publicId, setPublicId] = useState(publicIdFromQuery);
    const [claimCode, setClaimCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/assets/claim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ public_id: publicId, claim_code: claimCode }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError(data.error || "Código de activación incorrecto");
            }
        } catch (err) {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-indigo-200">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-primary">Activar Tag NFC</CardTitle>
                    <CardDescription>
                        Ingresa el código que aparece en el reverso de tu tag para activarlo
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleClaim}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="publicId">ID del Tag</Label>
                            <Input
                                id="publicId"
                                placeholder="Ex: abc-123"
                                required
                                value={publicId}
                                onChange={(e) => setPublicId(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="claimCode">Código de Activación</Label>
                            <Input
                                id="claimCode"
                                placeholder="Código de 12 dígitos"
                                required
                                value={claimCode}
                                onChange={(e) => setClaimCode(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Activando..." : "Vincular mi Asset"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
