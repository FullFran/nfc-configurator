# Track Plan: MVP Implementation (Simplified Hybrid)

## Phase 1: Infrastructure & Authentication Scaffolding
- [ ] Initialize Next.js with Tailwind and shadcn/ui. `[ ]`
- [ ] Setup Prisma/Drizzle with PostgreSQL. `[ ]`
- [ ] Implement HMAC Authentication utility for Edge-to-Node calls. `[ ]`
- [ ] Mark Task Complete: Infrastructure `[ ]`

## Phase 2: Core Resolver (Edge + Node)
- [ ] **Write Test:** Resolver success and failure cases. `[ ]`
- [ ] Implement Internal API `GET /api/internal/resolve/[public_id]`. `[ ]`
- [ ] Implement Edge Resolver `GET /t/[public_id]`. `[ ]`
- [ ] Verify Redirect flow (Status handling). `[ ]`

## Phase 3: Dashboard & Growth Loop
- [ ] **Write Test:** User login and session. `[ ]`
- [ ] Implement Session-based Auth (Login/Logout). `[ ]`
- [ ] Implement `POST /api/assets/claim` logic. `[ ]`
- [ ] Build Dashboard UI (Asset list and edit) using shadcn/ui. `[ ]`

## Phase 4: Analytics & Logging
- [ ] Implement async analytics capture in Postgres. `[ ]`
- [ ] Basic stats view in Dashboard. `[ ]`
