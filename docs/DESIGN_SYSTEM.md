# Chorvivo Design System v1

The single source of truth for all UI. The ui-designer agent enforces this; Peter reviews changes to this file asynchronously. If a needed token doesn't exist, propose it here — never hardcode a one-off.

## Personality
A creative tool for choreographers — Frame.io / Linear energy, not legal software. Dark, cinematic, video-first. Confident and quiet: the user's videos are the color; the UI stays out of the way. The one exception is the Creation Record view, which may feel slightly more precise/official (finer rules, tabular dates) because it is a trust surface.

## Color (Tailwind config tokens)
- `bg` #0C0C0F — app background
- `surface` #16161B — cards, panels
- `surface-2` #1F1F26 — elevated / hover
- `border` #2A2A33 — hairlines
- `text` #F2F2F5 — primary text
- `text-muted` #9A9AA6 — secondary text
- `accent` #E8503A — primary actions, record dot (energetic coral-red; reads "record", not "error")
- `accent-hover` #F06450
- `success` #3ECF8E · `warning` #F5B93E · `danger` #E5484D
- `verify` #7C9EF5 — reserved for creation-record verification states only

Contrast rule: body text ≥ 4.5:1 against its background; muted text ≥ 3:1 and never for essential info.

## Typography
- UI: Inter (400/500/600). Timestamps & hashes: JetBrains Mono 400.
- Scale: 13 (caption) / 15 (body) / 17 (emphasized) / 22 (section) / 28 (page title). Line-height 1.5 body, 1.2 titles.
- No font-weight above 600. Hierarchy comes from size + color, not bolding everything.

## Spacing & shape
- 4px base grid. Common steps: 8 / 12 / 16 / 24 / 32 / 48.
- Radius: 8px inputs/buttons, 12px cards, 999px pills.
- Shadows: avoid; use surface levels + borders for depth (dark UI).

## Components
- **Button:** primary (accent bg, white text) — max ONE per view; secondary (surface-2 bg, border); ghost (text only). Height 44px mobile / 36px desktop. Disabled = 40% opacity, never hidden.
- **Input:** surface bg, border, 44px min height, visible focus ring (accent, 2px). Inline errors below field in danger, plain language.
- **Card (Work / Clip):** surface bg, 12px radius, 16px padding, thumbnail 16:9.
- **Status pill:** draft = text-muted outline · ready to file = warning · filed = success.
- **Timeline marker rail:** 8px tall touch area expanded to 32px invisible hit zone on mobile; markers are 3px accent ticks.
- **Creation record rows:** mono timestamps, 13px, verify-blue check when chain verified.

## States (mandatory on every screen)
Default, Empty (illustration-free: one sentence of copy + one action), Loading (skeletons, not spinners, for lists; progress bars, never spinners, for uploads), Error (what happened + what to do next, plain language).

## Motion
150–200ms ease-out for entrances; progress animations for upload/export; nothing decorative. Respect `prefers-reduced-motion`.

## Accessibility
44px touch targets, visible focus states everywhere, keyboard operable player (space play/pause, N new note), alt text on thumbnails, semantic headings.
