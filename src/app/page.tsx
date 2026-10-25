import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { DeskScene } from "@/components/DeskScene";
import { deskAnchors } from "@/components/deskAnchors";
import { HeroBadge } from "@/components/HeroBadge";
import { HeroFrame } from "@/components/HeroFrame";
import { NoteDoodle } from "@/components/NoteDoodle";
import { NotesToCards } from "@/components/NotesToCards";
import { ProjectMorph } from "@/components/ProjectMorph";
import { profile } from "@/content/profile";
import { projects, type Project } from "@/content/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

type Anchor = { w: string; h: string; transform: string; light?: "left" | "right" };

// Lays an HTML box onto the scene in its own 3D perspective (see deskAnchors.ts).
function anchorStyle(a: Anchor): CSSProperties {
  const { x, y } = deskAnchors.origin;
  return { left: x, top: y, width: a.w, height: a.h, transform: a.transform };
}

// Notes take their transform as --t, so the hover lift in globals.css can build on it.
function noteStyle(a: Anchor) {
  const { transform, ...box } = anchorStyle(a);
  return { ...box, "--t": transform } as CSSProperties;
}

const noteAnchors: Record<string, Anchor> = deskAnchors.notes;

function noteAnchor(slug: string): Anchor {
  const anchor = noteAnchors[slug];
  if (!anchor) {
    throw new Error(`No desk spot for the "${slug}" note: add it to NOTES in scripts/desk-scene.py and re-run it.`);
  }
  return anchor;
}

// Skills the laptop's terminal cycles through (all from profile.skills).
const screenStack = ["TypeScript", "React", "Next.js", "Spring Boot", "Prisma ORM", "Playwright"];

// Paper tones, alternating from note to note.
const noteTones = ["from-[#a3e8c7] to-[#6cb592]", "from-[#c4f1db] to-[#86c7a8]"];

// The note's outline, with the bottom-right corner folded over (the fold fills the triangle beside it).
const notePaper = "[clip-path:polygon(0_0,100%_0,100%_84%,90%_100%,0_100%)]";
const noteFold = "[clip-path:polygon(90%_84%,100%_84%,90%_100%)]";

