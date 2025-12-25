# Specification: QR Support, User Virtual Assets & Admin Panel

## Overview
Enable users to manage dynamic QR codes (both physical and virtual) and provide an administrative interface for system-wide management and asset production.

## Proposed Features

### 1. QR Code Support
- **Downloadable**: Use `qrcode.react` and a canvas-to-image conversion to allow users to download their QR codes as PNG/SVG.
- **User Virtual Assets**: Allow users to create *new* assets without a physical tag. These assets will be immediately assigned to their account and generate a QR code.

### 2. Admin Panel (`/admin`)
- **UI Consistency**: Use the same Sidebar layout as the Dashboard (`SidebarProvider`, `AppSidebar` pattern).
- **Security**: Protect routes based on `session.role === 'ADMIN'`.
- **Asset Management**:
    - List all assets (Claimed vs Unclaimed).
    - **Factory**: Generate batches of unique, random IDs (e.g., hash-based or nanoid) with claim codes for physical tags.
- **System Metrics**: Total scans, users, and asset distribution.

## User Decisions Summary
- **Downloadable QRs**: Yes.
- **ID Generation**: Random and unique for the Admin Factory.
- **Admin UI**: Similar sidebar to the dashboard.
- **User Feature**: Users can create new virtual assets directly.

## Acceptance Criteria
- [ ] Users can download a QR code for any of their assets.
- [ ] Users can "Create New QR" from the dashboard (creating a virtual asset).
- [ ] Administrators can view all global assets in a sidebar-equipped panel.
- [ ] Administrators can generate batches of unique IDs/Claim Codes.
- [ ] Non-admin users are strictly blocked from `/admin`.
