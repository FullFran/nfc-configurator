import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    // Hardcoded password for debugging production environment issues
    password: "complex_password_at_least_32_characters_long_for_debug",
    cookieName: "nfc_config_session",
    cookieOptions: {
        secure: true, // Required for SameSite: "none"
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
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
