"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function ActivationFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const publicIdFromQuery = searchParams.get("id") || "";

    const [publicId, setPublicId] = useState(publicIdFromQuery);
    const [claimCode, setClaimCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (publicIdFromQuery) {
            setPublicId(publicIdFromQuery);
        }
    }, [publicIdFromQuery]);

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
        <div className="max-w-md mx-auto py-8">
            <Card className="border-indigo-100 shadow-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-primary">Activar Tag NFC</CardTitle>
                    <CardDescription>
                        Ingresa el ID del tag y el código de activación para vincularlo a tu cuenta.
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
                                placeholder="Ej: abc-123"
                                required
                                value={publicId}
                                onChange={(e) => setPublicId(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="claimCode">Código de Activación</Label>
                            <Input
                                id="claimCode"
                                placeholder="Código secreto de 12 caracteres"
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

export default function ActivationPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <ActivationFormContent />
        </Suspense>
    );
}
