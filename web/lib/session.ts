import { SessionOptions } from "iron-session";

export interface SessionData {
    userId: string;
    email: string;
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
    cookieName: "nfc_config_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export const defaultSession: SessionData = {
    userId: "",
    email: "",
    isLoggedIn: false,
};
