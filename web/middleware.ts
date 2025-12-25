import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "./lib/session";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes, static files, etc.
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Get session from cookie
    // SKIP MIDDLEWARE AUTH CHECK FOR NOW - Moving to Server Components
    /*
    // Get session from cookie
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, sessionOptions);

    const isLoggedIn = session.isLoggedIn === true;
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    console.log(`[MIDDLEWARE] Path: ${pathname}, isLoggedIn: ${isLoggedIn}, isProtected: ${isProtectedRoute}`);

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !isLoggedIn) {
        console.log(`[MIDDLEWARE] Redirecting to login - not authenticated`);
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users from auth routes to dashboard
    if (isAuthRoute && isLoggedIn) {
        console.log(`[MIDDLEWARE] Redirecting to dashboard - already authenticated`);
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    */

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
