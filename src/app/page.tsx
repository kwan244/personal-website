import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { DeskScene } from "@/components/DeskScene";
import { deskAnchors } from "@/components/deskAnchors";
import { HeroBadge } from "@/components/HeroBadge";
import { ParallaxFrame } from "@/components/ParallaxFrame";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

type Anchor = { w: string; h: string; transform: string };

// Lays an HTML box onto the scene in its own 3D perspective (see deskAnchors.ts).
function anchorStyle(a: Anchor): CSSProperties {
  const { x, y } = deskAnchors.origin;
  return { left: x, top: y, width: a.w, height: a.h, transform: a.transform };
}

// Notes take their transform as --t, so the hover lift in globals.css can build on it.
function noteStyle(a: Anchor) {
  const { x, y } = deskAnchors.origin;
  return { left: x, top: y, width: a.w, height: a.h, "--t": a.transform } as CSSProperties;
}

const noteAnchors: Record<string, Anchor> = deskAnchors.notes;

// Each note's one-word context and paper tone.
const noteMeta: Record<string, { label: string; tone: string }> = {
  "stroke-outcome-prediction": { label: "Internship", tone: "from-[#a3e8c7] to-[#6cb592]" },
  "auss-member-platform": { label: "Club platform", tone: "from-[#c4f1db] to-[#86c7a8]" },
  plateful: { label: "Open source", tone: "from-[#a3e8c7] to-[#6cb592]" },
  "guess-whos-the-thief": { label: "Team project", tone: "from-[#c4f1db] to-[#86c7a8]" },
  "rock-paper-scissors": { label: "Self-taught", tone: "from-[#a3e8c7] to-[#6cb592]" },
};

// A sticky note linking to a project. Pinned notes lie on the desk and scale with it (cqw).
function NoteLink({ slug, title, pinned = false }: { slug: string; title: string; pinned?: boolean }) {
  const { label, tone } = noteMeta[slug];
  return (
    <Link
      href={`/projects/${slug}`}
      prefetch={true}
      style={pinned ? { fontSize: "1.5cqw" } : undefined}
      className={`relative isolate flex h-full flex-col justify-between leading-tight font-bold text-[#08170f] ${pinned ? "p-[0.75em]" : "p-3"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-linear-160 ${tone} [clip-path:polygon(0_0,100%_0,100%_84%,90%_100%,0_100%)]`}
      />
      {title}
      <span className="mt-2 font-mono text-[0.68em] font-semibold tracking-wide text-[#1d4532] uppercase">{label}</span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-heading">
        <ParallaxFrame className="desk-frame relative overflow-hidden bg-[#d6e9df] dark:bg-[#070c0a]">
          <div className="desk-box @container">
            <DeskScene className="size-full" />
            {/* On the laptop screen, which stays dark in both themes, so these use fixed mint colours. */}
            <div
              style={anchorStyle(deskAnchors.screen)}
              className="absolute flex origin-top-left flex-col justify-center gap-[0.75cqw] px-[2.2cqw] pt-[1.4cqw] text-[#e2f3e8]"
            >
              <p aria-hidden="true" className="font-mono text-[max(10px,1.15cqw)] text-[#8fb8a5]">
                <span className="text-[#6ee7b7]">kevin@auckland ~ %</span> whoami
              </p>
              <h1 id="hero-heading" className="text-[4.4cqw] leading-[0.95] whitespace-nowrap text-[#8bf5cb] uppercase">
                {profile.name}
              </h1>
              <p className="text-[max(11px,1.25cqw)] leading-snug text-balance text-[#c4dccf]">{profile.headline}</p>
              <p className="flex items-center gap-[0.6cqw] font-mono text-[max(12px,1.3cqw)]">
                <span aria-hidden="true" className="text-[#6ee7b7]">
                  &gt;
                </span>
                <a
                  href={profile.cv}
                  download
                  className="py-1 text-[#7ff2c2] underline underline-offset-4 [--accent:#6ee7b7]"
                >
                  click here to download CV (PDF)
                </a>
                <span aria-hidden="true" className="desk-cursor inline-block h-[1.15em] w-[0.55em] bg-[#7ff2c2]" />
              </p>
            </div>
            <ul aria-label="Projects" className="hidden scene-wide:block">
              {projects.map((project) => (
                <li
                  key={project.slug}
                  style={noteStyle(noteAnchors[project.slug])}
                  className="desk-note absolute origin-top-left"
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
            className="desk-badge absolute bottom-4 left-4 size-20 sm:right-8 sm:bottom-8 sm:left-auto sm:size-32"
          />
        </ParallaxFrame>
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
          <div id="about" className="reveal scroll-mt-8">
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
          <div id="skills" className="reveal scroll-mt-8">
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
              <li key={project.slug} className="reveal group relative grid items-center gap-8 md:grid-cols-2">
                {project.image && (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`h-auto w-full rounded-xl border border-border transition duration-300 ease-out group-focus-within:border-accent group-hover:border-accent group-hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] motion-safe:group-hover:-translate-y-1 ${i % 2 ? "md:order-last" : ""}`}
                  />
                )}
                <div>
                  <h3 className="font-display text-4xl transition-colors group-hover:text-accent">
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
              <li
                key={project.slug}
                className="reveal group relative rounded-xl border border-border bg-surface p-6 transition duration-300 ease-out focus-within:border-accent hover:border-accent hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] motion-safe:hover:-translate-y-1"
              >
                <h3 className="font-display text-2xl transition-colors group-hover:text-accent">
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
        <div className="reveal mx-auto w-full max-w-7xl px-4 py-24">
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
