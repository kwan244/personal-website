# Personal portfolio

## Purpose
A personal portfolio that makes my CV credible to NZ grad recruiters (full-stack grad roles). Fast, simple, accessible.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- Deploy on Vercel
- Package manager: npm

## Content
- All content lives in typed data files under `src/content/` (`profile.ts`, `projects.ts`).
- No CMS, no database, no auth.

## Conventions
- Server Components by default; add `"use client"` only when interactivity needs it.
- Semantic HTML. Every image needs meaningful alt text. The site must be fully keyboard navigable.
- Use the Next.js `Image` and Metadata APIs.
- Keep it minimal: no extra libraries unless clearly needed. **Ask before adding any dependency.**
- Stay host-portable (AWS migration planned): no Vercel-specific packages or services (`@vercel/*`, Edge Config, KV/Blob, Vercel cron).

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## Git workflow
- Never commit to `main` directly. One branch per change, named `<type>/<short-description>` (e.g. `feat/dark-mode-toggle`), merged by squash-merging a PR. CI (lint + build) and the Vercel preview must pass.
- Commit messages and PR titles use [Conventional Commits](https://www.conventionalcommits.org): `<type>: <imperative summary>`, e.g. `feat: add project case-study pages`. The PR title becomes the squashed commit on `main`.
- Types: `feat` (new feature/content), `fix` (bug fix), `docs` (docs only), `style` (formatting, no logic change), `refactor`, `perf`, `test`, `chore` (deps, tooling), `ci` (workflows).
- Commit only once `npm run lint` and `npm run build` pass. **Never push until I've reviewed the commit and said to push**; then push it promptly rather than letting reviewed commits pile up.
- Open the PR right after a branch's first (approved) push (as a draft if the work isn't finished) so CI runs on every push; mark it ready for review when done.
- No `Co-Authored-By` or other AI attribution lines.

## Quality bar
- Lighthouse > 90 in every category.
- Responsive from 360px wide.
- Dark mode via `prefers-color-scheme`, with a manual toggle.

## Personal details
Real values live in `src/content/profile.ts`. I go by Kevin Wang; my legal name (Wangxun Wang) is on my CV, so the site shows both. **Never invent personal details**: content comes from my CV, my repos, or me. Never publish my phone number.

## Plan
See `PLAN.md` for the phased checklist.

@AGENTS.md
