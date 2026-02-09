# Roadmap

This document defines the planned work from governance through launch for the Portfolio v3 rebuild (Astro + Payload + DigitalOcean + Docker).

## Phase 0 — Governance
- Add `agents.md` with workflow + AI usage rules.
- Add `decisions/` with ADRs for architecture, design, hosting, content model, deploy.

## Phase 1 — Design-First (Static Slice)
- Define design tokens (type scale, color system, spacing, radii, shadows, motion).
- Build iOS-style bento layout slice: nav, hero, bento cards, notes list card.
- Validate on mobile and desktop before data wiring.

## Phase 2 — Architecture
- Formalize content model (Notes, Projects, Pages) in ADRs.
- Define rendering strategy (build-time fetch for published content + preview for drafts).

## Phase 3 — CMS (Payload)
- Scaffold Payload app in `cms/`.
- Configure Postgres adapter, auth, and Notes collection (rich text blocks).
- Enable drafts + scheduled publishing.

## Phase 4 — Astro Integration
- Add `/notes` and `/notes/[slug]`.
- Fetch published notes from Payload at build time.
- (Optional) Draft preview path for authenticated users.

## Phase 5 — Infrastructure
- Dockerize Astro + Payload + Postgres.
- Add Nginx reverse proxy with HTTPS routing.
- Define environment variable templates.

## Phase 6 — CI/CD
- GitHub Actions for lint/build/test.
- Deploy pipeline to DigitalOcean.

## Phase 7 — Content + Launch
- Seed Notes and Projects.
- Final QA: accessibility, SEO, performance.
- Launch.

## Future Enhancements
- Tags and search for Notes.
- Full projects index + case study templates.
- Analytics and performance monitoring.
