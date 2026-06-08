# Bearcat Subleases

## Repo Layout

- The main application lives in `bearcat-subleasing/`. All code work should happen there unless the task is explicitly about repo-level files.
- `agents.md` — Codex agent guide (not used by Claude Code).
- `skills-lock.json` — Codex skills artifact (do not modify).
- `.agents/skills/` — Better Auth skill documents shared by both Codex and Claude Code. Paths are stable; do not move or rename these files.

**Git root:** The `.git` directory and GitHub remote live here at the repo root (`/Users/devanparekh/Desktop/Projects/bearcat-subleases/`). Always run `git` and `gh` commands from this directory. The inner `bearcat-subleasing/` directory contains its own `.git` with no remote — do not use it for any version control operations.

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

## MCP Tools Available

- **Context7** — current technical docs for libraries, frameworks, SDKs, APIs, CLIs, and cloud services. Prefer over web search for technical documentation.
- **Vercel MCP** — deployments, build/runtime logs, preview debugging, browser verification.
- **Linear MCP** — planning and issue workflow. Default team: `BEA`.
- **GitHub tools** — available for PR, CI, and review workflows.

For Vercel and Linear guidance, see `bearcat-subleasing/CLAUDE.md`.
