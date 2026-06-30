---
name: onboard-project
description: Onboard Claude to the Bearcat Subleasing project — reads all project docs, explores key code areas, fetches live Linear/GitHub/Vercel state, and outputs a synthesized brief. Run at the start of any new session.
---

# Bearcat Subleasing — Project Onboarding

You are onboarding to the Bearcat Subleasing project. Work through the four phases below in order. Each phase feeds into the next. At the end, output a concise brief in the format specified in Phase 4.

---

## Phase 1 — Local Docs

Read all of these in parallel (no MCP cost, always do this first):

1. `/Users/devanparekh/Desktop/Projects/bearcat-subleases/CLAUDE.md` — repo structure, git root, env vars, MCP tools
2. `/Users/devanparekh/Desktop/Projects/bearcat-subleases/bearcat-subleasing/CLAUDE.md` — tech stack, coding conventions, auth guidance, workflow commands
3. `/Users/devanparekh/.claude/projects/-Users-devanparekh-Desktop-Projects-bearcat-subleases/memory/MEMORY.md` — memory index; then read each linked memory file (e.g. `project_state.md`) from the same directory
4. `/Users/devanparekh/Desktop/Projects/bearcat-subleases/bearcat-subleasing/docs/mvp-plan.md` — product goals, architecture decisions, feature backlog, implementation order
5. `/Users/devanparekh/Desktop/Projects/bearcat-subleases/bearcat-subleasing/docs/visual-identity.md` — color tokens, typography, design system (skim unless doing UI work)

---

## Phase 2 — Key Code Areas

Read these targeted files to internalize the data model and code structure:

1. `bearcat-subleasing/db/schema.ts` — full data model: tables, enums (`status`, `room_type`, `distance_from_campus`), relations
2. `bearcat-subleasing/lib/auth-guards.ts` — auth boundary: `requireUser()`, `getCurrentUser()`, `CurrentUser` type
3. `bearcat-subleasing/queries/get.ts` and `queries/insert.ts` — the data layer
4. Run `ls bearcat-subleasing/app/` — confirm current route structure (auth, listings, profile, api, actions)

---

## Phase 3 — Live Project State

Run these in parallel to get the current state of the project:

**Linear (team BEA):**
- Fetch all issues with status Todo, In Progress, and Done (limit Done to last 10) for team BEA
- Note assignees and priorities

**GitHub:**
- Run `gh pr list --state open` from the repo root (`/Users/devanparekh/Desktop/Projects/bearcat-subleases/`) to see open PRs
- Run `git log --oneline -10` from the repo root to see recent commits

**Vercel:**
- Use `list_deployments` to get the latest deployment and its status
- Use `get_runtime_errors` on the latest production deployment to surface any current errors

---

## Phase 4 — Output Brief

After completing all three phases, output a brief in this format. Be concise — one or two sentences per section, bullet lists where appropriate:

---

### Bearcat Subleasing — Session Brief

**What's Built**
[Shipped features drawn from memory + Linear Done issues]

**Active Work**
[In Progress Linear issues + open PRs with authors]

**Critical Path (Engineering)**
[The blocking items between now and launch — BEA-3, BEA-2, BEA-8, BEA-10 or whatever Linear shows]

**Production Health**
[Latest Vercel deploy: branch, status, any runtime errors]

**Design Context**
[Color system, typography pair, dark/light mode status — one line]

**Ready for:** [What kind of work can be picked up immediately — e.g., "auth implementation", "image ordering (BEA-5)", "schema changes"]

---

Once the brief is output, you are fully onboarded. Ask the user what they'd like to work on, or if they've already stated a task, begin immediately.
