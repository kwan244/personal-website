import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { HeroBadge } from "@/components/HeroBadge";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const [firstName, ...otherNames] = profile.name.split(" ");
// Featured first, then the rest; numbers follow this display order.
const orderedProjects = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
const projectNumber = (slug: string) =>
  String(orderedProjects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0") + " /";

export default function Home() {
  const featured = orderedProjects.filter((p) => p.featured);
  const compact = orderedProjects.filter((p) => !p.featured);

  return (
    <div className="space-y-20">
      <section aria-labelledby="hero-heading" className="relative isolate pt-4">
        {/* Capped at 60% so every text pairing over it still passes WCAG AA. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-40 -z-10 size-96 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60 blur-2xl"
        />
        <HeroBadge
          text={profile.badge}
          href="#projects"
          label="See my projects"
          className="absolute top-2 right-0 size-24 sm:size-32"
        />
        <h1 id="hero-heading" className="text-[clamp(4rem,22vw,9rem)] leading-[0.9] uppercase">
          {firstName} <span className="text-outline block">{otherNames.join(" ")}</span>
        </h1>
        <p className="mt-4 text-sm text-muted">Legal name: {profile.legalName}</p>
        <p className="mt-2 text-lg text-muted">
          {profile.headline} · {profile.location}
        </p>
        <a
          href={profile.cv}
          download
          className="mt-6 inline-block rounded-lg border border-border px-4 py-2 font-medium hover:bg-surface"
        >
          Download CV <span className="text-muted">(PDF)</span>
        </a>
      </section>

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-8">
        <h2 id="about-heading" className="text-3xl">
          About
        </h2>
        <div className="mt-3 space-y-3">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-8">
        <h2 id="skills-heading" className="text-3xl">
          Skills
        </h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          {profile.skills.map((skill) => (
            <div key={skill.group}>
              <dt className="font-medium">{skill.group}</dt>
              <dd className="text-muted">{skill.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-8">
        <h2 id="projects-heading" className="text-3xl">
          Projects
        </h2>
        <ul className="mt-4 space-y-6">
          {featured.map((project) => (
            <li key={project.slug} className="relative overflow-hidden rounded-xl border border-border bg-surface">
              {project.image && (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  sizes="(min-width: 768px) 736px, 100vw"
                  className="h-auto w-full border-b border-border"
                />
              )}
              <div className="p-5">
                <p className="font-mono text-sm text-accent">{projectNumber(project.slug)}</p>
                <h3 className="mt-2 font-display text-3xl">
                  {/* Stretched link: the whole card is clickable, with one accessible name. */}
                  <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">{project.context}</p>
                <p className="mt-3">{project.summary}</p>
                <p className="mt-3 font-mono text-xs text-muted">{project.stack.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {compact.map((project) => (
            <li key={project.slug} className="relative rounded-xl border border-border bg-surface p-4">
              <p className="font-mono text-sm text-accent">{projectNumber(project.slug)}</p>
              <h3 className="mt-2 font-display text-xl">
                <Link href={`/projects/${project.slug}`} prefetch={true} className="after:absolute after:inset-0">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted">{project.context}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8">
        <h2 id="contact-heading" className="text-3xl">
          Contact
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 block font-display text-[clamp(1.75rem,8vw,3.5rem)] leading-tight [overflow-wrap:anywhere] text-accent hover:underline"
        >
          {/* If it ever has to wrap, break before the @ rather than mid-word. */}
          {profile.email.split("@")[0]}
          <wbr />@{profile.email.split("@")[1]}
        </a>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <CopyEmailButton email={profile.email} />
        </div>
        <p className="mt-6">
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
      </section>
    </div>
  );
}
