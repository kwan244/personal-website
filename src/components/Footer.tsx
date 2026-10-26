import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Icon, icons } from "@/components/Icon";
import { profile } from "@/content/profile";

// The footer is also the Contact section, on every page: email first (the main action, with a copy button for
// webmail users), then GitHub and LinkedIn, then quieter CV and source links; below it, who and where.
export function Footer() {
  const [user, domain] = profile.email.split("@");
  const socials = [
    { href: profile.github, label: "GitHub", icon: icons.github },
    { href: profile.linkedin, label: "LinkedIn", icon: icons.linkedin },
  ];

  return (
    <footer className="border-t border-border">
      <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-7xl px-4 pt-16 sm:pt-24">
        <div className="grid gap-12 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-14">
          <div>
            <h2 id="contact-heading" className="max-w-[14ch] text-4xl text-balance sm:text-6xl">
              Good things begin with a conversation.
            </h2>
            <a href={`mailto:${profile.email}`} className="group mt-10 flex items-center gap-4 sm:gap-5">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground sm:size-16"
              >
                <Icon
                  d={icons.arrowRight}
                  className="size-6 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-xl font-semibold text-accent group-hover:underline sm:text-2xl">
                  Email Kevin
                </span>
                {/* If it ever has to wrap, break before the @ rather than mid-word. */}
                <span className="block text-muted">
                  {user}
                  <wbr />@{domain}
                </span>
              </span>
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:ml-21">
              <CopyEmailButton email={profile.email} />
            </div>
          </div>

          <div className="lg:border-l lg:border-border lg:pl-16">
            <ul className="divide-y divide-border border-b border-border">
              {socials.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-4 py-4 text-lg transition-colors hover:text-accent"
                  >
                    <Icon d={icon} className="size-6" />
                    {label}
                    <Icon
                      d={icons.arrowRight}
                      className="ml-auto size-5 text-muted group-hover:text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <a
                href={profile.cv}
                download
                className="flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                Download CV<span className="sr-only"> (PDF)</span>
                <Icon d={icons.download} className="size-4" />
              </a>
              <a
                href={profile.source}
                className="flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                View source<span className="sr-only"> on GitHub</span>
                <Icon d={icons.external} className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Phones: name, then location and Back to top side by side. Wider: three columns. */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-12">
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 border-t border-border py-8 text-sm text-muted sm:grid-cols-3">
          <p className="col-span-2 sm:col-span-1">
            <span className="block font-medium text-foreground">{profile.name}</span>
            {profile.legalName}
          </p>
          <p className="flex items-center gap-2 sm:justify-self-center">
            <Icon d={icons.pin} className="size-4" />
            {profile.location}
          </p>
          <a
            href="#main"
            className="flex min-h-11 items-center gap-2 justify-self-end transition-colors hover:text-accent"
          >
            Back to top
            <Icon d={icons.arrowUp} className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
