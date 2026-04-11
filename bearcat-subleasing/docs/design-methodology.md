# Bearcat Subleasing Design Methodology

This document turns the existing product and visual briefs into an operational UI playbook. It defines how interface decisions should be made, reviewed, and translated into implementation work inside this repo.

## Role Of This Doc

- [`docs/visual-identity.md`](./visual-identity.md) defines brand, theme, typography, and visual-system direction.
- [`docs/mvp-plan.md`](./mvp-plan.md) defines product priorities and architecture.
- This doc defines how UI decisions get made from those inputs.

## Methodology Principles

- Trust first: every important surface should increase confidence before it increases density.
- Scan fast: rent, availability, room facts, and listing quality signals should be visible early.
- Editorial restraint: polish should come from hierarchy, typography, spacing, and surfaces, not gimmicks.
- Student-local warmth: the product should feel Cincinnati-adjacent and student-native without mimicking official UC branding.
- Shared-system discipline: color, spacing, and interaction treatment should come from tokens and reusable primitives, not page-local improvisation.
- Mobile clarity: small screens are a first-class surface, not a compressed desktop afterthought.

## Decision Framework

For any meaningful UI change, evaluate the proposal against these questions:

1. Does it make the housing decision easier or faster?
2. Does it improve trust through clearer facts, better imagery, or better structure?
3. Does it preserve strong hierarchy in both light and dark environments?
4. Does it use the shared visual language instead of introducing one-off styling?
5. Does it keep Cincinnati red disciplined, using it for emphasis rather than filling large surfaces by default?

If the answer is no to any of the first four questions, the UI change is not ready.

## Workflow

Use this sequence for product UI work:

1. Define the user task for the surface.
2. List the highest-priority information the user needs to decide or act.
3. Decide which parts belong to shared primitives and which require product-specific components.
4. Apply token, typography, badge, and CTA rules before refining ornament.
5. Review on mobile and desktop before considering the design ready for implementation.

## First Reference Surface

The homepage hero is the first reference surface for this methodology.

- It establishes the public-facing tone of the product.
- It proves the initial use of Bearcat red within a restrained editorial shell.
- It sets the CTA rule for public entry: the primary action should match the user’s most likely next job.
- For the homepage, that job is browsing listings through the listing dashboard.

## Surface Rules

### Homepage Hero

- The headline should clarify value quickly and read with confidence.
- The primary CTA should route to the listing dashboard.
- Supporting callouts should be factual trust signals, not decorative social proof.
- The hero visual should imply real housing inventory, not abstract SaaS illustration.

### Listing Dashboard

- Price, date range, room setup, and high-signal amenities should scan immediately.
- Listing cards should feel structured and tactile, with borders doing more work than shadows.
- Dense information is acceptable only when hierarchy remains obvious at a glance.

### Listing Detail

- The page should separate headline facts, description, location, and management actions into distinct zones.
- Owner and admin actions should not visually compete with public listing facts.

## Review Gates

Before closing a UI task, verify:

- the primary action is visually obvious
- key housing facts are readable without effort
- status meaning does not rely on color alone
- colors come from the shared token system
- the page still feels like Bearcat rather than stock framework UI
- mobile layout preserves hierarchy and tap comfort

## Current Anti-Patterns

- generic green marketplace CTAs
- stock grayscale theme defaults
- generic shadcn visual output without product customization
- decorative callouts that do not communicate trust or decision-making value
- oversized red usage that reduces readability or credibility
