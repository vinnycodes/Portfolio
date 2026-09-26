# 005 — Deploy: GitHub Actions CI/CD to DigitalOcean

**Date:** 2025-02-09
**Status:** Accepted

## Context

The portfolio needs an automated pipeline that runs quality checks on every push and deploys to the DigitalOcean Droplet on merge to `main`. The project already has lint, format, and test scripts configured in `package.json`.

## Decision

**GitHub Actions** for CI/CD with two workflows:

### CI Workflow (runs on every push and PR)

```
Trigger: push to any branch, pull_request to main

Steps:
1. Checkout code
2. Setup Node 22 + pnpm
3. Install dependencies (pnpm install --frozen-lockfile)
4. Format check (pnpm format:check)
5. Lint (pnpm lint)
6. Type check (astro check)
7. Unit tests (pnpm test)
8. Build (pnpm build) — catches Astro build errors, broken imports, bad data fetches
```

All steps must pass before a PR can merge. Branch protection rules enforce this on `main`.

### Deploy Workflow (runs on push to main)

```
Trigger: push to main (after CI passes)

Steps:
1. SSH into DigitalOcean Droplet
2. Pull latest code from main
3. Run docker compose build --no-cache
4. Run docker compose up -d
5. Run health check (curl the site, verify 200)
6. If health check fails, roll back to previous image
```

Deployment secrets (SSH key, Droplet IP, environment variables) are stored in GitHub Actions Secrets.

### Branch Strategy

- `main` — production, always deployable
- `feat/*`, `fix/*`, `docs/*`, etc. — short-lived branches merged via PR
- No `develop` or `staging` branch — unnecessary for a solo portfolio. If preview deploys become valuable later, add a staging Droplet or use Docker Compose profiles.

### What Gets Tested

| Layer | Tool | What It Catches |
|-------|------|-----------------|
| Formatting | Prettier (`format:check`) | Inconsistent code style |
| Linting | ESLint + jsx-a11y | Code quality, accessibility violations |
| Types | `astro check` | TypeScript errors across `.astro` and `.ts/.tsx` |
| Units | Vitest + Testing Library | Component behavior regressions |
| Build | `astro build` | Broken imports, bad CMS fetches, SSR errors |

Future additions (not in v3 launch):
- Lighthouse CI for performance/accessibility scoring
- Playwright for end-to-end tests (chatbot flow, navigation)
- Embedding pipeline health check (verify pgvector query returns results)

## Consequences

**Positive:**
- Every merge to `main` is automatically tested and deployed — no manual SSH deploys.
- Format and lint checks prevent style drift in a codebase where both human and AI tooling contribute code.
- Build step in CI catches issues that unit tests miss (broken Astro page generation, CMS fetch failures).
- Rollback on failed health check prevents deploying a broken site.

**Negative:**
- Deploy-via-SSH is simple but not zero-downtime. There's a brief window during `docker compose up -d` where the old container stops and the new one starts. For a portfolio, this is acceptable. If it becomes a concern, switch to blue-green deploys with Nginx upstream toggling.
- No preview deploys for PRs — you can't see a live version of a branch before merging. Mitigation: `pnpm dev` locally and `pnpm build && pnpm preview` to verify production output.
- Docker build on the Droplet itself is slower than building images in CI and pushing to a registry. Acceptable for now; optimize later if build times exceed 5 minutes.
