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

Prefer descriptive commit messages and notes that explain *why*, not just *what*, to improve future agent context.

---

## Code Quality

### Quality Loop

Always leave the codebase slightly better than found: if you touch legacy code, make one scoped improvement (naming, extraction, test coverage) without re-architecting. If you see flaky tests or missing coverage in touched areas, add or repair one test or leave a clear `TODO` in the test file.

### Formatting

Run `pnpm format` once at the end of your task, after all code changes are complete. Aggregate formatting fixes rather than running after each individual edit to reduce noise and maintain focus on logic changes.

Available scripts:
- `pnpm format` — auto-fix formatting (Prettier)
- `pnpm format:check` — check without modifying (used in CI)
- `pnpm lint` — run ESLint
- `pnpm lint:fix` — auto-fix lint issues
- `pnpm test` — run vitest

### Testing

All new React components must include at least one test in `src/test/`. Astro pages and layouts are tested via build verification. If you modify an existing component, check whether its tests still pass and update them if behavior changed.

### TypeScript

All new code must be typed. No `any` unless explicitly justified in a comment. Shared types live in `src/types/`.

---

## Project Conventions

### File Structure

- **Astro pages** → `src/pages/`
- **Astro components** → `src/components/*.astro`
- **React islands** → `src/components/*.tsx`
- **Shared types** → `src/types/`
- **Data / content config** → `src/data/`
- **Styles** → `src/styles/` (SCSS + Tailwind)
- **Tests** → `src/test/`
- **Governance docs** → `docs/` (ADRs, agent log)

### Styling

Use Tailwind utility classes as the default. Extract to SCSS only when Tailwind cannot express the pattern (complex animations, pseudo-element tricks, deeply nested selectors). Never mix inline `style` attributes with Tailwind classes on the same element.

### React Islands

React components are used as Astro islands (`client:load`, `client:visible`, etc.) for interactive features. Keep islands small and focused — heavy lifting (data fetching, routing) stays in Astro.

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
feat(chat): add iMessage-style chat bubble component with typing indicator

Implements the core message bubble layout with sender/receiver alignment,
timestamp display, and an animated typing indicator using Framer Motion.
Bubbles support both text and rich content blocks for future extensibility.

fix(workspace): prevent tab reset when re-selecting the active app

The InteractiveWorkspace component was resetting selectedTab to 1 on every
app click, even when the same app was already selected. Added an early
return guard to preserve tab state during redundant selections.

docs(decisions): record Payload over Sanity migration rationale
```

### Rules

- **Never reference AI tools, models, or agents in commits, PRs, or code comments.** No "Generated by Claude," "Copilot suggestion," "AI-assisted," or similar. The commit history should read as if a human wrote every line — because a human reviewed and approved every line.
- **Commit messages must explain the reasoning**, not just describe the diff. A reviewer reading only the commit log should understand *why* each change was made.
- **One logical change per commit.** Don't bundle unrelated fixes. If formatting changes accompany a feature, they get their own commit (`style(workspace): format with prettier`).
- **PR descriptions** (when used) should include: what changed, why, how to test, and any follow-up work.

### Branch Naming

```
<type>/<short-description>
```

Examples: `feat/imessage-chat`, `fix/bento-mobile-overflow`, `docs/phase-0-governance`