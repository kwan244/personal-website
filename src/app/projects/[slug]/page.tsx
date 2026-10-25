import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { openGraphBase } from "@/app/shared-metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function getProject(params: PageProps<"/projects/[slug]">["params"]) {
  const { slug } = await params;
  return projects.find((project) => project.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject(params);
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      ...openGraphBase,
      type: "article",
      title: `${project.title} | ${profile.name}`,
      description: project.summary,
      url,
    },
  };
}

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <h2 className="text-3xl">{title}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-accent">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-xs tracking-wider text-muted uppercase">{term}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

// The back link is URL-independent, so it stays in the shared App Shell; only
// the params-dependent details sit behind Suspense (keeps navigation instant).
// shortcut: unknown slugs stream a not-found page with 200 + noindex instead of a 404; add a Proxy check if a real 404 status matters.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/#projects" className="text-sm text-muted hover:underline">
        <span aria-hidden="true">←</span> All projects
      </Link>
      <Suspense fallback={<p className="mt-6 text-muted">Loading project…</p>}>
        <ProjectDetails params={params} />
      </Suspense>
    </div>
  );
}

async function ProjectDetails({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const project = await getProject(params);
  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="mt-6">
      <header className="max-w-4xl">
        <h1 className="text-5xl leading-none text-balance sm:text-7xl">{project.title}</h1>
        <p className="mt-3 text-muted">{project.context}</p>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl">{project.summary}</p>
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          sizes="(min-width: 1280px) 1248px, 100vw"
          className="mt-10 h-auto w-full rounded-xl border border-border shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)]"
          loading="eager"
          fetchPriority="high"
        />
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* At a glance: what I did, when, with what. Sticks beside the write-up on wide screens. */}
        <aside aria-label="At a glance" className="self-start lg:sticky lg:top-8">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <Fact term="My role">{project.roleLabel}</Fact>
            <Fact term="When">{project.dates}</Fact>
            <Fact term="Stack">
              <ul className="flex flex-wrap gap-1.5 font-mono text-sm">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md border border-border px-2 py-0.5">
                    {tech}
                  </li>
                ))}
              </ul>
            </Fact>
            {(project.liveUrl || project.repoUrl || project.repoNote) && (
              <Fact term="Links">
                <ul className="space-y-1">
                  {project.liveUrl && (
                    <li>
                      <a href={project.liveUrl} className="underline underline-offset-4">
                        Live site
                      </a>
                    </li>
                  )}
                  {project.repoUrl && (
                    <li>
                      <a href={project.repoUrl} className="underline underline-offset-4">
                        Source code
                      </a>
                    </li>
                  )}
                  {project.repoNote && <li className="text-muted">{project.repoNote}</li>}
                </ul>
              </Fact>
            )}
          </dl>
        </aside>

        <div className="max-w-prose space-y-12">
          <section>
            <h2 className="text-3xl">Problem</h2>
            <p className="mt-4">{project.problem}</p>
          </section>
          <Section title="My role" items={project.role} />
          <Section title="Challenges" items={project.challenges} />
          <Section title="Results" items={project.results} />
        </div>
      </div>

      {(previous || next) && (
        <nav aria-label="More projects" className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {previous && (
            <Link
              href={`/projects/${previous.slug}`}
              className="rounded-xl border border-border p-5 transition-colors hover:border-accent"
            >
              <span className="text-sm text-muted">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="mt-1 block font-display text-2xl">{previous.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="rounded-xl border border-border p-5 text-right transition-colors hover:border-accent sm:col-start-2"
            >
              <span className="text-sm text-muted">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="mt-1 block font-display text-2xl">{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
