# Product Definition: NFC Configurator

## Vision
A SaaS platform for managing dynamic NFC tags and QR codes via stable URLs. Users can change redirection targets in real-time and access usage metrics without modifying the physical assets.

## Core Features (MVP)
1. **Dynamic Redirection (The Resolver):** Sub-100ms URL resolution based on asset status (`ACTIVE`, `NO_CLAIMED`, `DISABLED`).
2. **Growth Loop (Claiming System):** Physical NFCs can be claimed by users using a secret `claim_code`.
3. **Analytics Dashboard:** Real-time tracking of clicks, device types, and geographic distribution (anonymized).
4. **Asset Management:** Centralized control for multiple NFC/QR assets.

## Target Users
- Businesses using physical marketing assets (stickers, menu tags, business cards).
- Individuals wanting to manage dynamic personal NFC/QR assets.
- Administrators monitoring for platform abuse (phishing).

## Key Metrics
- Resolution latency (p95 < 100ms).
- Conversion rate from "Scanned" to "Claimed".
- Daily Active Users (DAU) managing assets.
