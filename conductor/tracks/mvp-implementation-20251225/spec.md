# Track Specification: MVP Implementation (Simplified Hybrid)

## Overview
Implement the core features of the NFC Configurator platform using a simplified "Internal Resolver" pattern without Redis for the MVP.

## Functional Requirements
1.  **Public Resolver (`/t/{public_id}`):**
    - Runs on Edge Runtime (Next.js Middleware or Edge Route).
    - Calls Private Node.js API to fetch destination.
    - Validates HMAC signature for secure internal communication.
    - Performs `302 Redirect` to `https://` destinations.
2.  **Internal API (Node.js):**
    - Secured via `SHARED_SECRET` HMAC validation.
    - Fetches Asset from Postgres using `public_id`.
    - Handles status logic (`ACTIVE`, `NO_CLAIMED`, `DISABLED`).
3.  **Management Dashboard:**
    - Next.js Node.js pages.
    - **shadcn/ui** + Tailwind CSS.
    - Asset CRUD and Claiming logic.
4.  **Analytics:**
    - Asynchronous event capturing (Postgres directly for MVP, as we removed Redis).

## Acceptance Criteria
- [ ] Resolver responds in < 150ms (higher than 100ms due to lack of Redis, but acceptable for MVP).
- [ ] Only `https://` URLs are allowed.
- [ ] `public_id` is the unique identifier in all logic.
- [ ] Internal API rejects requests without valid HMAC signature.
- [ ] shadcn/ui components are used for the dashboard.
