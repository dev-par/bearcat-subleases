# Bearcat Subleasing Visual Identity

This document defines the visual identity and theming direction for the Bearcat Subleasing MVP. It is the source of truth for brand tone, theme behavior, and visual system decisions under `BEA-11`.

## Design Intent

Bearcat Subleasing should feel like a hybrid of two products:

- a trusted housing marketplace with strong clarity, structure, and credibility
- a campus-native student product with warmth, local identity, and less corporate distance

The visual tone should feel polished and premium, but not luxurious in a way that feels alien to students. The interface should project trust, specificity, and momentum. It should look like a serious housing product built for students, not a generic SaaS dashboard and not a temporary campus side project.

## Brand Attributes

The UI should consistently express these traits:

- trustworthy
- direct
- local
- confident
- clean
- editorial rather than playful

The UI should avoid feeling:

- overly official or university-branded
- overly casual or social-app-like
- generic marketplace boilerplate
- dark, moody, or tech-startup coded for its own sake

## Visual Positioning

The product should sit in a middle ground between apartment-search utility and student-specific identity.

### Marketplace side

- structured listing cards
- high emphasis on price and availability
- photography treated as a trust signal
- restrained interactions and legible hierarchy

### Student-product side

- warm brand color choices
- lighter language and more approachable surfaces
- subtle campus cues
- more personality than a real-estate portal

## Brand Use of UC Influence

The product should lean into UC-adjacent color energy, especially red and black, without trying to imitate official University of Cincinnati materials.

The official UC brand guide is the anchor for the palette used in this product. The relevant official colors are:

- `UC Red`: `#e00122`
- `UC Black`: `#000000`
- `White`: `#ffffff`
- `UC Dark Red`: `#b8011c`
- `Grey`: `#f3f3f3`
- `Bearcats Black`: `#333333`
- `Steger Silver`: `#a7a5aa`
- `Main Street Mist`: `#e0dfe3`
- `Gettler Gold`: `#d1b179`
- `Tangeman Tan`: `#eadbc1`

Source: https://www.uc.edu/about/marketing-communications/brand-guide/visual-identity/color.html

Rules:

- use UC-inspired red as the key brand anchor
- use black and near-black neutrals for authority and contrast
- use cream, stone, and soft warm grays to prevent the interface from feeling harsh
- avoid direct reproduction of official athletics or institutional branding patterns
- use brand color with discipline; the interface should not become a wall of saturated red

## Theme Strategy

The product must support both light and dark mode.

- default theme behavior should follow system preference
- dark mode should feel intentionally designed, not inverted
- both themes should preserve the same hierarchy, trust level, and polish

Per current shadcn/ui guidance, theme behavior should be implemented with theme variables and class-based dark mode, typically through `next-themes` with `defaultTheme=\"system\"` and `enableSystem`. Source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/dark-mode/next.mdx

### Theme implementation defaults

- use class-based dark mode
- set the default theme to system
- enable system preference sync
- avoid page-specific color forks; all page styling should resolve through shared theme tokens

## Color System

These are the required token categories for implementation. Final OKLCH/CSS variable values can be refined during component implementation, but the token structure itself is fixed.

### Core palette

- `brand-primary`: Bearcat red
  - light mode intent: saturated, confident red for primary actions and key highlights
  - dark mode intent: slightly brighter red so it holds contrast on dark surfaces
- `brand-ink`: near-black
  - used for strong headings, framing contrast, and dark-mode structural surfaces
- `brand-cream`: warm off-white
  - used to soften large surfaces in light mode
- `brand-stone`: warm gray
  - used for borders, muted cards, and secondary surfaces

### Initial token targets

These are fixed initial implementation targets derived from the official UC palette and selected to support the product’s premium marketplace tone.

- `brand-primary`: `#e00122`
- `brand-primary-hover`: `#b8011c`
- `brand-ink`: `#333333`
- `brand-black`: `#000000`
- `brand-white`: `#ffffff`
- `brand-cream`: `#eadbc1`
- `brand-gray`: `#f3f3f3`
- `brand-mist`: `#e0dfe3`
- `brand-silver`: `#a7a5aa`
- `brand-gold`: `#d1b179`

### Fixed token table

These values are the default application tokens to implement unless later accessibility testing forces a revision.

#### Light theme

