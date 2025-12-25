/**
 * HMAC-SHA256 Security Utility for Edge-to-Node communication.
 */

const SHARED_SECRET = process.env.INTERNAL_API_SECRET || "development-secret-do-not-use-in-production";

/**
 * Signs a message with the shared secret using HMAC-SHA256.
 * @param message The message string to sign (e.g. "path:timestamp").
 * @returns The hex-encoded signature.
 */
export async function signMessage(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SHARED_SECRET);
    const msgData = encoder.encode(message);

    const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, msgData);
    return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * Verifies if a signature is valid for a given message and shared secret.
 * @param message The message string that was signed.
 * @param signature The signature provided in the headers.
 * @returns True if valid, false otherwise.
 */
export async function verifySignature(message: string, signature: string): Promise<boolean> {
    const expectedSignature = await signMessage(message);
    return expectedSignature === signature;
}

/**
 * Helper to generate a standardized message to sign.
 * @param path The API path called.
 * @param timestamp The timestamp in ISO or numeric format.
 */
export function createMsgToSign(path: string, timestamp: string): string {
    return `${path}:${timestamp}`;
}
