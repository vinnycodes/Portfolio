# Agent Log

Running log of decisions, learnings, and pitfalls encountered during development. Newest entries first.

---

## 2026-09-30 - CI Quality Baseline

**What:** Added the first GitHub Actions workflow for frozen installation, formatting, Astro diagnostics, and production builds.

**Decisions made:**

- CI runs for pushes to `v3` and for pull requests; `master` remains unchanged until the rebuild is promoted.
- CI reads Node from `.nvmrc` and pnpm from the root `packageManager` field so local and hosted checks use the same toolchain.
- The pnpm setup action tracks the maintained v6 release line because it runs actions on Node 24 rather than GitHub's deprecated Node 20 runtime.
- The workflow has read-only repository permissions and cancels superseded runs for the same ref.
- Linting and automated tests remain absent until project behavior justifies their dependencies and configuration.

**Learnings:** Installing pnpm before `actions/setup-node` lets the Node action configure the pnpm store cache without duplicating package-manager version declarations.

**Pitfalls:** The workflow intentionally does not validate direct pushes to `master`; add that trigger when the rebuild is ready to merge.

## 2026-09-29 - Clean Foundation And Public History Sanitation

**What:** Removed a private generated design attachment from the public `v3` history, restored it only as an ignored local reference, and replaced the legacy application with a fresh Astro 7 workspace.

**Decisions made:**

- The public repository keeps only a sanitized written design specification.
- The application starts with Astro, modern CSS, Turbo, formatting, and framework checks.
- React, Tailwind, Sass, animation libraries, Sanity, linting, and testing packages remain absent until implemented features require them.
- Node 24 and pnpm 12.6.0 are the initial runtime and package-manager baseline.
- TypeScript 6.0.3 matches the current `@astrojs/check` peer range; TypeScript 7 remains premature for this toolchain.
- `esbuild` is the only approved dependency build in the fresh graph.
- The design foundation precedes Sanity so content-backed slices can build on established visual primitives; dynamic application infrastructure remains future work rather than a launch requirement.

**Learnings:**

- Generated design exports can package unrelated private reference material and must be audited before tracking.
- A clean scaffold is smaller and safer than migrating placeholder code and then removing its dependency graph.

**Pitfalls:** The removed commit can remain accessible through host-side caches after a force push. Request cached-object cleanup from repository support and avoid sharing the obsolete commit URL.

## 2026-09-28 - pnpm Version And Build Policy

**What:** Pinned pnpm 12.6.0 and replaced pnpm's generated build placeholders with an explicit workspace and dependency-build policy.

**Decisions made:**

- `packageManager` pins pnpm 12.6.0 for local development and CI.
- The workspace includes packages under `apps/*`; the repository root remains included automatically.
- Build scripts are allowed only for `@parcel/watcher`, `esbuild`, and `sharp`.

**Learnings:**

- pnpm 12 automatically adds unreviewed build dependencies to `pnpm-workspace.yaml` with `set this to true or false` placeholders.
- Pinning pnpm adds `packageManagerDependencies` to the lockfile. The lockfile must be regenerated once before frozen installs pass.

**Pitfalls:** The existing Astro build succeeds but reports deprecated Sass `@import` rules, stale Browserslist data, and an unused `framer-motion` import. Address these during the monorepo migration and quality baseline rather than coupling them to package-manager configuration.

## 2026-09-28 - Portfolio v3 Governance Reset

**What:** Replaced the previous ADR set with decisions that describe the Astro, Sanity, and Vercel rebuild, then aligned the roadmap, execution plan, and contributor conventions.

**Decisions made:**

- Old Payload, Docker, and Droplet ADRs were removed rather than retained as implementation constraints.
- The active ADR set now covers application architecture, the v3 design system, Sanity content, Vercel delivery, and deferred dynamic services.
- The repository will use a pnpm/Turborepo structure with `apps/web` and `apps/studio`.
- Static generation remains the default; Vercel Functions, managed PostgreSQL, and workers are introduced only for concrete dynamic requirements.

**Learnings:**

- Architecture decisions also existed implicitly in contributor conventions, so replacing ADRs alone would have left conflicting instructions.
- Deferring provider choices for future services keeps the initial release focused without blocking a path to RAG or authenticated features.

**Pitfalls:** The current repository still uses the pre-monorepo root layout. Paths documented for `apps/web` and `apps/studio` become executable conventions during the next implementation phase.

## 2026-02-09 — Roadmap and ADR Alignment

**What:** Aligned roadmap and ADRs with the updated governance location, deferred AI/tags into a future features ADR, and revised the design system ADR to match the iOS bento direction.

**Decisions made:**

- Roadmap now points to `docs/agents.md` and `docs/decisions/`.
- AI/embeddings and tags moved to a deferred ADR to keep v3 scope focused.
- Design system ADR updated to the iOS-style bento direction inspired by `nevflynn.com`.

**Learnings:**

- Current ADRs included AI/embedding scope that wasn't in the roadmap; separating future scope keeps planning cleaner.

**Pitfalls:** None.

## 2025-02-09 — Phase 0 Governance Setup

**What:** Created `agents.md`, six ADRs, and this log file as the Phase 0 governance foundation.

**Decisions made:**

- Adapted workplace agent guidelines for solo project use (plan-before-execute, ask-before-deciding, iterative steps).
- Established commit conventions: conventional commits, never reference AI tooling, always explain _why_.
- Documented existing design system tokens by auditing `variables.scss`, `tailwind.config.mjs`, and component styles.

**Learnings:**

- The Inter font is imported in both `reset.scss` and `global.scss` — duplicate import to clean up in Phase 1.
- `@sanity/client` and `@sanity/image-url` are in `package.json` but completely unused. Remove during CMS migration.
- Design tokens are split across SCSS variables and Tailwind config with no single source of truth. Consolidation is deferred but tracked.

**Pitfalls:** None yet — this is the foundation. The risk is over-governing a solo project. Keep governance lightweight; add process only when it prevents a real problem.
