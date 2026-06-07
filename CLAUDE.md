# Bearcat Subleases

## Repo Layout

- The main application lives in `bearcat-subleasing/`. All code work should happen there unless the task is explicitly about repo-level files.
- `agents.md` — Codex agent guide (not used by Claude Code).
- `skills-lock.json` — Codex skills artifact (do not modify).
- `.agents/skills/` — Better Auth skill documents shared by both Codex and Claude Code. Paths are stable; do not move or rename these files.

## Environment Variables

Do not invent secrets or silently rename environment variable keys. The authoritative list is `bearcat-subleasing/lib/env.ts` and `bearcat-subleasing/.env.example`.

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AWS_REGION` | AWS region |
| `AWS_ACCESS_KEY_ID` | AWS credentials |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials |
| `AWS_S3_BUCKET` | S3 bucket name |
| `BETTER_AUTH_SECRET` | Better Auth secret (required) |
| `BETTER_AUTH_URL` | Better Auth base URL (required) |
| `DEV_SEEDED_USER_ID` | Optional — hardcoded fallback exists in `lib/env.ts` |
| `DEV_ADMIN_USER_IDS` | Optional — CSV of user IDs; dev-only, not for production RBAC |

## MCP Tools Available

- **Context7** — current technical docs for libraries, frameworks, SDKs, APIs, CLIs, and cloud services. Prefer over web search for technical documentation.
- **Vercel MCP** — deployments, build/runtime logs, preview debugging, browser verification.
- **Linear MCP** — planning and issue workflow. Default team: `BEA`.
- **GitHub tools** — available for PR, CI, and review workflows.

## Vercel

Assume this repo is linked to a Vercel project even if `.vercel/project.json` is not checked in. When a local dev server is running, verify the UI in the browser rather than relying only on static code inspection. Use Vercel tools for preview and deploy debugging, deployment inspection, and runtime/build log investigation.

## Linear

Linear is the planning system for this repo. Default team context: `BEA`. Fetch current issue or project details from Linear tools when needed. Prefer reading existing Linear context before creating or updating issues unless the user explicitly asks for a write action. Use team-wide context only when the user is asking about planning, prioritization, backlog, or roadmap and no narrower issue or project is provided.
