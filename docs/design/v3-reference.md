# Portfolio v3 Design Reference

## Purpose

This document is the tracked visual specification for Portfolio v3. It captures approved design intent without carrying generated mockup code, remote assets, bundled fonts, or private reference material into production.

## Visual Direction

- A dark-first bento portfolio with an optional light theme.
- Layered translucent cards over soft ambient color fields.
- Strong rounded geometry, compact pill controls, and dense but readable cards.
- Expressive typography with restrained supporting text.
- Tactile interactions that remain usable with reduced motion.

## Typography

- Primary family: Figtree, self-hosted after approved font files and weights are selected.
- Intended weights: 400, 500, 600, and 700.
- Display copy uses tight tracking and compact line height.
- Body copy remains comfortable at approximately 1.5 line height.
- System sans-serif fonts are the fallback.

## Color Foundations

### Dark Theme

| Role            | Reference value             |
| --------------- | --------------------------- |
| Canvas          | `#06070c`                   |
| Card            | `rgba(30, 30, 34, 0.42)`    |
| Primary text    | `#ffffff`                   |
| Muted text      | `rgba(235, 235, 245, 0.66)` |
| Divider         | `rgba(255, 255, 255, 0.1)`  |
| Ambient blue    | `#3552ff`                   |
| Ambient magenta | `#b83e96`                   |
| Ambient teal    | `#11a596`                   |

### Light Theme

| Role           | Reference value            |
| -------------- | -------------------------- |
| Canvas         | `#eef0f4`                  |
| Card           | `rgba(255, 255, 255, 0.5)` |
| Primary text   | `#111114`                  |
| Muted text     | `#46444e`                  |
| Divider        | `rgba(20, 20, 40, 0.08)`   |
| Ambient blue   | `#c6dbff`                  |
| Ambient orange | `#ffdcc8`                  |
| Ambient green  | `#cdefe3`                  |

Treat these as starting points. Validate contrast before finalizing tokens.

## Layout

- Content width: up to `1280px`.
- Desktop grid: four columns at `1000px` and above.
- Tablet grid: two columns from `640px`.
- Mobile grid: one column below `640px`.
- Desktop card gap: approximately `28px`.
- Typical card minimum height: approximately `270px`.
- Featured profile, story, and current-focus cards can span two columns.
- Default card radius: `32px`, with pill controls using a full radius.
- Typical card padding: `28px` to `32px`.

## Content Modules

- Profile introduction with portrait, name, role, and short biography.
- Social cards for professional and personal links.
- Current listening or media card.
- Personal story card.
- Inspiration collections grouped by topic.
- Current-focus card.
- Featured work and historical portfolio links.
- Direct contact card.
- Footer with restrained secondary links.

Content and links must be validated before publishing; mockup copy is not automatically production copy.

## Navigation And Filtering

- A compact wordmark anchors the header.
- Pill navigation filters content by All, About, Inspiration, and Links.
- The active item uses a sliding pill indicator.
- Theme and contact controls remain visually distinct from filtering.
- Filtered views may expose a bottom dock for navigating hidden categories.
- Filtering must preserve semantic controls, keyboard operation, focus visibility, and predictable announcements.

## Surface Treatment

- Cards use translucent backgrounds, subtle inset highlights, and restrained deep shadows.
- Backdrop blur is progressive enhancement; content must remain readable without it.
- Ambient color fields are large, blurred, low-frequency shapes behind the grid.
- A pointer-following highlight may add depth without becoming necessary for comprehension.
- Brand-colored cards can break the neutral rhythm when contrast remains sufficient.

## Motion

- Primary easing reference: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Cards may enter with staggered opacity, translate, and restrained perspective.
- Hover lift should remain subtle and must not move focused content unpredictably.
- Optional card tilt and ambient parallax respond to precise pointers only.
- The wordmark intro, ambient animation, canvas background, filtering transitions, and zoom controls are enhancements, not launch blockers.
- `prefers-reduced-motion: reduce` disables nonessential transforms, parallax, canvas animation, and staggered entrances.

## Implementation Boundaries

- Do not copy generated templates, scripts, inline styles, or remote asset URLs into production.
- Start with Astro, modern CSS, and browser APIs.
- Add a client framework only when interaction complexity demonstrates a maintainability benefit.
- Self-host only assets with confirmed usage rights.
- Test blur, shadows, canvas work, and pointer effects on lower-powered mobile devices.
