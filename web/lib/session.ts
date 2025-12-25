import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "app_session_v3", // Fresh name
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", // Secure in prod, insecure in dev
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        sameSite: "lax", // Standard first-party behavior
        path: "/",
    },
};

export const defaultSession: SessionData = {
    userId: "",
    email: "",
    role: "USER",
    isLoggedIn: false,
};
