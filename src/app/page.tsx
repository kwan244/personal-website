import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { DeskScene } from "@/components/DeskScene";
import { HeroBadge } from "@/components/HeroBadge";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

// Sticky-note spots on the desk, in DeskScene units (1000 × 750): top-left corner, size,
// rotation about that corner, font size and paper tone. Converted to % and cqw below.
const notes: Record<string, { x: number; y: number; w: number; h: number; r: number; fs: number; tone: string }> = {
  "stroke-outcome-prediction": { x: 70, y: 100, w: 170, h: 120, r: -5, fs: 16, tone: "from-[#8fdcb9] to-[#5aa585]" },
  "auss-member-platform": { x: 80, y: 290, w: 160, h: 110, r: 4, fs: 16, tone: "from-[#b7ecd3] to-[#79bfa0]" },
  plateful: { x: 55, y: 470, w: 116, h: 80, r: -3, fs: 14, tone: "from-[#8fdcb9] to-[#5aa585]" },
  "guess-whos-the-thief": { x: 772, y: 60, w: 124, h: 86, r: 6, fs: 14, tone: "from-[#b7ecd3] to-[#79bfa0]" },
  "rock-paper-scissors": { x: 878, y: 176, w: 104, h: 82, r: -5, fs: 13, tone: "from-[#8fdcb9] to-[#5aa585]" },
};

function noteStyle(slug: string) {
  const n = notes[slug];
  return {
    "--x": `${n.x / 10}%`,
    "--y": `${n.y / 7.5}%`,
    "--w": `${n.w / 10}%`,
    "--h": `${n.h / 7.5}%`,
    "--r": `${n.r}deg`,
    "--fs": `${n.fs / 10}cqw`,
  } as CSSProperties;
}

// A sticky note linking to a project. Pinned notes sit on the desk and scale with it (cqw).
function NoteLink({ slug, title, pinned = false }: { slug: string; title: string; pinned?: boolean }) {
  return (
    <Link
      href={`/projects/${slug}`}
      prefetch={true}
      className={`relative isolate block h-full leading-tight font-bold text-[#08170f] ${pinned ? "p-[1.4cqw] text-(length:--fs)" : "p-3"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-linear-160 ${notes[slug].tone} [clip-path:polygon(0_0,100%_0,100%_86%,90%_100%,0_100%)]`}
      />
      <span
        aria-hidden="true"
        className={`absolute left-1/2 -translate-x-1/2 -rotate-3 bg-[#e6fff3]/20 ${pinned ? "-top-[0.7cqw] h-[1.4cqw] w-[4.4cqw]" : "-top-1.5 h-3 w-10"}`}
      />
      {title}
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-heading">
        <div className="desk-frame relative overflow-hidden bg-[#d6e9df] dark:bg-[#070c0a]">
          <div className="desk-box @container">
            <DeskScene projectCount={projects.length} className="size-full" />
            {/* On the laptop screen. The screen stays dark in both themes, so these use fixed mint colours. */}
            <h1
              id="hero-heading"
              className="absolute top-[25.5%] left-[34.8%] text-[5.1cqw] leading-none whitespace-nowrap text-[#8bf5cb] uppercase"
            >
              {profile.name}
            </h1>
            <p className="absolute top-[32%] left-[35.2%] flex items-center gap-[0.6cqw] font-mono text-[max(12px,1.35cqw)] text-[#e2f3e8]">
              <span aria-hidden="true">&gt;</span>
              <a
                href={profile.cv}
                download
                className="py-1 text-[#7ff2c2] underline underline-offset-4 [--accent:#6ee7b7]"
              >
                Download CV (PDF)
              </a>
              <span aria-hidden="true" className="desk-cursor inline-block h-[1.2em] w-[0.6em] bg-[#7ff2c2]" />
            </p>
            <ul aria-label="Projects" className="hidden scene-wide:block">
              {projects.map((project) => (
                <li
                  key={project.slug}
                  style={noteStyle(project.slug)}
                  className="absolute top-(--y) left-(--x) h-(--h) w-(--w) origin-top-left rotate-(--r) drop-shadow-lg"
                >
                  <NoteLink slug={project.slug} title={project.title} pinned />
                </li>
              ))}
            </ul>
          </div>
          <HeroBadge
            text={profile.badge}
            href="#projects"
            label="See my projects"
            className="absolute right-4 bottom-4 size-24 sm:right-8 sm:bottom-8 sm:size-32"
          />
        </div>
        {/* Narrow screens crop the desk's sides, so the notes become a list below it. */}
        <ul aria-label="Projects" className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 scene-wide:hidden">
          {projects.map((project) => (
            <li key={project.slug} className="drop-shadow-lg">
              <NoteLink slug={project.slug} title={project.title} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="About and skills" className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2">
          <div id="about" className="scroll-mt-8">
            <h2 className="text-4xl sm:text-5xl">About</h2>
            <p className="mt-4 text-lg text-muted">
              {profile.headline} · {profile.location}
            </p>
            <p className="mt-1 text-sm text-muted">Legal name: {profile.legalName}</p>
            <div className="mt-4 max-w-prose space-y-3">
              {profile.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div id="skills" className="scroll-mt-8">
            <h2 className="text-4xl sm:text-5xl">Skills</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {profile.skills.map((skill) => (
                <div key={skill.group}>
                  <dt className="font-medium">{skill.group}</dt>
                  <dd className="text-muted">{skill.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-8">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <h2 id="projects-heading" className="text-4xl sm:text-5xl">
            Projects
          </h2>
          <ul className="mt-10 space-y-16">
            {featured.map((project, i) => (
              <li key={project.slug} className="relative grid items-center gap-8 md:grid-cols-2">
                {project.image && (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`h-auto w-full rounded-xl border border-border ${i % 2 ? "md:order-last" : ""}`}
                  />
                )}
                <div>
                  <h3 className="font-display text-4xl">
                    {/* Stretched link: the whole row is clickable, with one accessible name. */}
                    <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted">{project.context}</p>
                  <p className="mt-4 max-w-prose">{project.summary}</p>
                  <p className="mt-4 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {others.map((project) => (
              <li key={project.slug} className="relative rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-2xl">
                  <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">{project.context}</p>
                <p className="mt-3">{project.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="flex min-h-[70svh] scroll-mt-8 items-center bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-24">
          <h2 id="contact-heading" className="text-4xl sm:text-5xl">
            Contact
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 block font-display text-[clamp(1.75rem,8vw,5rem)] leading-tight [overflow-wrap:anywhere] text-accent hover:underline"
          >
            {/* If it ever has to wrap, break before the @ rather than mid-word. */}
            {profile.email.split("@")[0]}
            <wbr />@{profile.email.split("@")[1]}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CopyEmailButton email={profile.email} />
          </div>
          <p className="mt-8">
            Or find me on{" "}
            <a href={profile.github} className="text-accent underline">
              GitHub
            </a>{" "}
            and{" "}
            <a href={profile.linkedin} className="text-accent underline">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
