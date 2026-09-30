# 004 - Hosting And Delivery

**Date:** 2026-09-28
**Status:** Accepted

## Context

The initial portfolio is static-first but will eventually include bounded dynamic features such as authentication callbacks, chat requests, and server-side data access. Hosting should provide previews, safe rollbacks, and a path to functions without requiring server administration.

## Decision

Deploy `apps/web` to Vercel through its Git integration.

Keep the Vercel project rooted at the repository root. The tracked `vercel.json` runs the frozen workspace install and root Turbo build, then publishes the static Astro output from `apps/web/dist`.

- `master` is the production branch.
- `v3` and pull requests receive preview deployments.
- The production domain is attached after the v3 launch checks pass.
- Failed builds do not replace the last healthy production deployment.
- Sanity Studio is hosted separately by Sanity.

Keep the Astro site static until a route needs server execution. Add `@astrojs/vercel` at that point and use Vercel Functions for bounded request-response work.

GitHub Actions validates formatting, framework and type checks, tests when present, and builds. Vercel owns deployment; CI does not duplicate deployment through SSH or custom server scripts.

Use a Sanity webhook and Vercel deploy hook to rebuild published static content. Scope environment variables separately for development, preview, and production, and keep credentials server-only.

Do not provision a DigitalOcean Droplet for the initial release. DigitalOcean remains an option for future persistent workers or services that do not fit serverless execution.

## Consequences

### Positive

- Every branch and pull request can be reviewed through an isolated deployment.
- TLS, deployment promotion, rollback behavior, and infrastructure maintenance are managed.
- The application can add server-side routes incrementally.

### Negative

- Runtime features must fit Vercel's execution model or move to another service.
- The system spans Vercel and Sanity rather than one infrastructure provider.
- Usage growth or commercial use may require a paid Vercel plan.
