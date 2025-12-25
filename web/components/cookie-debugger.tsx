"use client";

import { useEffect, useState } from "react";

export function CookieDebugger() {
    const [cookies, setCookies] = useState<string>("");

    useEffect(() => {
        // Update cookies immediately and on interval
        const updateCookies = () => {
            setCookies(document.cookie);
        };
        updateCookies();
        const interval = setInterval(updateCookies, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-green-400 text-xs font-mono rounded max-w-sm z-50 pointer-events-none">
            <h3 className="font-bold border-b border-green-400 mb-2">Cookie Debugger</h3>
            <div className="break-all">
                {cookies ? cookies : "NO COOKIES FOUND"}
            </div>
            <div className="mt-2 text-white">
                Looking for: nfc_session_debug
            </div>
        </div>
    );
}