- `background`: `#ffffff`
- `foreground`: `#333333`
- `card`: `#ffffff`
- `card-foreground`: `#333333`
- `popover`: `#ffffff`
- `popover-foreground`: `#333333`
- `primary`: `#e00122`
- `primary-foreground`: `#ffffff`
- `secondary`: `#f3f3f3`
- `secondary-foreground`: `#333333`
- `muted`: `#f3f3f3`
- `muted-foreground`: `#666666`
- `accent`: `#eadbc1`
- `accent-foreground`: `#333333`
- `border`: `#e0dfe3`
- `input`: `#e0dfe3`
- `ring`: `#b8011c`
- `destructive`: `#b8011c`
- `destructive-foreground`: `#ffffff`

#### Dark theme

- `background`: `#121212`
- `foreground`: `#f5f3f0`
- `card`: `#1a1a1a`
- `card-foreground`: `#f5f3f0`
- `popover`: `#1a1a1a`
- `popover-foreground`: `#f5f3f0`
- `primary`: `#ff4d67`
- `primary-foreground`: `#ffffff`
- `secondary`: `#232323`
- `secondary-foreground`: `#f5f3f0`
- `muted`: `#232323`
- `muted-foreground`: `#c4bfc7`
- `accent`: `#3a3226`
- `accent-foreground`: `#f3e5c8`
- `border`: `#343434`
- `input`: `#343434`
- `ring`: `#ff6a80`
- `destructive`: `#ff6a80`
- `destructive-foreground`: `#121212`

### Semantic tokens

- `background`
- `foreground`
- `card`
- `card-foreground`
- `muted`
- `muted-foreground`
- `primary`
- `primary-foreground`
- `secondary`
- `secondary-foreground`
- `accent`
- `accent-foreground`
- `border`
- `input`
- `ring`
- `destructive`
- `destructive-foreground`

### Product state colors

- `verified`
  - should read as trustworthy and positive without competing with brand red
  - fixed direction: deep green or blue-green
- `expired`
  - should read as subdued and unavailable
  - fixed direction: cool gray
- `removed`
  - should read as deliberate administrative action
  - fixed direction: dark neutral with destructive accent treatment only when necessary
- `owner`
  - should be recognizable but subtle
  - fixed direction: muted gold or warm neutral accent
- `admin`
  - should read as operational and restricted
  - fixed direction: darker neutral badge with clear label rather than loud color

### Fixed state token table

These state colors are product-level defaults:

#### Light theme states

- `verified`: `#0f766e`
- `verified-foreground`: `#ffffff`
- `expired`: `#a7a5aa`
- `expired-foreground`: `#333333`
- `removed`: `#b8011c`
- `removed-foreground`: `#ffffff`
- `owner`: `#d1b179`
- `owner-foreground`: `#333333`
- `admin`: `#333333`
- `admin-foreground`: `#ffffff`

#### Dark theme states

- `verified`: `#2dd4bf`
- `verified-foreground`: `#0f172a`
- `expired`: `#8f8992`
- `expired-foreground`: `#f5f3f0`
- `removed`: `#ff6a80`
- `removed-foreground`: `#121212`
- `owner`: `#d1b179`
- `owner-foreground`: `#121212`
- `admin`: `#c4bfc7`
- `admin-foreground`: `#121212`

### Accessibility rules

The official UC guide explicitly notes that red on black and black on red do not meet accessibility requirements and should not be used. Apply that rule directly in the product.

Do not use:

- `#e00122` text on `#000000` or `#333333`
- `#000000` or `#333333` text on `#e00122`

Preferred combinations:

- white text on red
- charcoal or black text on white, gray, mist, cream, or tan surfaces
- white or warm off-white text on dark neutral surfaces

## Light Theme Direction

Light mode should be the cleaner, more editorial expression of the brand.

- warm off-white or soft cream background instead of flat pure white
- strong charcoal foreground
- rich red reserved for primary actions, active filters, and important emphasis
- cards should feel crisp and tangible, not floating-glassy
- borders should be visible and intentional

The light theme should feel like:

- housing listings printed through a contemporary editorial lens
- confident and premium without luxury theatrics

## Dark Theme Direction

Dark mode should feel cinematic and composed rather than neon or gamer-like.

- use charcoal and ink surfaces, not absolute black everywhere
- maintain warm undertones where possible
- brand red should become slightly brighter and cleaner to preserve contrast
- cards should feel architectural, with disciplined borders and controlled elevation
- muted text should remain readable; dark mode cannot rely on low-contrast gray-on-gray styling

The dark theme should feel like:

- late-night apartment search with strong readability and less glare
- composed and premium, not flashy

## Typography Direction

Typography should carry much of the product’s polish.

### Desired feel

- headings should feel confident, slightly editorial, and memorable
- body copy should remain crisp, modern, and highly legible
- numeric data such as rent and dates should feel deliberate and prominent

### Recommended structure

- display/headline font: `Newsreader`
- UI/body font: `Geist Sans`
- mono/tabular support: `Geist Mono`

