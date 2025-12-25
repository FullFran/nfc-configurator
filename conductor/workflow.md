# Project Workflow & Rules

> **SYSTEM DIRECTIVE:** This document is the SINGLE SOURCE OF TRUTH.

## 1. Guiding Principles
1.  **The Plan is Law:** Never implement features not listed in `plan.md`.
2.  **TDD is Mandatory:** Write a failing test *before* writing implementation code.
3.  **Internal Resolver Pattern:** Edge **NEVER** connects to Postgres. Edge -> Redis. Cache Miss -> Call Internal Node API -> Node reads Postgres & populates Redis.
4.  **Naming Convention:** Always use `public_id`.
5.  **shadcn/ui First:** Use `npx shadcn@latest add` for UI components.
6.  **Docs First:** Update `tech-stack.md` or `product-guidelines.md` before architecture changes.
7.  **Atomic Commits:** Commit often.

## 2. Environment Commands
| Action | Command |
| :--- | :--- |
| **Install Dependencies** | `npm install` |
| **Run All Tests** | `npm test` |
| **Run Single Test** | `npm test <path>` |
| **Lint/Format** | `npm run lint && npm run format` |
| **Start Dev Server** | `npm run dev` |
| **Database Sync** | `npx prisma db push` (or similar ORM cmd) |

## 3. The Implementation Loop (TDD)
For every task marked `[ ]` in `plan.md`:

### Phase 1: RED (Failing Test)
1.  **Mark In Progress:** Update `plan.md`: change `[ ]` to `[~]`.
2.  **Create Test:** Create/Update a test file.
3.  **Verify Failure:** Run the test command. **It MUST fail.**

### Phase 2: GREEN (Pass the Test)
1.  **Implement:** Write minimum code to pass.
2.  **Verify:** Run test again. It must pass.

### Phase 3: REFACTOR & COMMIT
1.  **Refactor:** Clean code without breaking tests.
2.  **Commit:** `<type>(<scope>): <description>`
3.  **Git Notes:** Attach a summary to the commit hash: `git notes add -m "<summary>" <hash>`
4.  **Complete Task:** Update `plan.md`: change `[~]` to `[x]`.

## 4. Definition of Done
A task is ONLY complete when:
- [ ] Unit tests are passing.
- [ ] Code follows style guides.
- [ ] `plan.md` is updated.
