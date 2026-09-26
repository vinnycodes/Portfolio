# 002 — Design System: iOS-Style Bento Grid + Tailwind + SCSS

**Date:** 2025-02-09
**Status:** Accepted (Baseline)

## Context

The portfolio needs a distinctive visual identity that showcases frontend craft while remaining practical to maintain. The target direction is an iOS-style bento layout with a glassy, layered surface treatment inspired by `https://nevflynn.com/` (soft depth, subtle gradients, and tactile cards). The current implementation uses a bento grid layout with interactive workspace elements, Tailwind CSS for utility styling, SCSS for complex component styles (animations, pseudo-elements, glass effects), and Framer Motion for React component animations.

Design tokens exist implicitly in `variables.scss` and `tailwind.config.mjs` but are not formalized. Colors are defined in both places with some overlap, and there's no documented type scale or spacing system. The current tokens are a baseline to refine during the design pass.

## Decision

**Visual language: iOS-style bento with glass depth.** The homepage uses a two-column CSS Grid (`bento-grid`) with cards that span 1–2 columns and 1–2 rows. Cards should feel like iOS surfaces: soft gradients, layered shadows, thin borders, and subtle translucency where appropriate. Hover states should be tactile but restrained (micro-lift, slight shadow bloom). This visual language extends to all pages for consistency.

**Styling approach: Tailwind-first, SCSS for escape hatches.** Tailwind utility classes are the default for layout, spacing, typography, and color. SCSS is used only when Tailwind cannot express the pattern:
- Complex animations with keyframes (`squiggly-line`, `lightbulb-burst`, `drawCrayonLine`)
- Pseudo-element tricks and nested hover states (`.click-icon-container` hover cascade)
- Glass morphism effects (`glass-effect` mixin with backdrop-filter)
- Grid layout with named spans (`.bento-grid`, `.span-2`, `.span-row-2`)

Inline `style` attributes are never mixed with Tailwind on the same element.

**Design tokens (baseline; under revision during Phase 1):**

| Token | Value | Source |
|-------|-------|--------|
| Primary | `#ef4444` (red-500) | `$primary-color`, used in squiggly line, CTA buttons |
| Text primary | `#111827` (gray-900) | `$text-primary`, body text |
| Text secondary | `#6b7280` (gray-500) | `$text-secondary`, captions and metadata |
| Surface | `#f9fafb` (gray-50) | `$background-color`, card backgrounds |
| Font family | Inter (temporary) | To be replaced with a more expressive typeface in Phase 1 |
| Border radius (card) | 16px (`rounded-2xl`) | `ios-card` mixin |
| Border radius (pill) | 9999px (`rounded-full`) | Nav links |
| Shadow (rest) | `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)` | `ios-card` mixin |
| Shadow (hover) | `0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | `ios-card` mixin |
| Hover lift | `translateY(-2px)` | Cards; `-4px` for project cards |
| Transition | `all 0.2s ease` | Default for interactive elements |

**Type scale** is not yet formalized. Current usage (baseline):
- Hero heading: `text-4xl font-bold` (36px)
- Section headings: `text-lg font-semibold` (18px)
- Body: `text-sm` (14px) — default for card content
- Caption: `text-xs text-gray-500` (12px)

This should be documented and enforced, but formalizing a custom type scale is deferred to Phase 1 refinement to avoid premature abstraction.

**Motion:** Framer Motion handles React island animations. CSS keyframe animations handle Astro component motion (squiggly line, click icon burst). Motion should feel iOS-like: short durations, ease-out curves, and minimal overshoot.

## Consequences

**Positive:**
- iOS bento grid is visually distinctive and immediately communicates frontend polish to portfolio visitors.
- Tailwind-first approach keeps most styling co-located with markup and easy to scan.
- SCSS escape hatches prevent fighting Tailwind for complex visual effects.
- Design tokens are now documented in one place for reference.

**Negative:**
- Tokens are defined in two places (SCSS variables + Tailwind config) — a future consolidation pass should make Tailwind the single source and generate SCSS variables from it, or eliminate SCSS variables entirely.
- The `Inter` font is imported in both `reset.scss` and `global.scss` (duplicate import). Should be consolidated.
- No dark mode support. Adding it later will require revisiting every hardcoded `bg-white`, `text-gray-900`, etc. This is an intentional deferral — dark mode is out of scope for v3 launch.
