import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export default async function LoginPage({
    searchParams
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const session = await getSession();
    const { next = "/dashboard" } = await searchParams;

    if (session.isLoggedIn) {
        redirect(next);
    }

    return <LoginForm next={next} />;
}
