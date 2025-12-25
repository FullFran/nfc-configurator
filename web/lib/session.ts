import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    // FORCE HARDCODED PASSWORD TO ELIMINATE ENV VAR FAILURE
    password: "complex_password_at_least_32_characters_long_verified",
    cookieName: "app_session_v3", // Fresh name
    cookieOptions: {
        secure: true, // Force Secure to avoid potential NODE_ENV mismatch
        maxAge: 3600, // Match Control Cookie (1 hour)
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
