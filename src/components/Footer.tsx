import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Icon, icons } from "@/components/Icon";
import { profile } from "@/content/profile";

// The footer is also the Contact section, on every page: email first (the main action, with a copy button for
// webmail users beside it), then GitHub and LinkedIn, then quieter CV and source links; below it, who and where.
export function Footer() {
  const [user, domain] = profile.email.split("@");
  const socials = [
    { href: profile.github, label: "GitHub", icon: icons.github },
    { href: profile.linkedin, label: "LinkedIn", icon: icons.linkedin },
  ];

  return (
    <footer className="border-t border-border">
      <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-7xl px-4 pt-16 sm:pt-24">
        <div className="grid gap-10 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14 lg:p-12">
          <div>
            {/* Balanced, so it settles on two lines wherever the column is wide enough. */}
            <h2 id="contact-heading" className="text-5xl text-balance sm:text-6xl">
              Good things begin with a conversation.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href={`mailto:${profile.email}`} className="group flex min-w-0 items-center gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground sm:size-[4.5rem]"
                >
                  <Icon
                    d={icons.arrowRight}
                    className="size-7 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-2xl font-semibold text-accent group-hover:underline sm:text-3xl">
                    Email me
                  </span>
                  {/* If it ever has to wrap, break before the @ rather than mid-word. */}
                  <span className="block text-muted sm:text-lg">
                    {user}
                    <wbr />@{domain}
                  </span>
                </span>
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>

          {/* Shorter than the panel: the rule runs only beside the links. */}
          <div className="border-t border-border pt-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
            <ul className="divide-y divide-border border-b border-border">
              {socials.map(({ href, label, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-5 py-5 text-xl transition-colors hover:text-accent"
                  >
                    <Icon d={icon} className="size-7" />
                    {label}
                    <Icon
                      d={icons.external}
                      className="ml-auto size-6 text-muted group-hover:text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-[auto_auto] items-center justify-start whitespace-nowrap text-muted sm:text-lg">
              <a
                href={profile.cv}
                download
                className="flex min-h-14 items-center gap-2 pr-4 transition-colors hover:text-accent sm:gap-3"
              >
                Download CV<span className="sr-only"> (PDF)</span>
                <Icon d={icons.download} className="size-5 sm:size-6" />
              </a>
              <a
                href={profile.source}
                className="relative flex min-h-14 items-center gap-2 pl-4 transition-colors before:absolute before:top-1/2 before:left-0 before:h-8 before:w-px before:-translate-y-1/2 before:bg-border hover:text-accent sm:gap-3 sm:pl-6"
              >
                View source<span className="sr-only"> on GitHub</span>
                <Icon d={icons.external} className="size-5 sm:size-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Phones: name and Back to top on one row, location below. Wider: three columns. */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-12">
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 border-t border-border py-8 text-muted sm:grid-cols-3">
          <p>
            <span className="block text-lg font-semibold text-foreground">{profile.name}</span>
            {profile.legalName}
          </p>
          <p className="col-span-2 flex items-center gap-2 sm:col-span-1 sm:justify-self-center">
            <Icon d={icons.pin} className="size-5" />
            {profile.location}
          </p>
          <a
            href="#main"
            className="flex min-h-11 items-center gap-2 justify-self-end transition-colors hover:text-accent max-sm:col-start-2 max-sm:row-start-1"
          >
            Back to top
            <Icon d={icons.arrowUp} className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
