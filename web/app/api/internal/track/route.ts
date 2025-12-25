import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { redirectEvents } from "@/lib/db/schema";
import { verifySignature, createMsgToSign } from "@/lib/crypto";

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("X-Internal-Signature");
        const timestamp = req.headers.get("X-Timestamp");

        if (!signature || !timestamp) return new NextResponse("Unauthorized", { status: 401 });

        const message = createMsgToSign("/api/internal/track", timestamp);
        const isValid = await verifySignature(message, signature);

        if (!isValid) return new NextResponse("Invalid signature", { status: 403 });

        const { publicId, ipAddress, userAgent, referer } = await req.json();

        await db.insert(redirectEvents).values({
            assetPublicId: publicId,
            ipAddress,
            userAgent,
            referer,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking error:", error);
        return new NextResponse("Error", { status: 500 });
    }
}
