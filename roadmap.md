# Portfolio v3 Roadmap

This roadmap tracks the Astro, Sanity, and Vercel rebuild from foundation through launch. Detailed implementation steps and completion criteria live in `docs/plans/portfolio-v3-execution-plan.md`.

## Phase 0: Governance

- Maintain the active architecture decisions in `docs/decisions/`.
- Keep the roadmap and execution plan aligned with those decisions.
- Record non-trivial decisions and implementation lessons in `docs/agent-log.md`.

## Phase 1: Monorepo Foundation

- Create the pnpm and Turborepo workspace.
- Create a fresh Astro 7 application in `apps/web` and discard the legacy implementation.
- Pin Node and pnpm versions and establish root commands.
- Keep raw design-reference artifacts private and ignored.
- Verify the minimal application before adding integrations.

## Phase 2: Quality Baseline

- Add workspace formatting, typechecking, and build commands.
- Add linting and tests with the first code that benefits from them.
- Add GitHub Actions for pull requests and branch pushes.
- Ensure all quality checks run from a clean, frozen install.

## Phase 3: Design Foundation

- Use `docs/design/v3-reference.md` as the visual source of truth.
- Self-host approved Figtree files and define the design tokens.
- Establish CSS layers and build the responsive shell, navigation, ambient background, and base card primitive.
- Implement accessible focus and reduced-motion behavior with the initial components.

## Phase 4: Sanity Foundation

- Create a new Sanity project and production dataset.
- Scaffold Sanity Studio in `apps/studio`.
- Define profile, social-link, project, note, page, image, and SEO schemas.
- Generate TypeScript types from schemas and GROQ queries.
- Deploy Studio through Sanity and configure allowed origins.

## Phase 5: Profile Vertical Slice

- Add the typed Sanity client and profile query to `apps/web`.
- Build the profile and social-card experience from published Sanity content.
- Handle optional and unavailable content intentionally.
- Trigger a Vercel rebuild when relevant content is published.
- Validate the complete content-to-page workflow before expanding the schema usage.

## Phase 6: Portfolio Experience

- Add story, current-focus, inspiration, project, note, and contact cards incrementally.
- Add category filtering and theme selection with semantic, persistent controls.
- Use modern CSS and add styling dependencies only when a concrete limitation requires them.
- Implement responsive, keyboard-accessible, and reduced-motion behavior.
- Add client-side dependencies only for interactions that justify them.

## Phase 7: Content Experiences

- Build project indexes and case-study routes.
- Build note indexes and article routes.
- Add managed pages where a dedicated schema is unnecessary.
- Complete metadata, canonical URLs, sitemap, robots directives, and social previews.

## Phase 8: Vercel Delivery

- Connect `apps/web` to Vercel.
- Keep `master` as production and use `v3` and pull requests for previews.
- Configure development, preview, and production environment variables.
- Connect Sanity publish events to a Vercel deploy hook.
- Attach the production domain only after launch checks pass.

## Phase 9: Launch

- Seed and review production content.
- Complete accessibility, responsive, SEO, and performance audits.
- Verify Sanity publishing, preview deployments, and production rebuilds.
- Merge `v3` into `master` and promote the new site.

## Future Application Work

- Authentication and protected experiences.
- Tags, filtering, and full-text search.
- Managed PostgreSQL and pgvector for semantic retrieval.
- RAG and content-assistance workflows.
- Dedicated workers for ingestion and other long-running jobs.
- Analytics and application observability.

Provider choices for future services remain deferred until concrete requirements exist.
