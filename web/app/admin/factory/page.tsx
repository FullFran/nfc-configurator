"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Download, Loader2 } from "lucide-react";

interface GeneratedAsset {
    publicId: string;
    claimCode: string;
}

export default function FactoryPage() {
    const [count, setCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<GeneratedAsset[]>([]);

    const handleGenerate = async () => {
        if (count < 1 || count > 500) {
            toast.error("La cantidad debe estar entre 1 y 500");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/admin/factory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count }),
            });

            if (res.ok) {
                const data = await res.json();
                setResults(data.assets);
                toast.success(`${data.assets.length} assets generados correctamente`);
            } else {
                const err = await res.json();
                toast.error(err.error || "Error al generar");
            }
        } catch (error) {
            toast.error("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        const csv = results.map(a => `${a.publicId},${a.claimCode}`).join("\n");
        navigator.clipboard.writeText(`public_id,claim_code\n${csv}`);
        toast.success("Copiado al portapapeles");
    };

    const downloadCSV = () => {
        const csv = `public_id,claim_code\n${results.map(a => `${a.publicId},${a.claimCode}`).join("\n")}`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `assets-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 py-6">
            <h2 className="text-2xl font-bold tracking-tight">Fábrica de Assets</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Generar Nuevos Assets</CardTitle>
                    <CardDescription>
                        Crea lotes de assets con IDs y códigos de reclamación únicos para fabricación física.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-end gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="count">Cantidad</Label>
                            <Input
                                id="count"
                                type="number"
                                min={1}
                                max={500}
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                className="w-32"
                            />
                        </div>
                        <Button onClick={handleGenerate} disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {results.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Assets Generados ({results.length})</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copiar CSV
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadCSV}>
                                <Download className="mr-2 h-4 w-4" />
                                Descargar CSV
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="max-h-96 overflow-auto border rounded-md">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-muted">
                                    <tr>
                                        <th className="text-left p-2 font-medium">Public ID</th>
                                        <th className="text-left p-2 font-medium">Claim Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((asset) => (
                                        <tr key={asset.publicId} className="border-t">
                                            <td className="p-2 font-mono">{asset.publicId}</td>
                                            <td className="p-2 font-mono">{asset.claimCode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
