import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { getSession } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        if (!session.isLoggedIn || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Generate unique publicId (8 chars) and claimCode (10 chars)
        const publicId = nanoid(8);
        const claimCode = nanoid(12);

        const [newAsset] = await db.insert(assets).values({
            publicId,
            claimCode,
            status: "ACTIVE",
            userId: session.userId,
            claimedAt: new Date(),
            name: "Nuevo QR",
        }).returning();

        return NextResponse.json({ success: true, asset: newAsset });
    } catch (error) {
        console.error("Asset creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
