import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Middleware is currently disabled/pass-through to avoid Edge Runtime issues with iron-session.
    // Auth is handled in Server Components (layout.tsx).
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - debug-session (debug page)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|debug-session).*)",
    ],
};
