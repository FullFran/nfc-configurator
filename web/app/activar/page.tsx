import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ClaimForm from "./claim-form";

export default async function ActivarPage() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        // Redirect to login with a hint of where to return
        redirect("/login?next=/activar");
    }

    return <ClaimForm />;
}
