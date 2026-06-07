# Bearcat Subleasing App

## Scope

Work from this directory. Treat the repo as local-development-first today, but keep workflows compatible with future GitHub PR and CI usage.

## Docs First

Use Context7 MCP whenever the task involves a library, framework, SDK, API, CLI, or cloud service. Workflow: `resolve-library-id` → `query-docs` → answer from fetched docs. Prefer Context7 over web search for technical documentation.

## Next.js Rule

Before any Next.js work, check `node_modules/next/dist/docs/` for local docs. If unavailable or insufficient, use Context7 for current Next.js documentation.

## Tech Stack

- **Next.js 16**, React 19, TypeScript 5 (strict mode)
- **Drizzle ORM** — schema at `db/schema.ts`, client at `db/db.ts`, config at `drizzle.config.ts`
- **Neon PostgreSQL** via `@neondatabase/serverless`
- **Better Auth 1.6.9** — server: `lib/auth.ts`, client: `lib/auth-client.ts`, guards: `lib/auth-guards.ts`, route handler: `app/api/auth/[...all]/route.ts`
- **Tailwind CSS v4**, Shadcn UI primitives in `components/ui/`, Radix UI
- **AWS S3** for file uploads — client: `lib/s3.ts`, upload handlers: `app/api/upload/`
- **pnpm** workspace

## Repo Workflow

```
pnpm dev                    # start development server
pnpm lint                   # ESLint 9 check
pnpm build                  # Next.js production build
pnpm drizzle-kit generate   # generate migration from schema changes
pnpm drizzle-kit migrate    # apply pending migrations
pnpm drizzle-kit studio     # open Drizzle Studio
```

After meaningful changes, verify with `pnpm lint` and `pnpm build` unless the task is narrowly scoped or blocked by missing env/config.

## Auth Guidance

For Better Auth or auth-related work, read the relevant skill file before changing code. Skills live in `../.agents/skills/` (relative to this directory).

| Skill file | Use when |
|---|---|
| `../.agents/skills/better-auth-best-practices/SKILL.md` | General Better Auth setup, sessions, adapters, plugins, env vars |
| `../.agents/skills/create-auth-skill/SKILL.md` | Implementing or scaffolding new auth flows |
| `../.agents/skills/email-and-password-best-practices/SKILL.md` | Email/password sign-up, sign-in, verification, password reset |
| `../.agents/skills/two-factor-authentication-best-practices/SKILL.md` | MFA, TOTP, OTP, backup codes, trusted devices |
| `../.agents/skills/organization-best-practices/SKILL.md` | Organizations, teams, invitations, roles, RBAC |
| `../.agents/skills/better-auth-security-best-practices/SKILL.MD` | Security hardening — secrets, CSRF, trusted origins, rate limiting, cookies, OAuth token encryption, audit logging (**note uppercase `.MD` extension**) |

Still use Context7 for current Better Auth API docs; the local skills are project workflow guidance, not a replacement for up-to-date docs.

**Project-specific auth facts:**
- `requireUser()` and `getCurrentUser()` in `lib/auth-guards.ts` — use for all server-side authorization checks
- `CurrentUser` type adds `isAdmin: boolean` derived from `DEV_ADMIN_USER_IDS` env var (dev-only; must be replaced with real RBAC before production)
- Client exports `{ signIn, signUp, signOut, useSession }` from `lib/auth-client.ts`

## Coding Conventions

**Imports:** Use the `@/*` path alias for all imports. No relative imports across directory boundaries. The alias maps to the repo root (`bearcat-subleasing/`) as configured in `tsconfig.json`.

**Naming:**
- PascalCase — React components, type/interface names, Drizzle table exports (`Listing`, `ListingImage`)
- camelCase — functions (`getListings`, `requireUser`), variables
- kebab-case — file names (`auth-guards.ts`, `listing-card.tsx`), Next.js route/folder segments

**TypeScript:** Strict mode is on; no `any`. Props interfaces use a `Props` suffix and are defined in the same file as the component. Prefer explicit return types on exported functions.

**Components:** Server Components by default. Add `"use client"` only when the component needs event handlers, React hooks, or browser APIs. Server actions must have `"use server"` at the file or function level.

**Project layers:**
- Validation → `lib/validation/`; throw `InputValidationError` from `lib/errors.ts`
- Read queries → `queries/get.ts`; write queries → `queries/insert.ts`
- Authorization → always via `requireUser()` or `getCurrentUser()` from `lib/auth-guards.ts`

**Comments:** Minimal. Only explain non-obvious "why" — a hidden constraint, a subtle invariant, a workaround for a specific bug. Never restate what the code does.

## UI Guidance

Do not ship bare framework defaults. Every visible UI change needs design judgment. Aim for a polished, trustworthy, student-facing product rather than a generic dashboard look. Keep layouts clean and mobile-friendly.

- **Visual identity** (colors, typography, tokens): `docs/visual-identity.md` — UC-inspired palette, Newsreader/Geist type system
- **Product and architecture planning**: `docs/mvp-plan.md`
- **Design methodology and decision framework**: `docs/design-methodology.md`

Shadcn/ui components in `components/ui/` are source-owned — customize them immediately, do not ship stock defaults. Both light and dark mode are required; class-based dark mode, system default via `next-themes`.

## Doc Maintenance

When you finish a task that modified code, scan this table and update any affected docs before marking the task done. Not every change requires a doc update — use judgment.

| If you changed... | Update... |
|---|---|
| New feature, route, page, server action, or query | `docs/mvp-plan.md` — mark completed backlog items, note architecture decisions |
| Environment variable (added, renamed, removed) | Root `CLAUDE.md` env table |
| Coding convention, new utility, or tech stack change | `bearcat-subleasing/CLAUDE.md` conventions sections |
| Color token, typography, spacing, or theme variable | `docs/visual-identity.md` |
| UI pattern, layout decision, or component design choice | `docs/design-methodology.md` |
| Better Auth config or auth flow | The relevant `.agents/skills/` SKILL.md (only if the existing guidance is wrong or missing) |

Keep `agents.md` and `bearcat-subleasing/CLAUDE.md` in sync — if you update guidance in one, apply the same change to the other.

Changes that typically do **not** need doc updates: bug fixes, refactors that don't change behavior, style tweaks within existing design tokens.
