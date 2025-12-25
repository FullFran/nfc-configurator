import RegisterForm from "./register-form";

export default async function RegisterPage({
    searchParams
}: {
    searchParams: Promise<{ next?: string }>
}) {
    const { next = "/dashboard" } = await searchParams;

    return <RegisterForm next={next} />;
}
