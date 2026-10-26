"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Thin line icons in the doodles' round-capped style; decorative, so the text beside them names the control.
function Icon({ d, className = "size-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
const downloadIcon = "M12 4v11M7.5 10.5 12 15l4.5-4.5M5 16v3h14v-3";
const menuIcon = "M4 7h16M4 12h16M4 17h16";
const closeIcon = "M6 6l12 12M18 6 6 18";

// The section crossing a line 40% down the screen (home page only; About's band also holds Skills). Nothing
// is marked on the hero.
function useCurrentSection() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = new Map<Element, string>();
    for (const { id } of navItems) {
      const section = document.getElementById(id)?.closest("section");
      if (section) ids.set(section, id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = ids.get(entry.target)!;
          if (entry.isIntersecting) setCurrent(id);
          else setCurrent((shown) => (shown === id ? null : shown));
        }
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    ids.forEach((_, section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);
  return pathname === "/" ? current : null;
}

export function Header() {
  const current = useCurrentSection();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and hands focus back to its button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navLink = (id: string, label: string, className: string) => (
    <Link
      href={`/#${id}`}
      aria-current={current === id ? "true" : undefined}
      onClick={() => setOpen(false)}
      className={`decoration-2 underline-offset-8 transition-colors hover:text-accent aria-[current=true]:text-accent aria-[current=true]:underline ${className}`}
    >
      {label}
    </Link>
  );

  return (
    // Its own view-transition name keeps it still while the page glides or crossfades beneath it.
    <header className="sticky top-0 z-40 border-b border-border bg-background [view-transition-name:site-header]">
      <div className="mx-auto flex h-(--header-h) max-w-7xl items-center gap-3 px-4">
        <Link href="/" className="mr-auto flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-sm border-2 border-accent font-display text-xl text-accent"
          >
            KW
          </span>
          {/* Phones show only the mark; the name stays for screen readers. */}
          <span className="text-lg font-semibold max-sm:sr-only">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="max-md:hidden">
          <ul className="flex gap-8">
            {navItems.map(({ id, label }) => (
              <li key={id}>{navLink(id, label, "py-2")}</li>
            ))}
          </ul>
        </nav>
        <span aria-hidden="true" className="mx-3 h-8 w-px bg-border max-md:hidden" />

        <a
          href={profile.cv}
          download
          className="inline-flex h-11 items-center gap-2 rounded-md border border-accent px-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <span className="sr-only">Download </span>CV<span className="sr-only"> (PDF)</span>
          <Icon d={downloadIcon} />
        </a>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="flex h-11 min-w-11 flex-col items-center justify-center text-[0.7rem] leading-none md:hidden"
        >
          <Icon d={open ? closeIcon : menuIcon} className="size-6" />
          Menu
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 pb-3">
          {navItems.map(({ id, label }) => (
            <li key={id} className="border-b border-border last:border-0">
              {navLink(id, label, "block py-3.5 text-xl")}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
