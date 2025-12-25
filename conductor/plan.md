# Implementation Plan: NFC Configurator MVP (Edge-First)

## Phase 1: Foundation & The "Hot Path" (Critical)
- [~] **Infrastructure Setup** `[~]`
  - [~] Initialize Next.js project with TypeScript. `[ ]`
  - [ ] Setup **Vercel Postgres** and Drizzle schema (Users, Assets, Events). `[ ]`
  - [ ] Create `scripts/seed-assets.ts` to generate secure, non-colliding Claim Codes. `[ ]`
- [ ] **Module C: The Edge Resolver (Internal Resolver Pattern)** `[ ]`
  - [ ] Implement Edge Route `GET /t/{public_id}`. `[ ]`
  - [ ] Implement Redis Lookup. `[ ]`
  - [ ] Implement Internal API Call on Cache Miss. `[ ]`
  - [ ] Implement Node logic: Read Postgres -> Update Redis -> Return. `[ ]`
  - [ ] Implement Analytics ingestion via **Redis Streams**. `[ ]`
- [ ] **Public Landing Pages (The "404" Strategy)** `[ ]`
  - [ ] Create generic `/claim-landing` page (Destination for unclaimed tags). `[ ]`
  - [ ] Create `/disabled` and `/not-found` system pages. `[ ]`

## Phase 2: The Growth Loop (Management App)
- [ ] **Module A: Authentication** `[ ]`
  - [ ] Implement Session-based Auth (Login/Register/Logout). `[ ]`
  - [ ] Protect `/dashboard` routes. `[ ]`
- [ ] **Module B: Asset Management (CRUD)** `[ ]`
  - [ ] Implement `POST /api/assets/claim` (Verify `claim_code` -> Link to User). `[ ]`
  - [ ] Implement Asset Editing (Update Destination URL). `[ ]`
  - [ ] **Crucial:** Implement Cache Invalidation (On Update -> Del/Update Redis Key). `[ ]`
- [ ] **Design System Implementation** `[ ]`
  - [ ] Configure Tailwind CSS theme and custom tokens in `tailwind.config.ts`. `[ ]`
  - [ ] Create base reusable components using Tailwind utility classes. `[ ]`

## Phase 3: Analytics & Hardening
- [ ] **Module D: Analytics Aggregation** `[ ]`
  - [ ] Create Cron Job / Worker to process Redis Queue -> Postgres `daily_metrics`. `[ ]`
  - [ ] Build Analytics Dashboard UI (Charts using Recharts or simple SVG). `[ ]`
- [ ] **Security & Admin** `[ ]`
  - [ ] Implement URL Validation Policy (Block `javascript:`, malware domains). `[ ]`
  - [ ] Create "Shadow Admin" API to ban/disable abusive assets. `[ ]`
- [ ] **Final Polish** `[ ]`
  - [ ] Comprehensive End-to-End testing of the Claim Loop. `[ ]`
  - [ ] Production Deployment & Latency Verification. `[ ]`
