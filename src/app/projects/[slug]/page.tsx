import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

async function getProject(params: PageProps<"/projects/[slug]">["params"]) {
  const { slug } = await params;
  return projects.find((project) => project.slug === slug) ?? notFound();
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject(params);
  return { title: project.title, description: project.summary };
}

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
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
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <div className="space-y-4">
      <Link href="/#projects" className="text-sm text-foreground/70 hover:underline">
        ← All projects
      </Link>
      <Suspense fallback={<p className="text-foreground/70">Loading project…</p>}>
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
        <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-foreground/70">{project.context}</p>
        <p className="mt-4 text-lg">{project.summary}</p>
        {(project.liveUrl || project.repoUrl) && (
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
          </p>
        )}
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          sizes="(min-width: 768px) 736px, 100vw"
          className="h-auto w-full rounded-lg border border-foreground/10"
          loading="eager"
        />
      )}

      <section>
        <h2 className="text-xl font-semibold">Problem</h2>
        <p className="mt-3">{project.problem}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tech stack</h2>
        <p className="mt-3">{project.stack.join(" · ")}</p>
      </section>

      <Section title="My role" items={project.role} />
      <Section title="Challenges" items={project.challenges} />
      <Section title="Results" items={project.results} />
    </article>
  );
}
