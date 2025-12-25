import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        // Admin-only endpoint
        if (!session.isLoggedIn || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { count } = await req.json();

        if (!count || count < 1 || count > 500) {
            return NextResponse.json({ error: "Count must be between 1 and 500" }, { status: 400 });
        }

        const generatedAssets = [];

        for (let i = 0; i < count; i++) {
            const publicId = nanoid(8);
            const claimCode = nanoid(12);

            const [newAsset] = await db.insert(assets).values({
                publicId,
                claimCode,
                status: "NO_CLAIMED",
            }).returning({
                publicId: assets.publicId,
                claimCode: assets.claimCode,
            });

            generatedAssets.push(newAsset);
        }

        return NextResponse.json({ success: true, assets: generatedAssets });
    } catch (error) {
        console.error("Factory error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
