# Track Plan: MVP Implementation (Simplified Hybrid)

## Phase 1: Infrastructure & Authentication Scaffolding
- [x] Initialize Next.js with Tailwind and shadcn/ui in `web/`. `[x]`
- [x] Setup Prisma/Drizzle with PostgreSQL. `[x]`
- [x] Implement HMAC Authentication utility for Edge-to-Node calls. `[x]`
- [x] Mark Task Complete: Infrastructure `[x]`

## Phase 2: Core Resolver (Edge + Node)
- [x] **Write Test:** Resolver success and failure cases. `[x]`
- [x] Implement Internal API `GET /api/internal/resolve/[publicId]`. `[x]`
- [x] Implement Edge Resolver `GET /t/[publicId]`. `[x]`
- [x] Verify Redirect flow (Status handling). `[x]`

## Phase 3: Dashboard & Growth Loop
- [x] **Write Test:** User login and session. `[x]`
- [x] Implement Session-based Auth (Login/Logout). `[x]`
- [x] Implement `POST /api/assets/claim` logic. `[x]`
- [x] Build Dashboard UI (Asset list and edit) using shadcn/ui. `[x]`

## Phase 4: Analytics & Logging
- [x] Implement async analytics capture in Postgres. `[x]`
- [ ] Basic stats view in Dashboard. `[ ]`
