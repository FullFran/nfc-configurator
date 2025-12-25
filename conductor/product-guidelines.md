# Product & Engineering Guidelines

## Design System (Tailwind + shadcn/ui Strategy)
- **Framework:** Tailwind CSS for styling.
- **Components:** **shadcn/ui**. Use `npx shadcn@latest add ...`.
- **Strict Configuration:** Custom tokens (Indigo) in `tailwind.config.ts`. No "magic numbers".

## Coding Standards
- **Naming:** Always use `public_id`. **NEVER** use `short_code` or `slug`.
- **Validation:** Only allow `https://` URLs. Block `javascript:`, `data:`, `file:`.

## Security Policy
- **Resolver Safety:** The resolver must never execute JS from a user input.
- **Validation:** All user URLs must be validated against a strict allowlist protocols (`http`/`https` only).

## Performance Budget
- **Resolver:** < 100ms Time-to-First-Byte (TTFB).
- **Dashboard:** < 1.5s Largest Contentful Paint (LCP).
