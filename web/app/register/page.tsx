import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register-form";

export default async function RegisterPage({
    searchParams
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const session = await getSession();
    const { next = "/dashboard" } = await searchParams;

    if (session.isLoggedIn) {
        redirect(next);
    }

    return <RegisterForm next={next} />;
}
