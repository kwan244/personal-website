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
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

// The back link is URL-independent, so it stays in the shared App Shell; only
// the params-dependent details sit behind Suspense (keeps navigation instant).
// shortcut: unknown slugs stream a not-found page with 200 + noindex instead of a 404; add a Proxy check if a real 404 status matters.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <div className="space-y-4">
      <Link href="/#projects" className="text-sm text-muted hover:underline">
        ← All projects
      </Link>
      <Suspense fallback={<p className="text-muted">Loading project…</p>}>
        <ProjectDetails params={params} />
      </Suspense>
    </div>
  );
}

async function ProjectDetails({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const project = await getProject(params);

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-muted">{project.context}</p>
        <p className="mt-4 text-lg">{project.summary}</p>
        {(project.liveUrl || project.repoUrl || project.repoNote) && (
          <p className="mt-4 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} className="underline">
                Live site
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} className="underline">
                Source code
              </a>
            )}
            {project.repoNote && <span className="text-muted">{project.repoNote}</span>}
          </p>
        )}
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          sizes="(min-width: 768px) 736px, 100vw"
          className="h-auto w-full rounded-lg border border-border"
          loading="eager"
        />
      )}

      <section>
        <h2 className="text-xl">Problem</h2>
        <p className="mt-3">{project.problem}</p>
      </section>

      <section>
        <h2 className="text-xl">Tech stack</h2>
        <p className="mt-3 font-mono text-sm">{project.stack.join(" · ")}</p>
      </section>

      <Section title="My role" items={project.role} />
      <Section title="Challenges" items={project.challenges} />
      <Section title="Results" items={project.results} />
    </article>
  );
}
