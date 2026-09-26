# 001 — Architecture: Astro + React Islands + Payload CMS + Postgres

**Date:** 2025-02-09
**Status:** Accepted

## Context

Portfolio v3 needs a stack that supports static performance for marketing pages, interactive React components for features like the workspace switcher, a headless CMS for content management, and a relational database for content and auth.

The previous version used Sanity as the CMS. While Sanity is excellent for content editing, it's a hosted service with opaque pricing at scale and no self-hosted option.

## Decision

**Astro 5** as the site framework. Astro's island architecture is the ideal fit: static HTML by default (fast, SEO-friendly) with opt-in React hydration only where interactivity is needed. The `.astro` component format handles layout and content pages, while React `.tsx` components power interactive features via `client:load` or `client:visible` directives.

**React 19** for interactive islands. The workspace switcher and any future dynamic UI are React components hydrated on the client. Framer Motion handles animations. Islands are kept small and focused — data fetching and routing stay in Astro.

**Payload CMS 3.x** as the headless CMS, self-hosted. Payload runs as a Next.js app with a built-in admin panel, provides a REST and GraphQL API, and supports drafts and scheduled publishing. It stores data in Postgres via Drizzle ORM.

**PostgreSQL** as the single database. Postgres serves Payload's content store and session/auth management. This keeps data ownership in one place and simplifies ops for a personal portfolio.

**Monorepo structure:**
```
/
├── src/          # Astro site (pages, components, styles)
├── cms/          # Payload CMS app
├── docker/       # Docker configs
├── docs/         # Governance, ADRs, agent log
└── public/       # Static assets
```

## Consequences

**Positive:**
- Full ownership of data and infrastructure — no vendor lock-in.
- Single database for content and auth simplifies ops.
- Astro's static output means the marketing pages are fast by default; only interactive islands add JS.

**Negative:**
- More operational complexity than a fully managed stack (Sanity + Vercel). We own the server, database, and CMS runtime.
- Payload 3.x is newer and has a smaller ecosystem than Sanity — fewer community plugins.
- Monorepo adds coordination overhead between the Astro site and the CMS app.
