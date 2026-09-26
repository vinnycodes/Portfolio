# 003 — Hosting: DigitalOcean + Docker + Nginx

**Date:** 2025-02-09
**Status:** Accepted

## Context

The portfolio needs hosting that supports multiple services (Astro site, Payload CMS, Postgres with pgvector), provides full infrastructure control for AI features, and keeps costs predictable. The main alternatives considered were Vercel/Netlify (managed), a VPS provider (DigitalOcean, Hetzner, Railway), or AWS/GCP (cloud-native).

## Decision

**DigitalOcean Droplet** running **Docker Compose** with an **Nginx** reverse proxy.

The Docker Compose stack:

| Service | Role | Port |
|---------|------|------|
| `astro` | Static site + SSR API routes (chatbot endpoint) | 4321 |
| `payload` | Headless CMS admin + API | 3000 |
| `postgres` | Database (content + pgvector embeddings) | 5432 |
| `nginx` | Reverse proxy, SSL termination, routing | 80/443 |

**Nginx routing:**
- `vinnycodes.com` → Astro container
- `vinnycodes.com/admin` → Payload container (or a subdomain like `cms.vinnycodes.com`)
- SSL via Let's Encrypt (certbot auto-renewal)

**Recommended Droplet:** 4GB RAM / 2 vCPUs ($24/month). Postgres with pgvector and Payload need more headroom than a basic $6 droplet, and this leaves room for the embedding generation and chatbot API route without swapping.

**Why not Vercel/Netlify:** Astro deploys beautifully to Vercel, but Payload CMS needs a persistent server and database. Splitting the stack (Vercel for Astro + separate managed Postgres + separate hosting for Payload) adds complexity, multiple billing surfaces, and makes the AI pipeline harder to orchestrate. A single Droplet keeps everything co-located.

**Why not AWS/GCP:** Overkill for a portfolio. ECS/Cloud Run + RDS + load balancer would cost more, take longer to configure, and provide capabilities (auto-scaling, multi-region) that a personal site doesn't need.

## Consequences

**Positive:**
- Predictable monthly cost ($24/month covers everything).
- Full control over the stack — can install pgvector, tune Postgres, add new services.
- Docker Compose makes local development mirror production exactly.
- No cold starts — the chatbot API route is always warm.

**Negative:**
- We own uptime, backups, and security patching. Need automated Postgres backups (pg_dump cron or DigitalOcean managed DB as a future upgrade if manual backups become a burden).
- No auto-scaling — a traffic spike (e.g., portfolio goes viral on Twitter) could overwhelm a single Droplet. Mitigation: Nginx caching for static assets, and Astro's static pages are lightweight.
- SSL setup is manual (certbot) vs. automatic on Vercel/Netlify.
- SSH key management and firewall rules are our responsibility.
