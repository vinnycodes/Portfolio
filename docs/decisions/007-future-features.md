# 007 — Future Features: AI/Embeddings + Tags

**Date:** 2025-02-09
**Status:** Deferred

## Context

The v3 launch focuses on design, CMS integration, and deployment. Advanced discovery and AI features are valuable, but they add scope and operational complexity. These features are deferred until the core experience is stable.

## Decision

Defer AI/embedding functionality and tags/search to a future phase. Document the intended direction now to avoid re-litigating core design later.

### AI / Embeddings (Deferred)

**Goal:** enable semantic search, related content, and future AI-assisted notes (summaries, SEO, and recommendations).

**Proposed schema (Postgres + pgvector):**

| Column | Type | Notes |
|--------|------|-------|
| `id` | serial | Primary key |
| `contentType` | text | `note` or `project` |
| `contentId` | integer | Foreign key to the Payload collection |
| `chunkIndex` | integer | Position within the document (0-indexed) |
| `chunkText` | text | The raw text chunk |
| `embedding` | vector(1536) | pgvector column, dimensionality matches embedding model |
| `createdAt` | timestamp | Auto |

**Pipeline concept:**
- Payload `afterChange` hook on Notes and Projects.
- Extract plain text from Lexical JSON, chunk to ~400–512 tokens with overlap.
- Generate embeddings (model TBD) and upsert rows.
- Remove embeddings on unpublish.

**AI-generation schema candidates:**
- `aiSummary` (text) — optional AI-generated excerpt.
- `aiKeywords` (array of text) — suggested tags/keywords.
- `aiTitle` (text) — optional SEO title suggestion.

### Tags (Deferred)

**Definition:** a lightweight taxonomy applied to Notes and Projects to enable filtering, grouping, and related content.

**Pros:**
- Improves discoverability on `/notes`.
- Enables filtered lists and related content sections.
- Provides a simple way to group content without new pages.

**Cons:**
- Adds editorial overhead (consistent tagging takes effort).
- Requires UI/UX for filtering and empty-state handling.
- Increases schema complexity and future migration effort.

## Consequences

**Positive:**
- Keeps v3 scope focused on design + CMS + deployment.
- Avoids premature optimization of AI features before content volume grows.

**Negative:**
- No semantic search or related content at launch.
- Tags and filtering are unavailable until a future iteration.
