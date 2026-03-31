# Bearcat Subleasing MVP Plan

This document is the working source of truth for product architecture, delivery priorities, and design decisions for the MVP. It should be updated whenever scope, technical direction, or implementation order changes.

## Product Goals

- Build a verified student marketplace for University of Cincinnati subleases.
- Keep browsing public and frictionless.
- Restrict listing management and contact access to verified UC users once auth ships.
- Treat the MVP as production-oriented software, not throwaway prototype code.

## MVP User Flows

### Public users

- Browse active listings.
- Open a listing detail page.
- See high-signal housing information and the owner contact information exposed by the product.

### Verified UC users

- Create a listing.
- Edit their own listing.
- Delete their own listing.
- Upload and manage multiple listing images.

### Admins

- Remove any listing.
- Review listings that need moderation or cleanup.

## Current State

- The app is a Next.js 16 App Router project using React 19, Drizzle ORM, Neon Postgres, and AWS S3.
- Listings, users, and listing images already exist in the schema.
- Listing create and delete flows exist, but they are not authorization-safe yet.
- Authentication is intentionally deferred until late in the MVP.
- The current create flow hardcodes a seeded user ID for local development.

## Architecture Decisions

### App structure

- Use App Router server components for read-heavy pages.
- Use server actions for app-owned listing mutations.
- Use route handlers only where an HTTP boundary is useful, especially multipart file uploads and future integrations.

### Mutations

- Create, edit, and delete listing flows should be server actions.
- Server actions should own authorization, validation, mutation, cache revalidation, and redirects.
- The client must never submit the canonical `user_id` for ownership decisions.

### Uploads

- Keep file uploads in route handlers because browser multipart uploads are a clean fit there.
- Listing mutations should receive uploaded image metadata from trusted server-side processing.

### Authorization model

- A listing belongs to exactly one user via `listing.user_id`.
- Owners can create, edit, and delete their own listings.
- Admins can delete any listing.
- Auth is not implemented yet, but all new mutation code should be written behind server-side auth utilities so the real auth provider can be integrated later without rewriting business logic.

### Listing lifecycle

- `end_date` determines expiration timing.
- `status` remains a persisted moderation and state field.
- Public listing queries must exclude expired listings even if status synchronization has not run yet.

## Data Model Direction

### User

- Keep `email` as the canonical identity field.
- Add support for admin role assignment.
- Store `@uc.edu` email for contact visibility.
- Support optional phone or text contact information.

### Listing

- Keep ownership on `user_id`.
- Evolve `status` beyond `active` and `inactive`.
- Recommended MVP statuses:
  - `active`
  - `expired`
  - `removed`

### Listing images

- Multiple images are a firm MVP requirement.
- Add image ordering so the product can control the primary image and gallery order.
- Store S3 object keys as well as public URLs to support cleanup when images are deleted or listings are removed.

## Feature Backlog

### Foundation

- Align README and in-app metadata with the actual product.
- Remove scaffold remnants and low-signal placeholder content.
- Add environment validation for database and S3 configuration.
- Add shared validation schemas for listing forms and uploads.
- Add a server-side auth abstraction that can temporarily resolve to the seeded user.

### Listings

- Convert listing create to a server action flow with validation and redirect handling.
- Build listing edit flow with form reuse.
- Harden delete flow around owner and admin authorization.
- Add owner contact display to the listing detail page.
- Add support for multiple image upload, image removal, and image ordering.
- Filter expired listings out of public views.
- Add admin listing management capabilities.

### Authentication

- Implement UC-only authentication late in the MVP.
- Restrict create, edit, delete, and contact access to verified UC users.
- Enforce role-aware authorization for owner and admin behaviors.

## Recommended Implementation Order

1. Foundation cleanup and shared validation/auth utilities.
2. Schema updates for roles, listing statuses, contact fields, and image ordering.
3. Convert listing creation to server actions.
4. Implement listing edit flow.
5. Harden delete flow for owner and admin access.
6. Add owner contact display and listing detail improvements.
7. Add expiration filtering and admin tooling.
8. Integrate real UC authentication against the existing auth boundary.

## Design Notes

- The product should feel like a hybrid of trusted housing marketplace and student product.
- The visual tone should skew polished and premium rather than purely utilitarian.
- The brand should lean into UC colors without reading like an official university property.
- Support both light and dark mode, with the default theme following system preference.
- Use `shadcn/ui` as the component base, but customize it into a product-specific design system rather than shipping stock defaults.
- Listing cards should optimize for price, availability, and visual confidence.
- Listing detail pages should separate housing facts, contact information, and owner actions clearly.
- Management controls should be visible only when the current user is the owner or an admin.

## Design System Requirements

### Theme and branding

- Define a UC-inspired token system for brand, surface, text, border, success, warning, and destructive colors.
- Ensure the token system works cleanly in both light and dark mode.
- Establish visual treatment for verified, expired, removed, owner, and admin states.

### Typography and visual language

- Choose a typography system for headings, body text, labels, and numeric data such as rent and dates.
- Define iconography, imagery treatment, and empty-state tone.
- Make price, date range, and room facts visually prominent without making the interface feel noisy.

### Component strategy

- Use `shadcn/ui` primitives as source-owned components.
- Standardize core primitives early:
  - button
  - input
  - textarea
  - select
  - checkbox
  - card
  - dialog
  - badge
  - toast or alert
  - dropdown menu
- Create product-specific components for listing cards, image galleries, status pills, contact panels, and management controls.

### Page-level UX

- Define layout and hierarchy for the homepage, listing cards, listing detail pages, create and edit forms, and admin moderation views.
- Ensure mobile behavior is first-class for browsing, galleries, and forms.
- Define consistent loading, empty, and error states across the product.

## Open Questions

- What exact phone UX is preferred: raw phone number display, explicit text-only preference, or both?
- Should admin deletion be hard delete or soft delete via `removed` status in the MVP?
- Do we want a dedicated admin dashboard page or admin actions embedded directly into listing pages first?

## Change Log

- 2026-03-30: Created initial MVP planning document covering architecture, authorization model, lifecycle rules, and feature sequencing.
