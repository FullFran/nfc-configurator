import { NextRequest, NextResponse } from "next/server";
import { signMessage, createMsgToSign } from "@/lib/crypto";

export const runtime = "edge";

export async function GET(
    req: NextRequest,
    { params }: { params: { publicId: string } }
) {
    const { publicId } = params;
    const baseUrl = req.nextUrl.origin;
    const timestamp = Date.now().toString();
    const path = `/api/internal/resolve/${publicId}`;

    // Create signature for Internal API
    const message = createMsgToSign(path, timestamp);
    const signature = await signMessage(message);

    try {
        const internalUrl = new URL(path, baseUrl);
        const response = await fetch(internalUrl, {
            headers: {
                "X-Internal-Signature": signature,
                "X-Timestamp": timestamp,
            },
            // Ensure we don't cache this at the edge level for now to allow status changes
            cache: "no-store",
        });

        if (!response.ok) {
            if (response.status === 404) {
                // Redirect to 404 Landing as per logica-producto.md
                return NextResponse.redirect(new URL("/404", baseUrl));
            }
            return new NextResponse("Internal Server Error", { status: 500 });
        }

        const { status, destinationUrl } = await response.json();

        // Redirection logic from logica-producto.md
        if (status === "NO_CLAIMED") {
            return NextResponse.redirect(new URL(`/activar?id=${publicId}`, baseUrl));
        }

        if (status === "DISABLED") {
            return NextResponse.redirect(new URL("/error/disabled", baseUrl));
        }

        if (status === "ACTIVE" && destinationUrl) {
            // Validate it's a secure URL
            if (!destinationUrl.startsWith("https://")) {
                return new NextResponse("Invalid destination protocol", { status: 400 });
            }

            // Asynchronous analytics trigger
            const trackPath = "/api/internal/track";
            const trackMsg = createMsgToSign(trackPath, timestamp);
            const trackSig = await signMessage(trackMsg);

            // We use context.waitUntil to avoid blocking the redirect response
            // (WaitUntil is available in Edge Runtime via the Request/Response cycle)
            const trackEvent = async () => {
                try {
                    await fetch(new URL(trackPath, baseUrl), {
                        method: "POST",
                        headers: {
                            "X-Internal-Signature": trackSig,
                            "X-Timestamp": timestamp,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            publicId,
                            ipAddress: req.headers.get("x-forwarded-for"),
                            userAgent: req.headers.get("user-agent"),
                            referer: req.headers.get("referer"),
                        }),
                    });
                } catch (e) {
                    console.error("Failed to track event", e);
                }
            };

            // In Vercel Edge, standard way is to use event.waitUntil if passing event,
            // but in Next.js Middleware/Routes, it often happens automatically if not awaited,
            // or we can just fire and forget since the redirect is the primary goal.
            trackEvent();

            return NextResponse.redirect(new URL(destinationUrl));
        }

        return new NextResponse("Invalid asset state", { status: 500 });
    } catch (error) {
        console.error("Resolver error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
