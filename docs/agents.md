# Agent Guidelines

This document defines how AI-assisted development works on this project. All agents (Claude Code, Cursor, Cline, or any future tooling) must follow these rules.

---

## Interactive Mode Guidelines

The following sections apply when running interactively with user dialog. In headless/CLI mode, make reasonable decisions based on context and proceed without blocking for approval.

### Plan Before Executing

Default to planning mode for all non-trivial requests: present your implementation approach and get approval before making changes. Show what you'll modify, which files are affected, and any trade-offs. Only skip planning for truly trivial changes (typo fixes, single-line edits, obvious formatting). This prevents wasted effort from misunderstood requirements and ensures alignment before committing to an approach.

### Ask Before Deciding

During execution, pause and ask when you encounter decisions or uncertainties rather than making assumptions. If multiple valid approaches exist, the requirements are ambiguous, or you're unsure about intent — stop and clarify before proceeding.

### Iterative Steps

Prefer small, incremental work: propose a plan for non-trivial work, implement one piece at a time, and update the plan as steps complete. Never attempt large multi-file rewrites in a single pass.

---

## Agent Workflow & Learning Loop

After any non-trivial change, capture a short "what we learned" note in `docs/agent-log.md` with the decision, rationale, and any pitfalls encountered. If the change required research, affected multiple files, or involved trade-off decisions, document it.

### Decision & Context Capture

When a choice is non-obvious (trade-offs, API shape, component structure, UX pattern), record the decision in a short entry under `docs/decisions/`. Use the ADR (Architecture Decision Record) format:

```
# [Short Title]
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded | Deprecated

## Context
What prompted this decision.

## Decision
What we chose and why.

## Consequences
What changes as a result — both positive and negative.
```

Prefer descriptive commit messages and notes that explain _why_, not just _what_, to improve future agent context.

---

## Code Quality

### Quality Loop

Always leave the codebase slightly better than found: if you touch legacy code, make one scoped improvement (naming, extraction, test coverage) without re-architecting. If you see flaky tests or missing coverage in touched areas, add or repair one test or leave a clear `TODO` in the test file.

### Formatting

Run `pnpm format` once at the end of your task, after all code changes are complete. Aggregate formatting fixes rather than running after each individual edit to reduce noise and maintain focus on logic changes.

Available scripts:

- `pnpm format` — auto-fix formatting (Prettier)
- `pnpm format:check` — check without modifying (used in CI)
- `pnpm check` — run framework and type checks across workspaces
- `pnpm build` — build all workspaces

### Testing

Add tests with the first behavior that benefits from automated coverage. Astro pages and layouts are validated through framework checks and production builds until a dedicated test layer is justified. When modifying tested behavior, update its tests in the same change.

### TypeScript

All new code must be typed. No `any` unless explicitly justified in a comment. Web types live in `apps/web/src/types/`; generated Sanity types live with the application that generates them unless they become genuinely shared.

---

## Project Conventions

### File Structure

- **Astro application** -> `apps/web/`
- **Astro pages** -> `apps/web/src/pages/`
- **Astro components** -> `apps/web/src/components/*.astro`
- **Interactive islands** -> colocated with the web component that owns the behavior
- **Web types** -> `apps/web/src/types/`
- **Data and content config** -> `apps/web/src/data/`
- **Styles** -> `apps/web/src/styles/`
- **Web tests** -> colocated or under `apps/web/src/test/` when introduced
- **Sanity Studio** -> `apps/studio/` when introduced
- **Governance docs** -> `docs/`

### Styling

Use modern CSS, custom properties, and cascade layers as the default styling system. Add preprocessors or utility frameworks only when a concrete limitation justifies the dependency. Reserve inline styles for genuinely dynamic values that cannot be represented by classes or CSS custom properties.

### Interactive Islands

Prefer Astro and browser APIs. When a feature justifies a client framework, keep hydrated islands small and focused. Data fetching, routing, and static rendering remain in Astro unless a documented decision changes that boundary.

---

## Commit & Pull Request Guidelines

### Commit Messages

Use the conventional commits format:

```
<type>(<scope>): <description>

[optional body with detailed explanation of why, not just what]
```

**Types:** `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `perf`

**Scope** is the area of the codebase: `hero`, `bento`, `cms`, `chat`, `infra`, `ci`, etc.

**Examples:**

```
feat(profile): add social links card

Introduces the first content-backed card while preserving static rendering and
keyboard navigation.

fix(workspace): prevent tab reset when re-selecting the active app

The InteractiveWorkspace component was resetting selectedTab to 1 on every
app click, even when the same app was already selected. Added an early
return guard to preserve tab state during redundant selections.

docs(decisions): record Sanity content architecture
```

### Rules

- **Never reference AI tools, models, or agents in commits, PRs, or code comments.** No "Generated by Claude," "Copilot suggestion," "AI-assisted," or similar. The commit history should read as if a human wrote every line — because a human reviewed and approved every line.
- **Commit messages must explain the reasoning**, not just describe the diff. A reviewer reading only the commit log should understand _why_ each change was made.
- **One logical change per commit.** Don't bundle unrelated fixes. If formatting changes accompany a feature, they get their own commit (`style(workspace): format with prettier`).
- **PR descriptions** (when used) should include: what changed, why, how to test, and any follow-up work.

### Branch Naming

```
<type>/<short-description>
```

Examples: `feat/imessage-chat`, `fix/bento-mobile-overflow`, `docs/phase-0-governance`