### Usage rules

- use `Newsreader` for page titles, major section headings, and premium emphasis moments
- do not use `Newsreader` for dense metadata, forms, labels, or small cards
- use `Geist Sans` for all UI copy, controls, cards, filters, and supporting text
- use `Geist Mono` only where tabular or operational clarity matters, such as rent formatting experiments, dates, or admin metadata

### Constraints

- avoid default-feeling font pairings that flatten the product into generic SaaS
- do not use overly playful display faces
- keep forms and dense listing surfaces extremely legible

## Photography and Imagery

Listing photography is a core trust signal, not decoration.

Rules:

- photos should be large enough to communicate condition and light
- image crops should prioritize room clarity over stylistic cropping
- placeholder imagery should feel intentional and restrained
- overlays and gradients should never make listing photos feel muddy

## Iconography

Icons should be clean, geometric, and understated.

- use icons to support scanability, not decorate empty space
- prefer a single icon family across the product
- icons should reinforce facts like dates, room type, and contact methods without becoming the main visual language

## Component Character

The component system should feel structured and tactile.

### Buttons

- primary buttons should be unmistakable and high confidence
- secondary buttons should feel restrained but still substantial
- destructive buttons should be explicit and serious

### Cards

- listing cards should feel dense with useful information, not bloated
- corners should be controlled rather than overly rounded
- shadows should be subtle; borders should do more of the work

### Inputs

- form controls should feel deliberate and premium, not browser-default adjacent
- focus states should be highly visible and brand-aligned
- validation states should be clear without feeling alarmist

### Badges and pills

- use compact, high-signal badges for verified, furnished, private bathroom, and status states
- do not overuse colored badges to the point of visual noise
- outlined badges are the default product treatment
- filled badges are reserved for the most important or highest-severity states

### Badge treatment defaults

- amenities such as furnished and private bathroom should use outlined neutral or accent treatments
- verified should use outlined success treatment
- expired should use outlined muted treatment
- removed may use stronger destructive emphasis when it needs to communicate administrative action
- owner and admin badges should remain restrained and not compete with listing price or availability

## Spatial Rules

- use consistent vertical rhythm and generous section spacing on detail pages
- keep listing cards compact but breathable
- prioritize hierarchy before ornament
- lean toward asymmetry only when it improves emphasis; the product should still feel stable and trustworthy

## Motion Direction

Motion should be sparse and purposeful.

- subtle hover states on cards and buttons
- deliberate transitions for image loading, dialogs, and theme changes
- avoid ornamental animation that distracts from scanning listings

## Accessibility Expectations

- strong contrast in both themes
- visible focus states on all interactive elements
- accessible color use for status communication
- no critical meaning communicated by color alone
- mobile-first readability for pricing, dates, and contact information

## shadcn/ui Guidance for Implementation

`shadcn/ui` should be used as the component base, but not as a stock visual identity. Current shadcn/ui guidance emphasizes source-owned components and variable-driven theming, which fits this product well because we want to build a custom design system on top of shared primitives rather than accept default styling. Relevant docs support:

- source-owned components rather than black-box package imports
- class-based dark mode
- variable-driven theme customization in global CSS

Sources:

- https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/(root)/index.mdx
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/installation/manual.mdx
- https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/dark-mode/next.mdx

## Initial Implementation Recommendations

When UI implementation begins:

1. Define theme tokens first in global CSS before styling pages ad hoc.
2. Add system-driven dark mode support early so light mode is not the only polished path.
3. Establish the core typography pairing before building final page layouts.
4. Customize shadcn primitives immediately after installation to match the product tone.
5. Treat listing cards, status badges, and contact panels as product-specific components rather than generic primitives.

## Operational Surface Direction

Admin UX should start as embedded controls on listing surfaces rather than a dedicated moderation dashboard.

Rules:

- admin actions should appear only in authenticated management contexts
- admin controls should be visually separated from public-facing listing information
- owner and admin actions should share structure where possible, but admin actions should still read as more operational
- no dedicated admin dashboard is assumed in the first design pass

## Remaining Open Decisions

- how much gold or warm accent should be used for owner-only states once components are mocked
- whether rent should use tabular numeral treatment globally or only in select surfaces
- whether the dark primary red should stay at `#ff4d67` or move slightly deeper after component mock review

## Change Log

- 2026-03-31: Created initial BEA-11 visual identity and theming brief.
- 2026-03-31: Locked the default font system, default badge treatment, and embedded-first admin surface direction.
- 2026-03-31: Added fixed UC-derived light and dark theme token values plus accessibility guardrails.
