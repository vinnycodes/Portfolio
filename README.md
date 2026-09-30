# Portfolio

Portfolio v3 is an Astro monorepo managed with pnpm and Turborepo. The implementation starts from a minimal static foundation; integrations are added only when a concrete feature requires them.

## Requirements

- Node.js 24
- pnpm 12.6.0

## Workspace

```text
apps/
└── web/    # Astro site
```

Sanity Studio will be added under `apps/studio` during the content-platform phase.

## Commands

Run commands from the repository root:

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `pnpm install`      | Install workspace dependencies           |
| `pnpm dev`          | Start persistent development tasks       |
| `pnpm build`        | Build all applications                   |
| `pnpm check`        | Run workspace type and framework checks  |
| `pnpm preview`      | Preview the production web build         |
| `pnpm format`       | Format tracked source and documentation  |
| `pnpm format:check` | Check formatting without modifying files |

Architecture decisions live in `docs/decisions/`. The staged rebuild plan lives in `docs/plans/portfolio-v3-execution-plan.md`.
