import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 h-16 flex items-center border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">B</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Blakia Configurator</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {!session.isLoggedIn ? (
            <>
              <Link className="text-sm font-medium hover:text-primary transition-colors h-9 flex items-center" href="/login">
                Iniciar Sesión
              </Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors h-9 flex items-center" href="/register">
                Registrarse
              </Link>
            </>
          ) : (
            <Link className="text-sm font-medium hover:text-primary transition-colors h-9 flex items-center" href="/dashboard">
              Mi Panel
            </Link>
          )}
          <Button asChild>
            <Link href="/activar">Activar Tag</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 bg-gradient-to-b from-indigo-50 to-background dark:from-indigo-950/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Lleva tus etiquetas <span className="text-primary">al siguiente nivel</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                  Configura y gestiona tus dispositivos NFC y códigos QR de forma instantánea. Cambia destinos, mide analíticas y escala tu presencia física.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="text-lg px-8 h-12" asChild>
                  <Link href="/activar">Vincular mi primer Tag</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
                  <Link href={session.isLoggedIn ? "/dashboard" : "/login"}>
                    {session.isLoggedIn ? "Ir a mi Panel" : "Acceder a mi Panel"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick info */}
        <section className="py-20 bg-card">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Resolución Edge", desc: "Redirecciones ultra rápidas en menos de 100ms gracias al motor global de Vercel." },
                { title: "Analíticas Reales", desc: "Mide cada escaneo: país, dispositivo y hora para entender a tu audiencia." },
                { title: "Control Flexible", desc: "Cambia la URL de destino de tus tags en cualquier momento sin recodificar nada." }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-lg bg-background/50">
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t text-center text-sm text-muted-foreground">
        <p>© 2025 Blakia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
