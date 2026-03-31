# Bearcat Subleasing

Bearcat Subleasing is a University of Cincinnati housing marketplace for short-term student subleases. The app is currently focused on local development and MVP iteration.

## Current State

- Public listing browsing is implemented.
- Listing creation and deletion flows exist.
- Image uploads use AWS S3.
- Auth is still a development stub backed by seeded user IDs rather than a production auth provider.

## Tech Stack

- Framework: Next.js 16 App Router
- UI: React 19, Tailwind CSS 4
- Database: PostgreSQL on Neon
- ORM: Drizzle ORM
- Storage: AWS S3
- Tooling: TypeScript, ESLint, pnpm

## Project Layout

This repository has a repo-level [`AGENTS.md`](../AGENTS.md) and the application lives in:

```text
bearcat-subleasing/
```

Main directories:

```text
bearcat-subleasing/
├── app/            # App Router pages, route handlers, and server actions
├── db/             # Drizzle database client and schema
├── docs/           # Product and MVP planning notes
├── lib/            # Env, auth helpers, validation, S3 helpers
├── migrations/     # Drizzle SQL migrations
├── public/         # Static assets
└── queries/        # Shared data access helpers
```

## Prerequisites

- Node.js 20.9 or later
- pnpm
- A PostgreSQL database
- An S3 bucket and AWS credentials for uploads

## Environment Setup

The current code loads environment variables from `.env`, not `.env.local`.

Create `bearcat-subleasing/.env` with values matching [`bearcat-subleasing/.env.example`](./.env.example):

```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_S3_BUCKET="your-bucket-name"
DEV_SEEDED_USER_ID="9ecb2d33-5a85-40dd-8791-073afdc87154"
DEV_ADMIN_USER_IDS=""
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Generate and apply migrations:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Start the app:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Verification Commands

Lint the project:

```bash
pnpm lint
```

Create a production build:

```bash
pnpm build
```

Open Drizzle Studio:

```bash
pnpm drizzle-kit studio
```

## Notes

- Vercel is part of the intended workflow for preview and deploy debugging.
- Linear team `BEA` is the default planning context for this repo.
- Product and MVP direction live in [`docs/mvp-plan.md`](./docs/mvp-plan.md).
