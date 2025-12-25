"use client";

import { useState } from "react";

export default function CookieTestPage() {
    const [status, setStatus] = useState("Waiting...");

    const setCookie = async () => {
        await fetch("/api/test-cookie-raw");
        setStatus("Cookie Set. Please Refresh.");
    };

    const checkCookie = () => {
        if (document.cookie.includes("raw_test_cookie")) {
            setStatus("SUCCESS: Raw cookie found! " + document.cookie);
        } else {
            setStatus("FAILURE: Raw cookie NOT found.");
        }
    };

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Raw Cookie Test</h1>
            <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
                Status: {status}
            </div>
            <div className="flex gap-4">
                <button onClick={setCookie} className="px-4 py-2 bg-blue-500 text-white rounded">
                    1. Set Raw Cookie
                </button>
                <button onClick={checkCookie} className="px-4 py-2 bg-green-500 text-white rounded">
                    2. Check Raw Cookie (Client)
                </button>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gray-500 text-white rounded">
                    3. Refresh Page
                </button>
            </div>
        </div>
    );
}
