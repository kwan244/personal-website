# Plan

- [x] **Phase 1 (days 1–2):** scaffold the project, layout with header/nav/footer, placeholder home page, deploy to Vercel
- [x] **Phase 2 (days 3–6):** home page sections (hero, about, skills, featured projects, contact); `projects.ts` data file; `/projects/[slug]` pages with problem, tech stack, my role, challenges, results, live/repo links, screenshot
- [x] **Phase 3a — design-independent:** SEO metadata (`metadataBase`, per-page metadata), sitemap, robots.txt; CV PDF (no phone number) in `public/` with a download button
- [ ] **Phase 3b — design polish** (one PR per step; check Lighthouse > 90, 360px and both themes on every preview):
  - [x] `feat/design-tokens-and-type`: mint-on-ink colour tokens for light + dark (a darker mint for text on light backgrounds, to pass contrast); Anton headings, Geist body, JetBrains Mono accents via `next/font`; static grain overlay; mint focus ring, restyled skip link, selection colour, "KW" favicon
  - [x] `feat/hero-redesign` (static): Anton name with "Wang" in outline; mint blob and badge (decorative, `aria-hidden`); 2 featured cards (stroke platform, AUSS) with screenshots + 3 compact cards, numbered "01 /"; big email link with a copy-email button (small client component with an `aria-live` "Copied" message)
  - [ ] `feat/hero-refinements`: full-width section bands (content in a ~1280px container, paragraphs under ~65 characters); full-screen desk-scene hero (inline aria-hidden SVG in `DeskScene.tsx`, ids prefixed `desk-`, next/font text) with the `<h1>` top left outside the laptop; sticky notes, the chair "Scroll down" cue and the spinning badge sticker as real HTML links over the scene (stacked list and cropped scene at 360px); blob replaced by the idea glow; scene dark in both themes; About on `--surface`, Projects on `--background`, tall Contact; featured projects as alternating wide rows, the rest in a 3-column grid, no numbering; badge spin and cue-arrow bob (CSS, off under reduced motion). Static pose: thought bubble visible with a skill, spark hidden
  - [ ] `feat/case-study-redesign`: hero image at the top (the morph target); mono "at a glance" row (role · dates · stack, from new `roleLabel` and `dates` fields); next/previous project links; make my own role very clear on Plateful and Guess Who's the Thief (team projects that also appear on a teammate's portfolio)
  - [ ] `feat/css-motion`: steam wisps rising and fading, terminal cursor blink, card hovers, scroll-driven reveals behind `@supports (animation-timeline: view())`; content visible by default; all off under `prefers-reduced-motion`
  - [ ] `feat/page-transitions`: card → case-study hero morph with React's `<ViewTransition>` (no dependency); reduced-motion CSS from the Next guide
  - [ ] `feat/gsap-motion` (SVG + GSAP only, no Lottie; **ask before installing `gsap`**; lazy-load, `gsap.matchMedia()` for reduced motion, never hide content before JS runs): idea loop every ~8.5s, paused when the tab is hidden or the hero is off screen (glow swells, spark pops and fades ~1.4s, thought bubble from ~1.05s, ~3.8s total, hands type faster); bubble cycles TypeScript, React, Next.js, Tailwind CSS, Spring Boot, Java, Prisma, MongoDB with inline Simple Icons paths (CC0, v16.35.0; Java uses OpenJDK) in mint at 18px, 10px gap, centred, bubble `aria-hidden`; idle typing bob offset between hands; animate elements with a `transform` attribute (hands, badge) via GSAP x/y or CSS `translate`, never `transform`; notes fly into project cards on scroll (Flip + ScrollTrigger), cards simply appear on phones and under reduced motion, fall back to stagger + parallax if it stutters on a mid-range phone
- [ ] **Phase 3c — design-dependent:** dark mode toggle built on the new tokens (no flash of the wrong theme); Open Graph image matching the new look
- [ ] **Phase 4 (days 10–14):** accessibility + Lighthouse pass, 404 page (plus a real 404 status for unknown `/projects/<slug>` URLs via a `src/proxy.ts` slug check, with the slug list kept separate from `projects.ts`), README (stack, how to run, screenshot), custom domain, link from CV/GitHub/LinkedIn
- [ ] **Later:** blog (MDX) with project write-ups
- [ ] **Later (after Phase 4):** migrate hosting from Vercel to AWS (S3 + CloudFront via static export, or Amplify); write it up as a blog post

## CV fixes (in FlowCV, then replace `public/Kevin-Wang-CV.pdf` with a no-phone export)
- [ ] ABI internship: describe the work as full-stack, not "frontend", to match the site (API routes, Prisma on AWS RDS MySQL, S3, 3D viewer, PDF reports, tests)
- [ ] Add the AUSS Member Platform project
- [ ] Add a link to the portfolio site (once the custom domain is set in Phase 4)
- [ ] Fix the typo "Frontend web developement" → "development"
- [ ] Remove the duplicate "Java" in Technical Skills
- [ ] Add the grade for "Advanced Software Requirements" (the only achievement without one)
