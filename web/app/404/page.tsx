import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4 text-center">
            <h1 className="text-6xl font-black text-indigo-600">404</h1>
            <h2 className="text-2xl font-bold">Tag no encontrado</h2>
            <p className="text-muted-foreground max-w-md">
                El código que has escaneado no existe en nuestro sistema. Por favor, verifica el enlace o contacta con soporte.
            </p>
            <Button asChild className="mt-4">
                <Link href="/">Ir al Inicio</Link>
            </Button>
        </div>
    );
}
