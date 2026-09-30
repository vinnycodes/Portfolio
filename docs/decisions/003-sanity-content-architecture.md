# 003 - Sanity Content Architecture

**Date:** 2026-09-28
**Status:** Accepted

## Context

The portfolio needs structured content for profile information, social links, projects, notes, and managed pages. Editing should not require code changes, and the CMS should not create a server-maintenance burden.

## Decision

Use Sanity as the hosted content platform and deploy Sanity Studio through Sanity.

Define the initial schema around these types:

- `siteSettings`: singleton profile, contact, availability, social, and default SEO information.
- `project`: project metadata, case-study content, imagery, links, technology, and ordering.
- `note`: article metadata, Portable Text content, imagery, publication date, and SEO overrides.
- `page`: managed long-form content for routes that do not need a dedicated schema.
- Reusable objects for social links, SEO fields, images with alternative text, and Portable Text blocks.

Use Sanity's draft and published document model rather than adding a duplicate status field. Public builds query only published content through the Sanity CDN.

Generate TypeScript types from the Studio schemas and typed GROQ queries. The web application must handle optional content explicitly and must not maintain a second production content source.

Published content is statically generated. Sanity publish events trigger a Vercel deploy hook so production pages remain current. Draft preview and visual editing are deferred until they provide concrete editorial value.

## Consequences

### Positive

- Content editing, assets, drafts, and publishing are managed services.
- Schema and query type generation reduces integration drift.
- Static delivery remains independent of CMS runtime availability after a successful build.

### Negative

- Published changes are delayed by the Vercel rebuild time.
- Sanity is an external dependency with usage limits and platform-specific query tooling.
- Schema changes require coordination between Studio types, queries, and rendering components.
