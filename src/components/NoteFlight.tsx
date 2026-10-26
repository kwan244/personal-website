"use client";

import { useEffect } from "react";

// Clicking a sticky note on the desk takes you to its project card (a plain in-page link). Where the View
// Transitions API exists and motion is allowed, the page glides up to the card while the note flies down and
// sticks on its corner (the screenshot's, for featured projects), then fades away. Styles in globals.css.
export function NoteFlight() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const note = (event.target as Element).closest<HTMLAnchorElement>(".desk-note a");
      const card = note && document.getElementById(note.hash.slice(1));
      if (!note || !card || !document.startViewTransition) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      // One flight at a time: a double-click would otherwise skip the first mid-way and break the second.
      const root = document.documentElement;
      if ("noteFlight" in root.dataset) return;
      root.dataset.noteFlight = "";

      // A flat copy of the note, sized like the original (which is drawn in perspective on the desk).
      const sticker = note.cloneNode(true) as HTMLElement;
      sticker.removeAttribute("href");
      sticker.setAttribute("aria-hidden", "true");
      sticker.inert = true;
      const w = note.offsetWidth;
      const h = note.offsetHeight;
      Object.assign(sticker.style, {
        position: "absolute",
        zIndex: "10",
        width: `${w}px`,
        height: `${h}px`,
        fontSize: getComputedStyle(note).fontSize,
        pointerEvents: "none",
        transformOrigin: "100% 0",
      });

      note.style.viewTransitionName = "note-flight";
      const transition = document.startViewTransition(() => {
        note.style.viewTransitionName = "";
        // Before scrolling, so Back returns to the hero like a normal anchor link.
        history.pushState(null, "", note.hash);
        card.scrollIntoView({ block: "center", behavior: "instant" });
        // Pinned half over the target's top-right corner, about 30% as wide as it.
        const target = (card.querySelector("img") ?? card).getBoundingClientRect();
        const box = card.getBoundingClientRect();
        const scale = Math.min(1, (target.width * 0.3) / w);
        sticker.style.left = `${target.right - box.left - 20 - w}px`;
        sticker.style.top = `${target.top - box.top - h * scale * 0.3}px`;
        sticker.style.transform = `rotate(3deg) scale(${scale})`;
        sticker.style.viewTransitionName = "note-flight";
        card.append(sticker);
      });
      transition.finished.finally(() => {
        delete root.dataset.noteFlight;
        sticker.style.viewTransitionName = "";
        // Unless Back was pressed mid-flight: then the page is at the hero again and focus stays there.
        if (location.hash === note.hash) card.querySelector("a")?.focus({ preventScroll: true });
        sticker
          .animate({ opacity: 0 }, { duration: 500, delay: 700, easing: "ease-in", fill: "forwards" })
          .finished.then(() => sticker.remove());
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
