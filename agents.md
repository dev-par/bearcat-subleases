# Bearcat Subleases Agent Guide

## Scope

- The main application lives in `bearcat-subleasing/`.
- Prefer working from `bearcat-subleasing/` unless the task is explicitly about repo-level files.
- Treat this repo as local-development-first today, but keep workflows compatible with future GitHub PR and CI usage.

## Docs First

- Use Context7 MCP whenever the task involves a library, framework, SDK, API, CLI, or cloud service.
- Start with `resolve-library-id`, then `query-docs`, and answer from the fetched docs.
- Prefer Context7 over web search for technical documentation.

## Next.js Rule

- Before any Next.js work, read the relevant local doc in `node_modules/next/dist/docs/` when it exists.
- If local Next.js docs are unavailable or insufficient, use Context7 for current Next.js documentation.

## Auth Guidance

- For Better Auth or auth-related work, consult the local Better Auth skills before changing code.
- Start with `.agents/skills/better-auth-best-practices/SKILL.md` for general Better Auth setup, server/client config, sessions, adapters, plugins, and environment variables.
- Use `.agents/skills/create-auth-skill/SKILL.md` when implementing or scaffolding authentication flows in the app.
- Use `.agents/skills/email-and-password-best-practices/SKILL.md` for email/password sign-up, sign-in, verification, password reset, and password policy work.
- Use `.agents/skills/two-factor-authentication-best-practices/SKILL.md` for MFA, TOTP, OTP, backup codes, and trusted-device flows.
- Use `.agents/skills/organization-best-practices/SKILL.md` for organizations, teams, invitations, roles, permissions, and RBAC.
- Use `.agents/skills/better-auth-security-best-practices/SKILL.MD` for security hardening, including secrets, CSRF, trusted origins, rate limiting, cookies, sessions, OAuth token encryption, IP tracking, and audit logging.
- Still use Context7 for current Better Auth documentation and API details; the local skills are project workflow guidance, not a replacement for up-to-date docs.

## Repo Workflow

- Package manager: `pnpm`
- Key commands:
  - `pnpm dev`
  - `pnpm lint`
  - `pnpm build`
  - `pnpm drizzle-kit generate`
  - `pnpm drizzle-kit migrate`
  - `pnpm drizzle-kit studio`
- After meaningful changes, prefer verifying with `pnpm lint` and `pnpm build` unless the task is narrowly scoped or blocked by missing env/config.

## Environment

- Required envs are defined by code and `.env.example`.
- Current expected variables:
  - `DATABASE_URL`
  - `AWS_REGION`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_S3_BUCKET`
  - `DEV_SEEDED_USER_ID`
  - `DEV_ADMIN_USER_IDS`
- Do not invent secrets or silently change env variable names.

## Vercel

- Assume this repo is linked to a Vercel project even if `.vercel/project.json` is not checked in.
- When a local dev server is running, verify the UI in the browser instead of relying only on static code inspection.
- Use Vercel tools for preview/deploy debugging, deployment inspection, and runtime/build log investigation.

## Linear

- Assume Linear is the planning system for this repo.
- Default team context: `BEA`.
- Use team-wide Linear context only when the user is asking about planning, prioritization, backlog, roadmap, or general team status and no narrower issue or project is provided.
- If the user provides a specific Linear issue, project, or initiative, treat that as the primary context instead of searching the whole team.
- Fetch current issue or project details from Linear tools when needed.
- Prefer reading existing Linear context before creating or updating issues unless the user explicitly asks for a write action.


## UI Guidance

- Include design judgment in frontend work; do not ship bare framework defaults.
- Aim for a polished, trustworthy, student-facing product rather than a generic dashboard look.
- Keep layouts clean and mobile-friendly.
- Avoid stock styling when making visible UI changes; define or extend a clear visual direction instead.
- The BEA-11 visual identity source of truth lives at `bearcat-subleasing/docs/visual-identity.md`.
- Use `bearcat-subleasing/docs/mvp-plan.md` for broader product and architecture planning, and `bearcat-subleasing/docs/visual-identity.md` for brand, theme, and visual-system decisions.
- If the user later provides a stronger visual direction, follow that over these defaults.

## Useful Session Capabilities

- Context7 MCP: current technical docs
- Vercel MCP: deployments, logs, preview debugging, browser verification
- Linear MCP: team and issue workflow
- GitHub tools: available for future PR, CI, and review workflows when the repo starts using them more actively

## Doc Maintenance

When you finish a task that modified code, scan this table and update any affected docs before marking the task done. Not every change requires a doc update — use judgment.

| If you changed... | Update... |
|---|---|
| New feature, route, page, server action, or query | `bearcat-subleasing/docs/mvp-plan.md` — mark completed backlog items, note architecture decisions |
| Environment variable (added, renamed, removed) | `agents.md` environment section |
| Coding convention, new utility, or tech stack change | `agents.md` relevant sections |
| Color token, typography, spacing, or theme variable | `bearcat-subleasing/docs/visual-identity.md` |
| UI pattern, layout decision, or component design choice | `bearcat-subleasing/docs/design-methodology.md` |
| Better Auth config or auth flow | The relevant `.agents/skills/` SKILL.md (only if the existing guidance is wrong or missing) |

Keep `agents.md` and `bearcat-subleasing/CLAUDE.md` in sync — if you update guidance in one, apply the same change to the other.

Changes that typically do **not** need doc updates: bug fixes, refactors that don't change behavior, style tweaks within existing design tokens.
