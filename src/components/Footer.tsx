import { profile } from "@/content/profile";

export function Footer() {
  const links = [
    { href: `mailto:${profile.email}`, label: "Email" },
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-foreground/70">
        <p>{profile.name}</p>
        <ul className="flex gap-5">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
