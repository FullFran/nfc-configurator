import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { assets } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifySignature, createMsgToSign } from "@/lib/crypto";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ publicId: string }> }
) {
    const { publicId } = await params;
    const signature = req.headers.get("X-Internal-Signature");
    const timestamp = req.headers.get("X-Timestamp");

    if (!signature || !timestamp) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify HMAC signature
    const message = createMsgToSign(`/api/internal/resolve/${publicId}`, timestamp);
    const isValid = await verifySignature(message, signature);

    if (!isValid) {
        return new NextResponse("Invalid signature", { status: 403 });
    }

    // Replay attack protection: ensure timestamp is within the last 30 seconds
    const now = Date.now();
    const requestTime = parseInt(timestamp, 10);
    if (isNaN(requestTime) || Math.abs(now - requestTime) > 30000) {
        return new NextResponse("Request expired", { status: 403 });
    }

    // Fetch asset
    const [asset] = await db.select().from(assets).where(eq(assets.publicId, publicId));

    if (!asset) {
        return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json({
        status: asset.status,
        destinationUrl: asset.destinationUrl,
    });
}
