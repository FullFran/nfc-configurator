# Implementation Plan: QR, Virtual Assets & Admin Panel

## Phase 1: QR & Virtual Assets (User Side)
- [x] **Step 1.1**: Install `qrcode.react`.
- [x] **Step 1.2**: Update Dashboard to include "Crear Nuevo QR" (Virtual Asset).
    - Create `api/assets/create` endpoint: Generates unique `public_id`, skips `claim_code`, assigns to `userId`.
- [x] **Step 1.3**: Add "Descargar QR" to Asset cards.
    - Implement modal with `QRCodeCanvas` and download logic.

## Phase 2: Admin Security & Layout
- [x] **Step 2.1**: Update `AppSidebar` to detect `role`.
    - Show "Admin Panel" link only to admins.
- [x] **Step 2.2**: Create `app/admin/layout.tsx`.
    - Reuse `SidebarProvider` and create a variation of `AppSidebar` or adjust existing one for Admin routes.
- [x] **Step 2.3**: Implement route-level guard in `app/admin/page.tsx` or middleware.

## Phase 3: Admin Features
- [x] **Step 3.1**: Asset List View.
    - Table with all assets, status, and owner.
- [x] **Step 3.2**: Factory Tool.
    - simple form to generate `N` unique IDs and claim codes.
    - Display result for copying/CSV export.
- [x] **Step 3.3**: Metrics Cards implementation.

## Verification Plan
- [ ] Create a virtual QR, download it, and scan it.
- [ ] Login as non-admin and try to reach `/admin`.
- [ ] Generate 100 random IDs and verify no collisions in DB.
