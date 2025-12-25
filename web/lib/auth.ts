import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData, defaultSession } from "./session";

export async function getSession() {
    const cookieStore = await cookies();
    console.log("[AUTH] Getting session, cookie store available:", !!cookieStore);

    const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
    console.log("[AUTH] Session retrieved:", { isLoggedIn: session.isLoggedIn, userId: session.userId });

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.userId = defaultSession.userId;
        session.email = defaultSession.email;
        session.role = defaultSession.role;
    }

    return session;
}
