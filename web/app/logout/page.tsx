import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    await session.destroy();
    redirect("/login");
}
