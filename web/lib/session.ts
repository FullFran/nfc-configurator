import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "nfc_session_debug", // New name to force fresh cookie
    cookieOptions: {
        secure: true, // Required for SameSite: "none"
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: false, // TEMPORARY: Allow client JS to see cookie for debugging
        sameSite: "none", // Allow cross-site to avoid lax blocking issues
        path: "/", // Ensure cookie is sent on all routes
    },
};

export const defaultSession: SessionData = {
    userId: "",
    email: "",
    role: "USER",
    isLoggedIn: false,
};
