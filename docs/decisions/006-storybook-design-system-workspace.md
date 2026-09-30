# 006 - Storybook Design-System Workspace

**Date:** 2026-09-30
**Status:** Accepted

## Context

Portfolio v3 needs a granular place to inspect design foundations, semantic actions, responsive composition, and accessibility behavior before content expansion. Static documentation alone can drift from production CSS and cannot exercise focus or browser behavior.

## Decision

Use Storybook 10 with the community-maintained Astro framework as the executable design-system workspace.

- Import the production global stylesheet and render production Astro components directly.
- Organize the catalog into foundations, actions, navigation, surfaces, layout, and patterns.
- Document tokens through previews that consume the actual CSS custom properties.
- Keep buttons, action links, text links, and icon buttons semantically separate.
- Run every component story through Vitest and Playwright Chromium in light and dark themes.
- Configure the accessibility addon so Axe violations fail the browser suite.
- Keep generic product components out of scope until portfolio behavior requires them.

The adapter remains acceptable while it supports the active Astro and Storybook majors, static Storybook builds, Astro slots, and Vitest browser stories. Failure in any of those areas triggers replacement or a move to framework-native documentation.

## Consequences

### Positive

- Documentation, tests, and the production site share components and tokens.
- Responsive and accessibility regressions are caught before deployment.
- The catalog can grow with portfolio needs without becoming a speculative UI library.

### Negative

- Storybook introduces development-only React dependencies and a larger toolchain, although none ship in the Astro production bundle.
- Testing both themes increases CI installation and execution time.
- The community adapter requires explicit compatibility monitoring during upgrades.
