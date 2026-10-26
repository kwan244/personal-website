"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon, icons } from "@/components/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";

// Contact is the footer, on every page, so its link stays on the current page.
const navItems = [
  { id: "about", label: "About", href: "/#about" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

// The last section whose top has passed a line 40% down the screen (home page only; About's band also holds
// Skills), so nothing is marked on the hero. At the very bottom it's Contact: on a tall screen the footer can
// never reach the line.
function useCurrentSection() {
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navItems.flatMap(({ id }) => {
      const section = document.getElementById(id)?.closest("section");
      return section ? [{ id, section }] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const atBottom = innerHeight + scrollY >= root.scrollHeight - 2;
      let shown: string | null = null;
      for (const { id, section } of sections) if (section.getBoundingClientRect().top <= innerHeight * 0.4) shown = id;
      setCurrent(atBottom ? "contact" : shown);
    };
    // At most once a frame, however fast the scroll events come.
    const schedule = () => (frame ||= requestAnimationFrame(update));
    schedule();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
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

  // The current section gets an underline with a dot in its middle; on hover the dot appears and the line
  // grows out of it.
  const navLink = ({ id, label, href }: (typeof navItems)[number], className: string) => (
    <Link
      href={href}
      aria-current={current === id ? "true" : undefined}
      onClick={() => setOpen(false)}
      className={`group/nav font-mono transition-colors hover:text-accent aria-[current=true]:text-accent ${className}`}
    >
      <span className="relative inline-block pb-2">
        {label}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-full bg-current group-hover/nav:scale-x-100 group-aria-[current=true]/nav:scale-x-100 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-[calc(50%-1px)] rounded-full bg-current opacity-0 ring-[3px] ring-background transition-opacity group-hover/nav:opacity-100 group-aria-[current=true]/nav:opacity-100"
        />
      </span>
    </Link>
  );

  return (
    // Its own view-transition name keeps it still while the page glides or crossfades beneath it. Mostly
    // opaque with a blur, so the page shows through faintly but the links stay legible; solid without blur.
    <header className="sticky top-0 z-40 border-b border-border bg-background [view-transition-name:site-header] supports-backdrop-filter:bg-background/85 supports-backdrop-filter:backdrop-blur-md">
      {/* Three columns from tablet width, so the links sit in the true middle whatever is either side. */}
      <div className="mx-auto flex h-(--header-h) max-w-7xl items-center gap-3 px-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* The signature: on first load K, then W, appear in the mark and the name types out (CSS in
            globals.css, so it plays from first paint and never replays on navigation). Clipping doesn't hide
            text from screen readers, so the name is read once, whole; phones show only the mark. */}
        <Link href="/" onClick={() => setOpen(false)} className="mr-auto flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-sm border-2 border-accent font-display text-xl text-accent"
          >
            <span>
              <span className="sig-k">K</span>
              <span className="sig-w">W</span>
            </span>
          </span>
          {/* The link's name is this visible text (so voice control can say it), plus "home" for screen readers. */}
          <span className="relative font-mono text-[1.15rem] font-bold max-sm:sr-only">
            <span className="sig-name inline-block">{profile.name}</span>
            <span
              aria-hidden="true"
              className="sig-caret absolute top-1/2 h-[1.1em] w-[0.55em] -translate-y-1/2 bg-accent opacity-0"
            />
          </span>
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Main" className="max-md:hidden">
          <ul className="flex gap-10">
            {navItems.map((item) => (
              <li key={item.id}>{navLink(item, "block pt-2 text-[0.95rem]")}</li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:justify-self-end">
          <a
            href={profile.cv}
            download
            className="inline-flex h-11 items-center gap-2 rounded-md border border-accent px-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <span className="sr-only">Download </span>CV<span className="sr-only"> (PDF)</span>
            <Icon d={icons.download} />
          </a>

          <ThemeToggle />

          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            className="flex h-11 min-w-11 flex-col items-center justify-center text-[0.7rem] leading-none md:hidden"
          >
            <Icon d={open ? icons.close : icons.menu} className="size-6" />
            Menu
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 pb-3">
          {navItems.map((item) => (
            <li key={item.id} className="border-b border-border last:border-0">
              {navLink(item, "block pt-3.5 pb-2 text-lg")}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
