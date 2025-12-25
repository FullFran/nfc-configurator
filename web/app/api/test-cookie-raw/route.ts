import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();

    // Set a raw, simple cookie
    cookieStore.set("raw_test_cookie", "hello_vercel_" + Date.now(), {
        secure: true,
        httpOnly: false, // Let client see it
        sameSite: "lax",
        path: "/",
        maxAge: 3600
    });

    return NextResponse.json({ success: true, message: "Raw cookie set" });
}
