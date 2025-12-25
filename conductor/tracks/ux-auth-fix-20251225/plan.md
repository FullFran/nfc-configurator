# Implementation Plan: UX Improvements & Auth Persistence

## Phase 1: Authentication Persistence Fix
- [x] **Step 1.1**: Update `web/lib/session.ts` cookie options.
    - Add `maxAge: 60 * 60 * 24 * 7` (1 week) to `cookieOptions`.
- [ ] **Step 1.2**: Verify session persists after browser restart (manual instructions).

## Phase 2: Navigation & Layout Refactoring
- [x] **Step 2.1**: Install necessary shadcn/ui components for Sidebar.
    - Run `npx shadcn@latest add sidebar sheet separator` (Check if already present).
- [x] **Step 2.2**: Create Sidebar Component.
    - Create `web/components/app-sidebar.tsx`.
    - Define main navigation links: Dashboard, Activar, Docs.
- [x] **Step 2.3**: Implement Dashboard Layout.
    - Create `web/app/dashboard/layout.tsx`.
    - Wrap children with `<SidebarProvider>` and `<AppSidebar>`.
- [x] **Step 2.4**: Refactor `web/app/dashboard/page.tsx`.
    - Remove logout button and container padding (now handled by layout).
- [x] **Step 2.5**: Update Root Layout if necessary. (No changes needed).
    - Ensure fonts and globals are properly inherited.
- [x] **Step 2.6**: Move Activar Page under Dashboard.
    - Create `web/app/dashboard/activar/page.tsx`.
    - Redirect `/activar` to `/dashboard/activar`.

## Phase 3: Documentation & Guides
- [x] **Step 3.1**: Create Documentation Page.
    - Create `web/app/dashboard/docs/page.tsx`.
    - Write "Getting Started" guide: Claiming, Configuring, and Analytics.

## Phase 4: Final Polish
- [x] **Step 4.1**: Check Mobile Responsiveness.
    - Verify the Sidebar converts to a Sheet/Hamburger on mobile. (Shadcn default used).
- [x] **Step 4.2**: Consistent Styling.
    - Ensure all links in the sidebar indicate an active state.

## Verification Plan
### Automated Tests
- N/A for CSS/UI layout changes (visual verification).
- Check session endpoint returns correct cookie headers (Max-Age).

### Manual Verification
1. Login -> Restart Browser -> Stay Logged In.
2. Navigate between "Mis Assets", "Activar" and "Guía" via Sidebar.
3. Verify mobile view (Hamburger menu).
