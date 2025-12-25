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
- [ ] **Write Test:** User login and session. `[ ]`
- [ ] Implement Session-based Auth (Login/Logout). `[ ]`
- [ ] Implement `POST /api/assets/claim` logic. `[ ]`
- [ ] Build Dashboard UI (Asset list and edit) using shadcn/ui. `[ ]`

## Phase 4: Analytics & Logging
- [ ] Implement async analytics capture in Postgres. `[ ]`
- [ ] Basic stats view in Dashboard. `[ ]`
