"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Icon, icons } from "@/components/Icon";

const darkQuery = "(prefers-color-scheme: dark)";

// What's showing: the saved pick on <html data-theme>, else the system's.
function isDark() {
  const pick = document.documentElement.dataset.theme;
  return pick ? pick === "dark" : matchMedia(darkQuery).matches;
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  const media = matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

function savedTheme() {
  try {
    const theme = localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch {
    return null; // storage blocked: the theme just won't be remembered
  }
}

// Switches between light and dark and remembers the pick (the layout's script applies it on the next load).
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  // Dev only: Strict Mode's remount clears the attribute the layout script set, so put it back before paint.
  useLayoutEffect(() => {
    const theme = savedTheme();
    if (theme) document.documentElement.dataset.theme = theme;
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      aria-pressed={dark}
      onClick={toggle}
      className="grid size-11 place-items-center rounded-md border border-border transition-colors hover:border-accent hover:text-accent"
    >
      <span className="sr-only">Dark theme</span>
      {/* The icon offers the other theme; CSS picks it, so it's right from first paint. */}
      <Icon d={icons.moon} className="size-5 dark:hidden" />
      <Icon d={icons.sun} className="hidden size-5 dark:block" />
    </button>
  );
}
