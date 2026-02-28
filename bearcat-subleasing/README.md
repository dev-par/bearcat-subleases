# Bearcat Subleasing

A verified student marketplace designed specifically for University of Cincinnati students to post and find short-term subleases.

## About

Bearcat Subleasing provides a simple, secure, and university-focused alternative to Facebook groups and Craigslist by restricting posting and contact access to verified UC students. Users can freely browse available listings, filter by key housing attributes, and connect directly with listing owners after authenticating with a UC email address.

**Key Features:**

- Public listing browsing (no account required)
- UC-only account creation and verification
- Structured listing fields (rent, dates, room type, amenities, etc.)
- User profiles with optional academic details
- Photo uploads via AWS S3

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Better Auth
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Storage:** AWS S3 (listing and profile photos)
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- pnpm package manager
- A Neon PostgreSQL database

### 1. Set up environment variables

Create a `.env.local` file in the root directory with your database credentials:

```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Generate and apply database migrations

```bash
pnpm drizzle-kit generate  # Generate migration files from schema
pnpm drizzle-kit migrate   # Apply migrations to database
```

### 5. Run the development server

```bash
pnpm dev          # Start development server with Turbopack
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production build

```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

## Database Schema

The platform uses two main tables:

**Users:**

- Email (UC domain required)
- Name, graduation year, major, bio
- Email verification status
- Profile photo (S3 key)

**Listings:**

- Title, description, address
- Rent (stored in cents), lease dates
- Room type (private/shared)
- Bedrooms, bathrooms (supports half baths)
- Amenities (furnished, utilities, private bathroom)
- Photo keys (S3), status (active/expired/removed)

## Development Tools

- **Drizzle Studio:** Browse database with GUI

  ```bash
  pnpm drizzle-kit studio
  ```

- **Linting:**
  ```bash
  pnpm lint
  ```

## Project Structure

```
bearcat-subleasing/
├── app/              # Next.js app router pages and layouts
├── db/               # Database configuration and schema
│   ├── db.ts         # Drizzle database instance
│   └── schema.ts     # Database schema definitions
├── migrations/       # Drizzle migration files
├── public/           # Static assets
└── .env.local        # Environment variables (not committed)
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon PostgreSQL](https://neon.tech/docs/introduction)
- [Better Auth](https://www.better-auth.com/docs/introduction)
