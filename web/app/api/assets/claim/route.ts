import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();

        if (!session.isLoggedIn) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { public_id, claim_code } = await req.json();

        if (!public_id || !claim_code) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // 1. Find asset with claim code and public_id
        const [asset] = await db
            .select()
            .from(assets)
            .where(and(eq(assets.publicId, public_id), eq(assets.claimCode, claim_code)));

        if (!asset) {
            return NextResponse.json({ error: "Invalid ID or Claim Code" }, { status: 404 });
        }

        if (asset.status !== "NO_CLAIMED") {
            return NextResponse.json({ error: "Asset already claimed" }, { status: 400 });
        }

        // 2. Claim it
        await db
            .update(assets)
            .set({
                userId: session.userId,
                status: "ACTIVE",
                claimedAt: new Date(),
                name: `Asset ${public_id}`, // Default name
            })
            .where(eq(assets.publicId, public_id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Claim error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
