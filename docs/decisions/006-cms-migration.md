# 006 — CMS Migration: Sanity → Payload

**Date:** 2025-02-09
**Status:** Accepted

## Context

The portfolio currently has `@sanity/client` (v7.6.0) and `@sanity/image-url` (v1.1.0) in its dependencies from an earlier exploration of Sanity as the CMS. No Sanity Studio is configured, no schemas are defined, and no content exists in Sanity — these are unused dependencies. The roadmap calls for a headless CMS to manage Notes, Projects, and Pages.

The two contenders evaluated were Sanity (continuing the existing direction) and Payload CMS (self-hosted alternative).

## Decision

**Migrate to Payload CMS 3.x. Remove Sanity dependencies.**

### Why Payload over Sanity

| Factor | Sanity | Payload |
|--------|--------|---------|
| Hosting | Managed (sanity.io) | Self-hosted (our Docker stack) |
| Database | Proprietary (Content Lake) | Postgres via Drizzle ORM |
| Pricing | Free tier → usage-based at scale | Free forever (MIT license) |
| Data ownership | Data lives on Sanity's infrastructure | Data lives in our Postgres instance |
| Custom hooks | Webhooks (external, async) | `afterChange` / `beforeChange` hooks (in-process, sync) — ideal for content workflows |
| Admin UI | Sanity Studio (React, customizable) | Built-in admin panel (React, customizable) |
| Rich text | Portable Text (custom format) | Lexical editor (standard, extensible) |
| Auth | Sanity-managed | Built-in, customizable (email/password, API keys) |
| TypeScript | Good support via codegen | First-class — config is TypeScript, types are auto-generated |

The deciding factors were full data ownership, self-hosting, and in-process hooks that keep content workflows under our control.

### Migration Steps

1. Remove `@sanity/client` and `@sanity/image-url` from `package.json`.
2. Scaffold Payload app in `cms/` directory.
3. Configure Postgres adapter and define collections (see ADR 004).
4. Set up Docker service for Payload in `docker-compose.yml`.
5. No content migration needed — there's no existing Sanity content.

## Consequences

**Positive:**
- Full data ownership — content in a single Postgres instance we control.
- In-process hooks keep content workflows in-process and easier to extend later.
- No usage-based pricing surprises — Payload is MIT licensed.
- Payload's TypeScript-first config means the content model is type-checked at build time.

**Negative:**
- We lose Sanity's real-time collaborative editing (not needed for a solo portfolio, but worth noting).
- We lose Sanity's global CDN for assets — need to handle image optimization ourselves (Astro's `<Image>` component or a CDN like Cloudflare in front of the Droplet).
- Payload 3.x is newer and has a smaller plugin ecosystem than Sanity. Custom functionality that Sanity has plugins for may need to be built from scratch.
- Payload runs as a Next.js app, adding another Node process to the Docker stack. Memory overhead is manageable on a 4GB Droplet but worth monitoring.
