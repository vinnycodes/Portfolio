# Portfolio v3 Execution Plan

## Objective

Build Portfolio v3 from a clean Astro foundation in a pnpm and Turborepo monorepo. Keep the public experience static by default, add dependencies only for implemented features, and preserve a clear path to Sanity, Vercel Functions, managed data, and background workers.

## Architecture

```text
/
├── apps/
│   └── web/       # Astro 7, deployed to Vercel
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

- **Web:** Astro 7 with no client framework by default.
- **Styles:** Modern CSS and custom properties; add tooling only when justified.
- **Content:** Sanity and `apps/studio` are introduced during the content phase.
- **Hosting:** Vercel provides previews, production delivery, and bounded server functions.
- **Database:** Managed PostgreSQL with pgvector when application or retrieval features require it.
- **Workers:** A dedicated worker platform or DigitalOcean only for long-running workloads.
- **Rendering:** Static generation by default; add the Vercel adapter with the first on-demand route.

## Branch And Deployment Strategy

- Keep `master` as the production branch.
- Use `v3` for active rebuild work and Vercel preview deployments.
- Attach the production domain only after launch readiness is confirmed.
- Merge `v3` into `master` to promote the rebuild.
- Let Vercel's Git integration own deployment; CI owns validation.

## Phase 1: Clean Foundation

1. Remove the legacy application and dependency graph.
2. Create a fresh Astro 7 application under `apps/web`.
3. Pin Node 24 and pnpm 12.6.0.
4. Add Turborepo and root commands for development, checking, building, previewing, and formatting.
5. Keep raw design exports private and ignored.
6. Regenerate the lockfile from the new manifests.

### Completion Criteria

- `pnpm install --frozen-lockfile` succeeds from the repository root.
- Turbo discovers and validates `apps/web`.
- The fresh page builds without legacy framework or styling dependencies.
- The tracked repository contains no generated design export.

## Phase 2: Quality Baseline

1. Add GitHub Actions for frozen installation, formatting, Astro checks, and production builds.
2. Add linting when project code extends beyond the minimal scaffold.
3. Add automated tests with the first meaningful interactive behavior.
4. Keep quality commands workspace-aware and runnable from the root.

### Completion Criteria

- Every pull request runs the complete applicable quality pipeline.
- No configured command depends on a missing package or placeholder script.

## Phase 3: Design Foundation

1. Use `docs/design/v3-reference.md` as the visual source of truth.
2. Self-host approved Figtree files and define typography, color, spacing, radius, shadow, and motion tokens.
3. Establish CSS layers for reset, tokens, global rules, components, and utilities.
4. Build the responsive shell, navigation, ambient background, and base card primitive.
5. Implement reduced-motion behavior alongside motion, not afterward.

### Completion Criteria

- Tokens and base components reproduce the approved visual language without generated code.
- Mobile and desktop shells are accessible and stable.
- No styling dependency has been added without an implemented need.

## Phase 4: Sanity Foundation

1. Create a new Sanity project and production dataset.
2. Scaffold Sanity Studio in `apps/studio`.
3. Define schemas for site settings, profile information, social links, projects, notes, pages, images, and SEO.
4. Configure schema extraction and generated TypeScript types.
5. Configure local, Vercel preview, and production CORS origins.
6. Deploy Studio through Sanity.

### Environment Variables

```text
# apps/web
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=
PUBLIC_SANITY_API_VERSION=

# Add only with protected server-side draft access
SANITY_API_READ_TOKEN=

# apps/studio
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
SANITY_STUDIO_PREVIEW_URL=
```

Commit example environment files, never credentials.

## Phase 5: Profile Vertical Slice

1. Add the typed Sanity client and colocated GROQ profile query.
2. Build the profile and social-link cards from published content.
3. Handle optional and unavailable content intentionally.
4. Add a Sanity publish webhook that triggers a Vercel rebuild.
5. Validate the complete content-to-page workflow before expanding schema usage.

### Completion Criteria

- Published profile changes appear after a successful rebuild.
- Queries and returned data are type-checked.
- Missing optional content produces intentional states rather than build failures.

## Phase 6: Portfolio Experience

1. Add story, current-focus, inspiration, project, note, and contact cards incrementally.
2. Implement category filtering with semantic controls and predictable focus behavior.
3. Add theme selection and persist user preference.
4. Add approved ambient, intro, tilt, and zoom effects only when they preserve performance and reduced-motion behavior.
5. Add a client UI integration only if browser APIs no longer keep the interaction maintainable.

### Completion Criteria

- The implementation matches the approved v3 direction without importing generated source.
- Keyboard, pointer, and reduced-motion experiences are complete.
- Representative mobile and desktop layouts have no overflow or unusable states.

## Phase 7: Content Experiences

1. Build project indexes and case-study routes.
2. Build note indexes and article routes.
3. Add managed pages where a dedicated schema is unnecessary.
4. Complete metadata, canonical URLs, sitemap, robots directives, and social previews.

## Phase 8: Vercel Delivery

1. Connect `apps/web` to Vercel.
2. Keep `master` as production and enable previews for `v3` and pull requests.
3. Add environment variables with development, preview, and production scope.
4. Connect Sanity publish events to a Vercel deploy hook.
5. Attach the custom domain only after launch QA passes.

## Phase 9: Launch Verification

1. Run formatting, framework checks, tests where present, and production builds across the monorepo.
2. Verify Vercel preview and production deployment behavior.
3. Verify Sanity publishing and rebuild hooks.
4. Audit responsive behavior, accessibility, keyboard navigation, and reduced motion.
5. Validate metadata, canonical URLs, sitemap, robots directives, and social previews.
6. Measure Core Web Vitals and fix avoidable regressions.
7. Merge `v3` into `master` and attach the production domain.

## Future Application Work

Add dynamic infrastructure only when a feature requires it.

1. Install `@astrojs/vercel` with the first server-rendered route or endpoint.
2. Run bounded authentication, orchestration, and chat requests in Vercel Functions.
3. Add managed PostgreSQL and pgvector for durable application data or semantic retrieval.
4. Trigger content ingestion from protected Sanity webhooks.
5. Run long embedding, indexing, or scheduled jobs on a dedicated worker service.
6. Do not provision an idle server before persistent workloads justify it.

## Deferred Decisions

- Client UI framework
- Authentication provider
- Managed PostgreSQL provider
- AI model and embedding provider
- Background worker platform
- Realtime transport

Choose each dependency or provider when its first concrete feature establishes the requirements.
