## Architecture Overview (Internal Resolver Pattern)
- **Resolver (Public Edge):** Vercel Edge Runtime. Strictly reads from Redis.
- **Cache Miss Flow:** Edge -> Calls **Internal Private API (Node.js)** -> Node reads Postgres -> Node populates Redis -> Node returns to Edge -> Edge redirects.
- **Analytics Ingestion:** Use **Redis Streams** for robust asynchrounous ingestion.

## Core Framework
- **Framework:** Next.js 14/15 (App Router).
- **Resolver Logic:** Next.js Middleware or Edge API Routes.
- **Language:** TypeScript (Strict mode).

## Data Layer
- **Primary DB:** **Vercel Postgres (Hobby Tier)**.
- **ORM:** Drizzle ORM (optimized for Vercel/Edge).
- **Hot Layer (Optional for later):** Vercel KV (Redis - Hobby Tier) if needed.

## Infrastructure & DevOps
- **Hosting:** **Vercel (Hobby Tier)**.
- **Analytics Ingestion:**
  - **Edge:** `context.waitUntil()` sends event to Internal Node API.
  - **Node API:** Writes directly to Vercel Postgres asynchronously.
