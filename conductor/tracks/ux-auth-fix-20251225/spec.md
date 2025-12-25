# Specification: UX Improvements & Auth Persistence

## Overview
The goal is to improve the user experience by implementing a modern sidebar navigation for the dashboard and fixing the authentication persistence issue.

## Proposed Changes

### Navigation (Sidebar)
- **Component**: Create a `Sidebar` component using `shadcn/ui` patterns.
- **Layout**: Introduce a dashboard-specific layout (`app/dashboard/layout.tsx`) that embeds the sidebar.
- **Routes**:
    - **Dashboard**: `app/dashboard/page.tsx` (renamed to "Mis Assets" in navigation).
    - **Activar NFC**: `app/activar/page.tsx` (link to the existing activation flow).
    - **Docs/Guía**: `app/dashboard/docs/page.tsx` (new page with a "How to Start" guide).
    - **Settings/Profile**: Placeholder for future user settings.
    - **Logout**: Integration with `/logout`.

### Auth Persistence
- **Fix**: Update `web/lib/session.ts` to include `maxAge` in `cookieOptions`. This will ensure the session persists across browser restarts.
- **Security**: Maintain `httpOnly`, `secure`, and `sameSite` defaults.

### Documentation Section
- **Content**: A simple "Getting Started" guide explaining:
    1. How to claim an NFC tag.
    2. How to configure the redirection URL.
    3. How to check metrics.

## Acceptance Criteria
- [ ] Users can navigate between assets, activation, and documentation via the sidebar.
- [ ] The sidebar is responsive (visible on desktop, collapsible or mobile-friendly).
- [ ] Sessions persist after closing and reopening the browser.
- [ ] The "Mis Assets" view feels organized and professional.

## User Review Required
> [!IMPORTANT]
> **Clarifying Questions:**
> 1. **Sidebar Design**: Do you prefer a fixed sidebar on the left or a collapsible one?
> 2. **Guide Content**: Should I draft a basic guide now, or just create the structure for it?
> 3. **Navigation Items**: Besides "Mis Assets" and "Guía", would you like to include "Activar NFC" or "Perfil" in the sidebar?
