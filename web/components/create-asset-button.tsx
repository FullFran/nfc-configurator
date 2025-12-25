"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is available or will be

export function CreateAssetButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/assets/create", {
                method: "POST",
            });

            if (res.ok) {
                const data = await res.json();
                toast.success("Asset virtual creado correctamente");
                router.refresh();
            } else {
                toast.error("Error al crear el asset");
            }
        } catch (error) {
            toast.error("Error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleCreate} disabled={loading} className="gap-2">
            <PlusCircle className="size-4" />
            {loading ? "Creando..." : "Crear Nuevo QR"}
        </Button>
    );
}
