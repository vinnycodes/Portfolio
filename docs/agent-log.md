# Agent Log

Running log of decisions, learnings, and pitfalls encountered during development. Newest entries first.

---

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
- Established commit conventions: conventional commits, never reference AI tooling, always explain *why*.
- Documented existing design system tokens by auditing `variables.scss`, `tailwind.config.mjs`, and component styles.

**Learnings:**
- The Inter font is imported in both `reset.scss` and `global.scss` — duplicate import to clean up in Phase 1.
- `@sanity/client` and `@sanity/image-url` are in `package.json` but completely unused. Remove during CMS migration.
- Design tokens are split across SCSS variables and Tailwind config with no single source of truth. Consolidation is deferred but tracked.

**Pitfalls:** None yet — this is the foundation. The risk is over-governing a solo project. Keep governance lightweight; add process only when it prevents a real problem.
