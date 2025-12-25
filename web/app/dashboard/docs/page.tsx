import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Info, ArrowRight } from "lucide-react"

export default function DocsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight">Guía de Inicio</h1>
                <p className="text-xl text-muted-foreground">
                    Aprende a configurar tus activos NFC y QR en cuestión de minutos.
                </p>
            </div>

            <div className="grid gap-6">
                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Paso 1</Badge>
                            <CardTitle>Reclamar tu Activo</CardTitle>
                        </div>
                        <CardDescription>
                            Cada producto físico viene con un identificador único y un código de reclamación secreto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm">
                            Para empezar, ve a la sección <strong>Activar NFC</strong> en el menú lateral. Introduce el ID público y el código de seguridad que encontrarás en tu dispositivo.
                        </p>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            <Info className="size-4" />
                            <span>Si escaneas el código QR original, serás redirigido automáticamente al formulario de activación.</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Paso 2</Badge>
                            <CardTitle>Configurar la Redirección</CardTitle>
                        </div>
                        <CardDescription>
                            Tus activos son dinámicos. Puedes cambiar a dónde apuntan en cualquier momento.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="grid gap-3">
                            <li className="flex gap-3 text-sm">
                                <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                                <span>Ve a <strong>Mis Assets</strong> y selecciona el activo que quieras modificar.</span>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                                <span>Introduce la nueva URL de destino (por ejemplo, tu perfil de Instagram o una carta digital).</span>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <CheckCircle2 className="size-5 text-green-500 shrink-0" />
                                <span>Guarda los cambios. La actualización es instantánea a nivel global.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Paso 3</Badge>
                            <CardTitle>Análisis y Métricas</CardTitle>
                        </div>
                        <CardDescription>
                            Próximamente: Rastrea el rendimiento de tus activos en tiempo real.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground italic">
                            Estamos trabajando en un panel de métricas avanzado donde podrás ver clics totales, dispositivos utilizados y ubicación geográfica (anonimizada) de tus usuarios.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="pt-8 border-t flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium">¿Necesitas ayuda adicional?</p>
                    <p className="text-xs text-muted-foreground">Contacta con nuestro equipo de soporte.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer group">
                    Soporte Técnico <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    )
}
