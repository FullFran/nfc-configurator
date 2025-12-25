import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function ActivarPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await getSession();
    const params = await searchParams;

    if (!session.isLoggedIn) {
        // Redirect to login with a hint of where to return
        const next = params.id ? `/activar?id=${params.id}` : "/activar";
        redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    const queryString = params.id ? `?id=${params.id}` : "";
    redirect(`/dashboard/activar${queryString}`);
}
