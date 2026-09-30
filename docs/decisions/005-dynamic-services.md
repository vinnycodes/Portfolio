# 005 - Dynamic Services

**Date:** 2026-09-28
**Status:** Deferred

## Context

Authentication, semantic search, RAG, and background processing are valuable future capabilities, but none are required to launch the portfolio. Selecting providers or provisioning infrastructure now would add cost and constrain features before their requirements are known.

## Decision

Defer provider selection and implementation for authentication, PostgreSQL, AI models, embeddings, realtime transport, and background workers.

When semantic retrieval is implemented:

1. Treat Sanity as the source of truth for portfolio content.
2. Send publish and unpublish events to a protected ingestion endpoint or job trigger.
3. Process Portable Text into stable text chunks in an asynchronous worker.
4. Generate embeddings with the selected model.
5. Upsert derived chunks and vectors into managed PostgreSQL with pgvector.
6. Remove derived records when source content is unpublished or deleted.

Store Sanity document IDs as strings and record the document type, revision, chunk index, source text, and embedding metadata. Choose vector dimensions only after choosing the embedding model.

Use Vercel Functions for short-lived orchestration and query requests. Use a dedicated worker service or DigitalOcean only for workloads that require longer execution, persistent processes, or custom infrastructure.

Make each provider decision in a new ADR when the first concrete feature establishes its security, latency, scaling, and cost requirements.

## Consequences

### Positive

- The initial release avoids unused infrastructure and premature vendor choices.
- Sanity content and derived vector data have a clear ownership boundary.
- Future services can be selected against measured requirements.

### Negative

- Advanced search and AI features are unavailable at launch.
- Future implementation will introduce additional services and operational boundaries.
- Webhook processing will need idempotency, retries, observability, and secret rotation.
