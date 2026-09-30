# 002 - Portfolio v3 Design System

**Date:** 2026-09-28
**Status:** Accepted

## Context

Portfolio v3 needs a distinctive interface that demonstrates frontend craft without inheriting generated code or undocumented tokens from design experiments. The reference design establishes a dark bento composition, expressive typography, dense information cards, and restrained tactile motion.

## Decision

Use `docs/design/v3-reference.md` as the canonical visual specification. Recreate approved behavior with maintainable Astro components and standards-based web APIs.

Use the following design direction:

- Dark, layered bento surfaces with clear visual hierarchy.
- Figtree as the self-hosted primary typeface.
- Explicit tokens for color, typography, spacing, radii, shadows, and motion.
- Modern CSS, custom properties, and cascade layers as the initial styling system.
- Additional styling or UI dependencies only when the implementation demonstrates a concrete need.
- Responsive layouts designed for mobile and desktop rather than scaled from one fixed canvas.
- Restrained interaction feedback with reduced-motion alternatives.

Do not ship generated reference scripts, remote design assets, internal materials, or fonts without confirmed usage rights. Reuse existing portfolio assets only after reviewing their relevance and provenance.

Interactive elements must use semantic controls, visible focus states, keyboard support, and sufficient contrast.

## Consequences

### Positive

- The implementation preserves the reference's visual identity without depending on generated code.
- Central tokens make visual changes deliberate and consistent.
- Accessibility and responsive behavior are design requirements rather than cleanup tasks.

### Negative

- Recreating the reference faithfully takes longer than embedding or copying its output.
- Complex interactions may eventually justify a client UI integration, but that decision is deferred until the interaction exists.
- Motion and layered effects require performance testing on lower-powered devices.
