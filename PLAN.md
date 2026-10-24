# Plan

- [x] **Phase 1 (days 1–2):** scaffold the project, layout with header/nav/footer, placeholder home page, deploy to Vercel
- [x] **Phase 2 (days 3–6):** home page sections (hero, about, skills, featured projects, contact); `projects.ts` data file; `/projects/[slug]` pages with problem, tech stack, my role, challenges, results, live/repo links, screenshot
- [x] **Phase 3a — design-independent:** SEO metadata (`metadataBase`, per-page metadata), sitemap, robots.txt; CV PDF (no phone number) in `public/` with a download button
- [ ] **Phase 3b — design polish:** new theme (light + dark colour tokens defined together), typography, layout and visuals; CSS-only animations that respect `prefers-reduced-motion`; re-check contrast in both themes; split into small PRs
- [ ] **Phase 3c — design-dependent:** dark mode toggle built on the new tokens (no flash of the wrong theme); Open Graph image matching the new look
- [ ] **Phase 4 (days 10–14):** accessibility + Lighthouse pass, 404 page (plus a real 404 status for unknown `/projects/<slug>` URLs via a `src/proxy.ts` slug check, with the slug list kept separate from `projects.ts`), README (stack, how to run, screenshot), custom domain, link from CV/GitHub/LinkedIn
- [ ] **Later:** blog (MDX) with project write-ups
- [ ] **Later (after Phase 4):** migrate hosting from Vercel to AWS (S3 + CloudFront via static export, or Amplify); write it up as a blog post
