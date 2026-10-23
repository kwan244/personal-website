import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-3xl font-bold sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-sm text-foreground/70">Legal name: {profile.legalName}</p>
        <p className="mt-2 text-lg text-foreground/70">
          {profile.headline} · {profile.location}
        </p>
      </section>

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-8">
        <h2 id="about-heading" className="text-xl font-semibold">
          About
        </h2>
        <div className="mt-3 space-y-3">
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-8">
        <h2 id="skills-heading" className="text-xl font-semibold">
          Skills
        </h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          {profile.skills.map((skill) => (
            <div key={skill.group}>
              <dt className="font-medium">{skill.group}</dt>
              <dd className="text-foreground/70">{skill.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-8">
        <h2 id="projects-heading" className="text-xl font-semibold">
          Projects
        </h2>
        <ul className="mt-3 space-y-4">
          {projects.map((project) => (
            <li key={project.slug} className="rounded-lg border border-foreground/10 p-4">
              <h3 className="font-medium">
                <Link href={`/projects/${project.slug}`} className="underline-offset-4 hover:underline">
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-foreground/70">{project.context}</p>
              <p className="mt-2">{project.summary}</p>
              <p className="mt-2 text-sm text-foreground/70">{project.stack.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8">
        <h2 id="contact-heading" className="text-xl font-semibold">
          Contact
        </h2>
        <p className="mt-3">
          Email me at{" "}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          , or find me on{" "}
          <a href={profile.github} className="underline">
            GitHub
          </a>{" "}
          and{" "}
          <a href={profile.linkedin} className="underline">
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
