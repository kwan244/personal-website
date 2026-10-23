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

## Quality bar
- Lighthouse > 90 in every category.
- Responsive from 360px wide.
- Dark mode via `prefers-color-scheme`, with a manual toggle.

## Personal details
Real values live in `src/content/profile.ts`. I go by Kevin Wang; my legal name (Wangxun Wang) is on my CV, so the site shows both. **Never invent personal details**: content comes from my CV, my repos, or me. Never publish my phone number.

## Plan
See `PLAN.md` for the phased checklist.

@AGENTS.md
