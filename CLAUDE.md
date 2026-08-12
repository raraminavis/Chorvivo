# CLAUDE.md — Chorvivo

Claude Code reads this file at the start of every session. It is the project constitution. Follow it.

## What Chorvivo is
A creative workspace for commercial choreographers where capturing a routine *as it develops* automatically produces a timestamped, tamper-evident creation record and a U.S. Copyright Office–ready registration package.

**Core product philosophy (never violate):** Protection is a BYPRODUCT of the creative workflow. Never design or build a separate "filing step" the user must remember to do. If a feature adds friction to capture, it is wrong.

## MVP scope — build ONLY these 7 features
1. Auth (sign up, log in, password reset) — Supabase Auth
2. Works (create/name/manage a choreography project)
3. Capture (upload or record video clips into a Work, auto-dated)
4. Annotate (timestamped notes/markers on a clip timeline)
5. Creation log (append-only, tamper-evident record of every action)
6. Registration package export (video + description + creation log → PDF/zip)
7. Works library (all Works, status: draft / ready to file / filed)

Anything not on this list (reference boards, formation sketching, music sync, real-time collaboration, marketplace) is OUT OF SCOPE. If asked to build something off-list, flag it and ask for confirmation first.

## Tech stack (do not deviate without discussion)
- Frontend: Next.js (App Router) + React + TypeScript + Tailwind CSS
- Backend: Supabase (Postgres, Auth, Storage)
- Hosting: Vercel
- Video: HTML5 video player; FFmpeg only if server-side processing becomes necessary
- Testing: Vitest + React Testing Library; Playwright for E2E on critical flows
- Error monitoring: Sentry

## Conventions
- TypeScript strict mode. No `any` unless justified in a comment.
- Components: functional, hooks only. One component per file. Colocate small helpers.
- All Supabase access through `/lib/supabase/` client helpers — never inline raw clients in components.
- Database changes ONLY via migration files in `/supabase/migrations/`. Never mutate schema ad hoc.
- Every feature PR includes: implementation + at least one test + a one-line entry in `docs/CHANGELOG.md`.
- Follow `docs/DESIGN_SYSTEM.md` for all UI. Never invent new colors/spacing/type sizes.
- Follow `docs/PRD.md` as the spec of record. If the PRD is ambiguous, ask; don't guess silently.

## PROTECTED ZONES — extra care required
These areas are the legal core of the product. For any change here:
1. Propose the approach and wait for explicit approval BEFORE writing code.
2. Never weaken append-only guarantees, hash chaining, or timestamp integrity.
3. Always run the evidence-guardian agent's checklist after changes.

Protected paths (once they exist):
- `/lib/evidence/` — creation log, hash chain, timestamping
- `/lib/export/` — registration package builder
- `/supabase/migrations/*creation_log*` — log table schema
- Anything touching auth/session security

## Creation log integrity rules
- The `creation_log` table is APPEND-ONLY. No UPDATE or DELETE, enforced at the database level (RLS + revoked privileges + trigger), not just in app code.
- Each entry: `id, work_id, user_id, action_type, payload (jsonb), created_at (server time, never client time), prev_hash, entry_hash`.
- `entry_hash = SHA-256(prev_hash || canonical_json(entry))` — a tamper-evident chain per Work.
- Timestamps are server-generated (`now()` in Postgres). Client-supplied timestamps are metadata only, never the timestamp of record.

## Workflow
- Work on feature branches; open a PR for every change; never push to main directly.
- Before marking any task complete: run tests, run the code-reviewer agent, summarize what changed and why in the PR description.
- When a task is large, plan first (list steps), get a nod, then execute.

## The human
Mindy is the founder/orchestrator. She reads code but does not write it. Explain non-obvious decisions in plain English in PR descriptions. Surface trade-offs; don't bury them.
