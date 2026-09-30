# Portfolio

Portfolio v3 is an Astro monorepo managed with pnpm and Turborepo. The static site and its Storybook design-system workspace share the same tokens and production components; integrations are added only when a concrete feature requires them.

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

| Command                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `pnpm install`         | Install workspace dependencies           |
| `pnpm dev`             | Start persistent development tasks       |
| `pnpm build`           | Build all applications                   |
| `pnpm check`           | Run workspace type and framework checks  |
| `pnpm lint`            | Lint Astro, TypeScript, and stories      |
| `pnpm test`            | Test every story in Chromium             |
| `pnpm storybook`       | Start the design-system workspace        |
| `pnpm storybook:build` | Build the static design-system site      |
| `pnpm preview`         | Preview the production web build         |
| `pnpm format`          | Format tracked source and documentation  |
| `pnpm format:check`    | Check formatting without modifying files |

Architecture decisions live in `docs/decisions/`. The staged rebuild plan lives in `docs/plans/portfolio-v3-execution-plan.md`.

Story tests run in both light and dark themes. Install the local browser once with `pnpm --filter @portfolio/web exec playwright install chromium`; CI installs Chromium automatically.
