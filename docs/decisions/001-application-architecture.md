# 001 - Application Architecture

**Date:** 2026-09-28
**Status:** Accepted

## Context

Portfolio v3 needs fast public pages, focused client-side interactions, structured editorial content, and a path to future authenticated and AI-backed features. The initial release does not require a persistent application server or database.

The architecture should keep the launch simple without forcing future dynamic features into the same deployment model.

## Decision

Use Astro 7 in a pnpm and Turborepo monorepo. The initial workspace contains only the web application:

```text
/
├── apps/
│   └── web/       # Astro 7
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

The web application uses Astro for routing, layouts, content rendering, and static generation. Client-side JavaScript and UI-framework integrations are opt-in and are added only when a concrete interaction requires them.

Sanity Studio will be added later as `apps/studio`. Sanity will own editorial content and media; it will not be the application database for future user data.

Published pages are generated statically by default. On-demand routes and API endpoints can be added with the Vercel adapter when a concrete feature needs them.

Shared packages will be introduced only when code is genuinely reused across applications. The initial monorepo will not add speculative package abstractions.

## Consequences

### Positive

- Public pages ship minimal JavaScript and remain fast and search-friendly.
- Future applications and integrations can evolve independently.
- The repository has one command surface for development, validation, and builds.
- Dynamic services can be added without converting the entire site to server rendering.

### Negative

- Monorepo tooling adds configuration beyond a single Astro application.
- Build-time content requires a rebuild after publishing.
- Features spanning Sanity, the web app, and future services need explicit integration boundaries.
