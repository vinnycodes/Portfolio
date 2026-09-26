# Portfolio v3 Execution Plan

## Objective

Rebuild the portfolio as a pnpm and Turborepo monorepo using Astro, React, Sanity, and Vercel. Keep the public experience static by default while preserving a clear path for authentication, APIs, RAG, and background workers.

## Architecture

```text
/
├── apps/
│   ├── web/       # Astro 5 + React, deployed to Vercel
│   └── studio/    # Sanity Studio, deployed to Sanity
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

- **Web:** Astro with small React islands where client interactivity is required.
- **Content:** Sanity for structured content, assets, editorial workflows, and Studio hosting.
- **Hosting:** Vercel for the web application, previews, functions, and production deployment.
- **Database:** Managed PostgreSQL with pgvector when application or RAG features require it.
- **Workers:** DigitalOcean or a dedicated worker platform only when long-running or persistent workloads exist.
- **Rendering:** Static generation by default. Add the Vercel Astro adapter when the first on-demand route or API endpoint is implemented.

## Branch And Deployment Strategy

- Keep `master` as the production branch.
- Use `v3` for active rebuild work and Vercel preview deployments.
- Do not attach the production domain to the v3 deployment until launch readiness is confirmed.
- Merge `v3` into `master` to promote the rebuild to production.
- Let Vercel's Git integration handle web deployments; do not add an SSH-based deployment pipeline.

## Phase 1: Governance Alignment

1. Mark the Payload, Docker, and DigitalOcean decisions as superseded.
2. Record the Astro, Sanity, and Vercel architecture in new ADRs.
3. Update `roadmap.md` to match the new stack and execution order.
4. Update the future-features ADR so RAG ingestion uses Sanity webhooks and a worker rather than Payload hooks.
5. Record the architecture change and its rationale in `docs/agent-log.md`.

### Completion Criteria

- No accepted ADR instructs contributors to build the obsolete Payload/Droplet architecture.
- The roadmap and ADRs describe the same stack and deployment model.

## Phase 2: Monorepo Foundation

1. Replace the placeholder `pnpm-workspace.yaml` with workspace package patterns.
2. Add Turborepo and root-level workspace scripts.
3. Pin supported Node and pnpm versions.
4. Move the current Astro application into `apps/web` without redesigning it during the move.
5. Move Astro configuration, public assets, tests, and web-specific dependencies with the application.
6. Regenerate the lockfile and verify the relocated application builds.
7. Ignore the raw `Vinnycodes_bento_grid_redesign/` bundle so generated and potentially restricted assets cannot enter Git.

### Root Commands

```text
pnpm dev
pnpm build
pnpm check
pnpm lint
pnpm test
pnpm format
pnpm format:check
```

### Completion Criteria

- `pnpm install --frozen-lockfile` succeeds from the repository root.
- Turbo can build and validate every workspace.
- The relocated web application renders with no structural migration regressions.

## Phase 3: Quality Baseline

1. Add `astro check` and CI-safe test commands.
2. Scope ESLint and Prettier correctly for the monorepo.
3. Add initial tests for existing interactive React behavior.
4. Add GitHub Actions that run formatting checks, linting, typechecking, tests, and production builds.
5. Remove or correct scripts whose required dependencies are missing.

### Completion Criteria

- The complete quality pipeline passes locally and in GitHub Actions.
- Pull requests cannot merge with type, lint, test, or build failures.

## Phase 4: Sanity Foundation

1. Create a new Sanity project and production dataset.
2. Scaffold Sanity Studio in `apps/studio`.
3. Define schemas for:
   - Site settings and profile information
   - Social links
   - Projects and case studies
   - Notes
   - Managed pages
4. Configure schema extraction and generated TypeScript types.
5. Configure local, Vercel preview, and production CORS origins.
6. Deploy Studio through Sanity.

### Environment Variables

```text
# apps/web
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
PUBLIC_SANITY_API_VERSION=

# Add only when draft access or protected server routes exist
SANITY_API_READ_TOKEN=

