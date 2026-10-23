import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-3xl font-bold sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-foreground/70">
          {profile.headline} · {profile.location}
        </p>
      </section>

      <section id="about" aria-labelledby="about-heading" className="scroll-mt-8">
        <h2 id="about-heading" className="text-xl font-semibold">
          About
        </h2>
        <p className="mt-3">{profile.summary}</p>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-8">
        <h2 id="projects-heading" className="text-xl font-semibold">
          Projects
        </h2>
        {projects.length === 0 ? (
          <p className="mt-3 text-foreground/70">Projects coming soon.</p>
        ) : (
          <ul className="mt-3 space-y-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-foreground/70">{project.summary}</p>
              </li>
            ))}
          </ul>
        )}
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
          .
        </p>
      </section>
    </div>
  );
}
