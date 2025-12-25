import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "nfc_config_session",
    cookieOptions: {
        secure: false, // Temporarily set to false for debugging production issue
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        sameSite: "lax",
        path: "/", // Ensure cookie is sent on all routes
    },
};

export const defaultSession: SessionData = {
    userId: "",
    email: "",
    role: "USER",
    isLoggedIn: false,
};