# apps/studio
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
SANITY_STUDIO_PREVIEW_URL=
```

Commit example environment files, but never commit tokens or credentials.

### Completion Criteria

- Studio runs locally and builds for production.
- Schemas are validated and generated types are current.
- Content can be created and published in the production dataset.

## Phase 5: Sanity Web Integration

1. Add a typed Sanity client to `apps/web`.
2. Define colocated, typed GROQ queries.
3. Build the profile and social-card vertical slice first.
4. Add projects, notes, and pages incrementally after the first slice is verified.
5. Use static generation for published content.
6. Use fixtures only as a development fallback, not as a second production content source.
7. Add a Sanity publish webhook that invokes a Vercel deploy hook so static pages stay current.

### Completion Criteria

- Published profile changes appear after a successful Vercel rebuild.
- Missing optional content produces intentional empty states rather than build failures.
- Sanity queries and returned data are type-checked.

## Phase 6: Interface Rebuild

1. Treat `Vinny Codes v3.dc.html` as the canonical visual reference.
2. Translate the reference into maintainable Astro and React components rather than copying generated code.
3. Implement the design system with SCSS as the primary styling layer and Tailwind 4 as a supplemental utility layer.
4. Self-host Figtree and define typography, color, spacing, radius, shadow, and motion tokens.
5. Build responsive layouts for mobile and desktop.
6. Add accessible semantics, keyboard behavior, focus states, and reduced-motion support.
7. Reuse only reviewed and approved assets, including the historical portfolio avatar where appropriate.
8. Remove obsolete starter files, duplicated styles, placeholders, and inaccessible controls as their replacements land.

### Completion Criteria

- The implementation matches the approved v3 visual direction without depending on generated source files.
- Core experiences work with keyboard navigation and reduced motion.
- Mobile and desktop layouts have no overflow or unusable interaction states.

## Phase 7: Vercel Configuration

1. Create a Vercel project connected to the repository.
2. Configure the web workspace as the deployment target.
3. Keep `master` as the production branch and enable previews for `v3` and pull requests.
4. Add public Sanity configuration to Vercel environments.
5. Keep secrets server-only and scoped to environments that require them.
6. Configure Sanity publish events to trigger a production rebuild.
7. Attach the custom domain only after launch QA passes.

### Completion Criteria

- Pull requests receive working preview URLs.
- A merge to `master` produces a production deployment.
- Failed builds do not replace the last healthy production deployment.

## Phase 8: Dynamic Application Features

Add dynamic infrastructure only when a feature requires it.

1. Install `@astrojs/vercel` when the first server-rendered route or API endpoint is introduced.
2. Run bounded request and response work, including authentication callbacks and chat requests, in Vercel Functions.
3. Add managed PostgreSQL and pgvector when durable application data or semantic retrieval is implemented.
4. Keep database credentials server-only.
5. Trigger content ingestion from Sanity webhooks.
6. Run long embedding, indexing, or scheduled workloads on a dedicated worker platform or DigitalOcean service.
7. Do not run an idle Droplet before persistent workloads justify its operational cost.

## Phase 9: Launch Verification

1. Run formatting, linting, typechecking, tests, and production builds across the monorepo.
2. Verify Vercel preview and production deployment behavior.
3. Verify Sanity publishing and rebuild hooks.
4. Test responsive behavior on representative mobile and desktop viewports.
5. Audit accessibility, keyboard navigation, focus visibility, and reduced motion.
6. Validate metadata, canonical URLs, sitemap, robots directives, and social previews.
7. Measure Core Web Vitals and address avoidable performance regressions.
8. Verify error and empty states for unavailable content and external services.
9. Merge `v3` into `master` and attach the production domain.

## Deferred Decisions

- Authentication provider
- Managed PostgreSQL provider
- AI model and embedding provider
- Background worker platform
- Realtime transport, if a future feature requires persistent connections

These choices should be made when their first concrete feature is designed, not during the static portfolio foundation.

## Out Of Scope For The Initial Milestone

- Running a DigitalOcean Droplet
- Self-hosting Sanity or PostgreSQL
- Authentication
- RAG and semantic search
- Long-running background workers
- Draft preview and visual editing
- Realtime application features

The initial milestone is complete when the monorepo foundation, Sanity profile integration, first redesigned vertical slice, CI pipeline, and Vercel preview deployment all work end to end.
