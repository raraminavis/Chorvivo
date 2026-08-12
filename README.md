# Chorvivo Starter Kit

This kit turns a fresh Claude Code session into a fully-briefed Chorvivo engineering team. It contains no app code yet — it contains the *brains*: the constitution, the agents, the skills, the spec, and the design system.

## What's inside
```
CLAUDE.md                       ← project constitution (Claude Code reads every session)
.claude/agents/
  code-reviewer.md              ← reviews every change before commit
  ui-designer.md                ← your AI product designer (covers UX/UI)
  test-writer.md                ← writes tests, adversarial ones for the evidence layer
  evidence-guardian.md          ← audits the legal core; blocks compromised releases
.claude/skills/
  new-feature/SKILL.md          ← the standard build-a-feature workflow
  ui-screen/SKILL.md            ← UI-only tasks to design-system standard
  db-migration/SKILL.md         ← safe schema changes (RLS always, append-only log)
docs/
  PRD.md                        ← the spec of record (v0.9 — review ⚠️ DECISION items)
  DESIGN_SYSTEM.md              ← colors, type, components (dark, creative-tool aesthetic)
  CHANGELOG.md                  ← agents append one line per merged PR
```

## Setup (one time, ~30 min)
1. Install Node.js LTS: https://nodejs.org
2. Install Claude Code: follow https://docs.claude.com/en/docs/claude-code/overview (npm package: `@anthropic-ai/claude-code`). Sign in with your Claude account.
3. Create an empty GitHub repo named `chorvivo`: https://github.com/new
4. Clone it, copy this kit's contents into the repo root, commit, push.
5. Create a Supabase project: https://supabase.com → keep the URL + anon key handy.
6. Create a Vercel account: https://vercel.com (connect later).
7. In the repo folder, run `claude` to start Claude Code.

## Your first three prompts (paste in order)

**Prompt 1 — orientation check:**
> Read CLAUDE.md, docs/PRD.md, and docs/DESIGN_SYSTEM.md. Summarize the product, the 7 MVP features, the protected zones, and list any questions or ambiguities you have before we start. Do not write any code yet.

**Prompt 2 — Sprint 0 (foundation):**
> Use the new-feature skill mindset but for project setup: scaffold a Next.js (App Router) + TypeScript + Tailwind project per CLAUDE.md conventions. Configure Tailwind with the exact tokens from docs/DESIGN_SYSTEM.md. Set up the Supabase client helpers in /lib/supabase/, Vitest, and a GitHub Actions workflow that runs tests on every PR. Plan first, show me the plan, then execute after I approve.

**Prompt 3 — Sprint 1 begins:**
> Using the new-feature skill, build F1 (Auth) per docs/PRD.md.

From then on, every feature is: `Using the new-feature skill, build F<N> per the PRD.` You review the plan, review the PR, merge.

## Your job in one sentence
Approve plans, read diffs, merge PRs, test as a choreographer would — the agents do the rest.
