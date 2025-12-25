import LoginForm from "./login-form";

export default async function LoginPage({
    searchParams
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const { next = "/dashboard" } = await searchParams;

    return <LoginForm next={next} />;
}
