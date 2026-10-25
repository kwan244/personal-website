"use client";

import { useEffect, useRef } from "react";

// As the visitor scrolls from the hero to Projects, each sticky note lifts off the desk and flies into its
// project card. The flying notes are inert copies in a fixed layer; the real notes only fade, so they stay
// clickable and focusable. Scroll-scrubbed (it reverses when scrolling back up) and loaded lazily. It only
// runs where the notes sit on the desk (16:10 and wider) and motion is allowed; otherwise nothing happens.
const WHEN = "(prefers-reduced-motion: no-preference) and (min-aspect-ratio: 16/10)";

export function NotesToCards() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    // GSAP only downloads once the conditions first match, so phones and reduced motion never fetch it.
    const query = matchMedia(WHEN);
    const start = async () => {
      query.removeEventListener("change", onChange);
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !layer.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      revert = () => mm.revert();

      mm.add(WHEN, () => {
        const frame = document.querySelector<HTMLElement>(".desk-frame");
        if (!frame) return;
        const copies: HTMLElement[] = [];

        document.querySelectorAll<HTMLElement>("[data-note]").forEach((note, i) => {
          const slug = note.dataset.note;
          const paper = note.querySelector<HTMLElement>("a");
          const card = document.querySelector<HTMLElement>(`[data-card="${slug}"]`);
          const title = card?.querySelector<HTMLElement>("h3");
          if (!paper || !card || !title) return;

          // A flat copy of the note at its unprojected size, positioned with x/y from the layer's top-left.
          const copy = paper.cloneNode(true) as HTMLElement;
          copy.removeAttribute("href");
          copy.style.cssText = "position:absolute;left:0;top:0;margin:0;opacity:0";
          layer.current!.append(copy);
          copies.push(copy);

          const box = () => paper.getBoundingClientRect();
          const size = () => ({ w: paper.offsetWidth, h: paper.offsetHeight });
          const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;
          const tilt = i % 2 ? 1 : -1;
          const offTop = () => -size().h * 1.4; // y that puts the copy just above the viewport
          // Where it lands: pinned half over the top-right corner of the card's screenshot (featured projects)
          // or of the card itself, so it never covers the text; about 30% as wide as that target.
          const target = card.querySelector<HTMLElement>("img") ?? card;
          const landScale = () => Math.min(1, (target.getBoundingClientRect().width * 0.3) / size().w);
          const landX = () => target.getBoundingClientRect().right - 20 - (size().w * landScale()) / 2 - size().w / 2;
          const landY = () => docTop(target) - landEnd() - size().h / 2;

          gsap.set(copy, {
            width: () => size().w,
            height: () => size().h,
            fontSize: () => getComputedStyle(paper).fontSize,
            transformOrigin: "50% 50%",
          });

          // 1. Lift-off: while the hero scrolls away, the note leaves the desk and sails up out of view.
          const liftStart = () => docTop(frame) + frame.offsetHeight * 0.08;
          const liftEnd = () => docTop(frame) + frame.offsetHeight * (0.5 + i * 0.04);
          gsap
            .timeline({ scrollTrigger: { start: liftStart, end: liftEnd, scrub: 0.6, invalidateOnRefresh: true } })
            .fromTo(
              copy,
              {
                x: () => box().left + box().width / 2 - size().w / 2,
                y: () => box().top + window.scrollY - liftStart() + box().height / 2 - size().h / 2,
                scale: () => box().width / size().w,
                rotate: 4 * tilt,
              },
              {
                x: () => {
                  const from = box().left + box().width / 2 - size().w / 2;
                  return from + (landX() - from) * 0.3;
                },
                y: offTop,
                rotate: 14 * tilt,
                ease: "power2.in",
                duration: 1,
              },
              0,
            )
            .fromTo(copy, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0)
            .to(note, { opacity: 0.2, duration: 0.1, ease: "none" }, 0);

          // 2. Landing: as its card's title nears the middle of the screen, the note drops in onto the card, then
          // fades into it. A short range, so it never drifts over the text above.
          const landStart = () => Math.max(liftEnd() + 1, docTop(title) - window.innerHeight * 0.8);
          const landEnd = () => Math.max(landStart() + 1, docTop(title) - window.innerHeight * 0.45);
          gsap
            .timeline({ scrollTrigger: { start: landStart, end: landEnd, scrub: 0.6, invalidateOnRefresh: true } })
            .fromTo(
              copy,
              { x: landX, y: offTop, scale: () => landScale() * 1.3, rotate: -10 * tilt, immediateRender: false },
              { x: landX, y: landY, scale: landScale, rotate: 3 * tilt, ease: "power2.out", duration: 1 },
              0,
            )
            .to(copy, { opacity: 0, duration: 0.15, ease: "none" }, 0.85);
        });

        return () => copies.forEach((copy) => copy.remove());
      });
    };
    const onChange = () => query.matches && start();
    if (query.matches) start();
    else query.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      query.removeEventListener("change", onChange);
      revert?.();
    };
  }, []);

  return (
    <div ref={layer} aria-hidden="true" inert className="pointer-events-none fixed inset-0 z-30 overflow-hidden" />
  );
}
