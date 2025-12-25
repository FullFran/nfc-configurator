import { getSession } from "@/lib/auth";

// Disable caching to always read fresh session from cookies
export const dynamic = 'force-dynamic';

export default async function DebugSessionPage() {
    const session = await getSession();

    return (
        <div className="p-8 font-mono">
            <h1 className="text-xl font-bold mb-4">Session Debug</h1>
            <pre className="bg-slate-100 p-4 rounded whitespace-pre-wrap">
                {JSON.stringify({
                    isLoggedIn: session.isLoggedIn,
                    userId: session.userId,
                    role: session.role,
                    email: session.email,
                    cookieName: "nfc_config_session",
                    nodeEnv: process.env.NODE_ENV,
                    timestamp: new Date().toISOString(),
                }, null, 2)}
            </pre>
            <div className="mt-4">
                <p>If isLoggedIn is false here, the server is not receiving or accepting the cookie.</p>
                <p>If isLoggedIn is true here, but dashboard fails, the Middleware is the issue.</p>
            </div>
        </div>
    );
}
