# Chorvivo MVP — Product Requirements Document

Status: DRAFT v0.9 — Mindy to review sections marked ⚠️ DECISION before Sprint 1.

## Product thesis
Commercial choreographers skip copyright registration because of behavioral friction, not ignorance. Chorvivo makes the creation record — and a Copyright-Office-ready registration package — the automatic byproduct of the tool they use to build the routine. Protection is emergent, never a separate step.

## Target user
Freelance/early-mid commercial choreographers (music video, K-pop, studio), 2–8 years experience, NYC/LA, growing credits, no management or legal infrastructure. Mobile-heavy; work happens in studios.

## Non-goals (MVP)
Reference boards, formation sketching, music timeline sync, real-time collaboration, marketplace, mobile native apps, motion capture, similarity detection. Web app only (mobile-responsive).

---

## F1 — Auth
**User sees:** Sign-up (email + password), log-in, forgot-password screens.
**Behavior:** Supabase Auth. Email confirmation on. Session persists. Password reset via email link.
**Edge cases:** Duplicate email → clear inline error. Unconfirmed email login attempt → resend-confirmation prompt.
**Log events:** none (auth is not creative work).

## F2 — Works
**User sees:** "New Work" button in library; modal asks for title (required) and optional one-line description; Work detail page with clips list, annotations, and a status pill.
**Behavior:** Create, rename, archive (no hard delete in MVP — archives hide from default view). Status: `draft → ready_to_file → filed` (user-set, with `filed` prompting an optional filing-confirmation note).
**Edge cases:** Empty title blocked. Archiving asks for confirmation and explains the Work's log is preserved.
**Log events:** `work_created`, `work_renamed`, `work_status_changed`, `work_archived`.

## F3 — Capture
**User sees:** On a Work page, a prominent "Add clip" action → choose file upload or in-browser camera recording. Upload shows progress. Clips appear as a reverse-chronological list of cards with thumbnail, duration, capture date, and optional label.
**Behavior:** Accept mp4/mov/webm up to ⚠️ DECISION: max file size (suggest 2 GB) . Store in Supabase Storage under the Work. Server records receipt time. Extract duration + thumbnail client-side on upload.
**Edge cases:** Network drop mid-upload → resumable or clear retry, never a silent fail. Unsupported format → friendly error naming supported formats. Slow studio Wi-Fi is the norm — design for it.
**Log events:** `clip_added` (payload: file hash, duration, size, label), `clip_labeled`, `clip_archived`.
**Note:** hash the file client-side (SHA-256) and include in the log entry — this binds the log to the exact video bytes.

## F4 — Annotate
**User sees:** Clip view: video player with a marker rail under the scrubber. Tap "add note" (or press N) → note pinned to current timestamp. Notes list beside/below player, click note → seek.
**Behavior:** Notes: text up to 500 chars. Edit/delete allowed on the note itself BUT every version is preserved in the creation log (edits log the new text; the log never loses the old one).
**Edge cases:** Notes at identical timestamps allowed, ordered by creation. Mobile: rail must be usable with thumbs.
**Log events:** `note_added`, `note_edited`, `note_deleted` (log records content at each event).

## F5 — Creation log (THE CROWN JEWEL — protected zone)
**User sees:** On each Work: a "Creation record" tab — a clean, read-only vertical timeline of every logged event with date/time. A small "verified" indicator when the hash chain checks out. This is a trust surface: it should look calm, precise, and slightly official — the one place a legal aesthetic note is welcome.
**Behavior:** Per CLAUDE.md integrity rules — append-only at DB level, server timestamps, SHA-256 hash chain per Work, chain-verification function runs on view and on export.
⚠️ DECISION: external timestamp anchoring (e.g., OpenTimestamps) in MVP or fast-follow? Recommend: design the schema for it now (nullable `anchor_proof` column), implement in fast-follow after lawyer consult.
**Edge cases:** Chain verification failure → red banner, block export, log to Sentry as critical.
**Log events:** self-referential (the log records itself).

## F6 — Registration package export
**User sees:** "Prepare registration package" button on a Work → guided 3-step flow: (1) pick the definitive video, (2) write/auto-draft the work description (title, date range from log, creators), (3) review → "Export package". Output: a zip containing the video file, a PDF (cover sheet + description + full creation record + verification info incl. hashes), and a plain-text log copy. Followed by a step-by-step eCO filing guide screen (link out to https://eco.copyright.gov with instructions — we assist the filing, we do not file).
**Behavior:** Export is deterministic. Exporting logs `package_exported`. Status nudged to `ready_to_file` (user confirms).
**Edge cases:** Chain invalid → export blocked with explanation. Very large video → package assembles with the video referenced by hash + separate download if zip streaming is impractical (⚠️ DECISION).
**Log events:** `package_exported` (payload: package hash).

## F7 — Works library
**User sees:** Home after login: grid/list of Works (thumbnail from latest clip, title, status pill, last-activity date), search by title, filter by status. Empty state sells the loop: "Create your first Work — your creation record starts the moment you do."
**Log events:** none.

---

## Log-event table (authoritative list)
`work_created, work_renamed, work_status_changed, work_archived, clip_added, clip_labeled, clip_archived, note_added, note_edited, note_deleted, package_exported`
Every one of these MUST write a creation_log entry. evidence-guardian audits this.

## Success criteria (MVP)
- A test choreographer captures a real routine across ≥2 sessions and exports a valid package with zero coaching.
- Chain verification passes on every export in testing.
- Capture flow: ≤3 taps from opening a Work to a clip uploading.
