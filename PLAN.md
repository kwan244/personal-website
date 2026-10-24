# Plan

- [x] **Phase 1 (days 1–2):** scaffold the project, layout with header/nav/footer, placeholder home page, deploy to Vercel
- [x] **Phase 2 (days 3–6):** home page sections (hero, about, skills, featured projects, contact); `projects.ts` data file; `/projects/[slug]` pages with problem, tech stack, my role, challenges, results, live/repo links, screenshot
- [x] **Phase 3a — design-independent:** SEO metadata (`metadataBase`, per-page metadata), sitemap, robots.txt; CV PDF (no phone number) in `public/` with a download button
- [ ] **Phase 3b — design polish** (one PR per step; check Lighthouse > 90, 360px and both themes on every preview):
  - [ ] `feat/design-tokens-and-type`: mint-on-ink colour tokens for light + dark (a darker mint for text on light backgrounds, to pass contrast); Anton headings, Geist body, JetBrains Mono accents via `next/font`; static grain overlay; mint focus ring, restyled skip link, selection colour, "KW" favicon
  - [ ] `feat/hero-redesign` (static): Anton name with "Wang" in outline; mint blob and badge (decorative, `aria-hidden`); 2 featured cards (stroke platform, AUSS) with screenshots + 3 compact cards, numbered "01 /"; big email link with a copy-email button (small client component with an `aria-live` "Copied" message)
  - [ ] `feat/case-study-redesign`: hero image at the top (the morph target); mono "at a glance" row (role · dates · stack, needs short `roleLabel` and `dates` fields); next/previous project links
  - [ ] `feat/css-motion`: drifting blob (transform only), spinning badge, card and email hovers, scroll-driven reveals behind `@supports (animation-timeline: view())`; content visible by default; all off under `prefers-reduced-motion`
  - [ ] `feat/page-transitions`: card → case-study hero morph with React's `<ViewTransition>` (no dependency); reduced-motion CSS from the Next guide
  - [ ] `feat/gsap-motion`: hero intro timeline and scroll-scrubbed projects; **ask before installing `gsap`**; lazy-load it, use `gsap.matchMedia()` for reduced motion, never hide content before JS runs
- [ ] **Phase 3c — design-dependent:** dark mode toggle built on the new tokens (no flash of the wrong theme); Open Graph image matching the new look
- [ ] **Phase 4 (days 10–14):** accessibility + Lighthouse pass, 404 page (plus a real 404 status for unknown `/projects/<slug>` URLs via a `src/proxy.ts` slug check, with the slug list kept separate from `projects.ts`), README (stack, how to run, screenshot), custom domain, link from CV/GitHub/LinkedIn
- [ ] **Later:** blog (MDX) with project write-ups
- [ ] **Later (after Phase 4):** migrate hosting from Vercel to AWS (S3 + CloudFront via static export, or Amplify); write it up as a blog post