// A sticky note linking to a project. Pinned notes lie on the desk and scale with it (cqw), and catch the
// screen's light on the side facing the laptop.
function NoteLink({
  project,
  index,
  pinned = false,
  light,
}: {
  project: Project;
  index: number;
  pinned?: boolean;
  light?: "left" | "right";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      prefetch={true}
      style={pinned ? { fontSize: "1.75cqw" } : undefined}
      className={`relative isolate flex h-full flex-col justify-between leading-tight text-[#08170f] ${pinned ? "p-[0.75em]" : "p-3"}`}
    >
      {/* Paper: colour, grain, the screen's light on the laptop side (breathing with the screen), the fold. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-linear-160 ${noteTones[index % noteTones.length]} ${notePaper}`}
      />
      <span aria-hidden="true" className={`note-grain absolute inset-0 -z-10 ${notePaper}`} />
      {light && (
        <span
          aria-hidden="true"
          className={`desk-screen-light absolute inset-0 -z-10 ${notePaper} ${light === "right" ? "bg-linear-to-l" : "bg-linear-to-r"} from-[#f4fffa]/70 via-[#f4fffa]/10 via-45% to-transparent opacity-60 dark:opacity-100`}
        />
      )}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-linear-[315deg] from-[#e8fbf1] via-[#b9e3cd] to-[#6fae8f] ${noteFold}`}
      />
      {/* Handwritten, like a real sticky note; the label underneath stays typed, with the pen doodle beside it. */}
      <span className="font-hand text-[1.5em] leading-[0.95] font-bold">{project.title}</span>
      <span className="mt-2 flex items-end justify-between gap-[0.5em]">
        <span className="font-mono text-[0.72em] font-semibold tracking-wide whitespace-nowrap text-[#123826] uppercase">
          {project.noteLabel}
        </span>
        {/* Kept clear of the folded corner. */}
        <NoteDoodle
          kind={project.noteDoodle}
          className="-my-[0.2em] mr-[0.45em] h-[1.6em] w-auto shrink-0 -rotate-6 text-[#123826]/80"
        />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <section aria-labelledby="hero-heading">
        <HeroFrame className="desk-frame relative overflow-hidden bg-[#d6e9df] dark:bg-[#070c0a]">
          <div className="desk-box @container">
            <DeskScene className="size-full" />
            {/* On the laptop screen, which stays dark in both themes, so these use fixed mint colours. */}
            <div
              style={anchorStyle(deskAnchors.screen)}
              className="absolute flex origin-top-left flex-col justify-center gap-[0.75cqw] px-[2.2cqw] pt-[1.4cqw] text-[#e2f3e8]"
            >
              {/* The prompt and headline drop on small scenes, where they wouldn't fit on the screen. */}
              <p aria-hidden="true" className="font-mono text-[max(10px,1.15cqw)] text-[#8fb8a5] @max-4xl:hidden">
                <span className="text-[#6ee7b7]">kevin@auckland ~ %</span> <span className="desk-typed">whoami</span>
              </p>
              <h1 id="hero-heading" className="text-[4.4cqw] leading-[0.95] whitespace-nowrap text-[#8bf5cb] uppercase">
                {profile.name}
              </h1>
              <p className="text-[max(11px,1.25cqw)] leading-snug text-balance text-[#c4dccf] @max-4xl:hidden">
                {profile.headline}
              </p>
              {/* Decorative: the Skills section lists these properly. Shows the first one without motion. */}
              <p
                aria-hidden="true"
                className="font-mono text-[max(11px,1.2cqw)] leading-[1.5em] text-[#8fb8a5] @max-4xl:hidden"
              >
                <span className="text-[#6ee7b7]">stack:</span>{" "}
                <span className="desk-reel">
                  <span className="desk-reel-track">
                    {[...screenStack, screenStack[0]].map((skill, i) => (
                      <span key={i} className="block text-[#d8f5e6]">
                        {skill}
                      </span>
                    ))}
                  </span>
                </span>
              </p>
              {/* Inline, so the cursor follows the last word when the link wraps on small screens. */}
              <p className="font-mono text-[max(12px,1.3cqw)]">
                <span aria-hidden="true" className="text-[#6ee7b7]">
                  &gt;{" "}
                </span>
                <a
                  href={profile.cv}
                  download
                  className="py-1 text-[#7ff2c2] underline underline-offset-4 [--accent:#6ee7b7]"
                >
                  click here to download CV<span className="sr-only"> (PDF)</span>
                </a>{" "}
                <span
                  aria-hidden="true"
                  className="desk-cursor inline-block h-[1.15em] w-[0.55em] bg-[#7ff2c2] align-[-0.2em]"
                />
              </p>
            </div>
            <ul aria-label="Projects" className="hidden scene-wide:block">
              {projects.map((project, i) => {
                const anchor = noteAnchor(project.slug);
                return (
                  <li
                    key={project.slug}
                    data-note={project.slug}
                    style={noteStyle(anchor)}
                    className="desk-note absolute origin-top-left"
                  >
                    <NoteLink project={project} index={i} pinned light={anchor.light} />
                  </li>
                );
              })}
            </ul>
          </div>
          <HeroBadge
            text={profile.badge}
            href="#projects"
            label="See my projects"
            className="desk-badge absolute bottom-4 left-4 size-[clamp(4.5rem,min(15svh,22vw),8rem)] sm:right-8 sm:bottom-8 sm:left-auto"
          />
        </HeroFrame>
        {/* Narrow screens crop the desk's sides, so the notes become a list below it. */}
        <ul aria-label="Projects" className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 scene-wide:hidden">
          {projects.map((project, i) => (
            <li key={project.slug} className="drop-shadow-lg">
              <NoteLink project={project} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="About and skills" className="bg-surface">
        <div className="about-pop mx-auto grid max-w-7xl gap-12 px-4 py-24 lg:grid-cols-2">
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
              <li
                key={project.slug}
                data-card={project.slug}
                className="reveal group relative grid items-center gap-8 md:grid-cols-2"
              >
                {/* The screenshot and title morph into the case study's (see ProjectMorph). */}
                {project.image && (
                  <ProjectMorph slug={project.slug} part="image">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`h-auto w-full rounded-xl border border-border transition duration-300 ease-out group-focus-within:border-accent group-hover:border-accent group-hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] motion-safe:group-hover:-translate-y-1 ${i % 2 ? "md:order-last" : ""}`}
                    />
                  </ProjectMorph>
                )}
                <div>
                  <h3 className="font-display text-4xl transition-colors group-hover:text-accent">
                    {/* Stretched link: the whole row is clickable, with one accessible name. */}
                    <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                      <ProjectMorph slug={project.slug} part="title">
                        <span className="inline-block">{project.title}</span>
                      </ProjectMorph>
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
                data-card={project.slug}
                className="reveal group relative rounded-xl border border-border bg-surface p-6 transition duration-300 ease-out focus-within:border-accent hover:border-accent hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.45)] motion-safe:hover:-translate-y-1"
              >
                <h3 className="font-display text-2xl transition-colors group-hover:text-accent">
                  <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                    <ProjectMorph slug={project.slug} part="title">
                      <span className="inline-block">{project.title}</span>
                    </ProjectMorph>
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
      <NotesToCards />
    </>
  );
}
