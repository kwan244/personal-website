"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The layers move towards the pointer at no more than MAX_SPEED (of the -1 to 1 range per second), so a
// fast flick glides instead of jolting, and ease out over the last stretch (EASE: share of the remaining
// distance per 60fps frame). Both are measured in time, so dropped frames don't cause jumps.
const MAX_SPEED = 1.6;
const EASE = 0.1;

// The hero frame. It marks itself data-offscreen while scrolled out of view, so globals.css can pause the
// hero's looping animations (they repaint the drawing every frame). And while a mouse-like pointer is over
// it, it moves --mx / --my (-1 to 1: the pointer's position from the centre) towards the pointer on the
// scene and the badge, for the CSS parallax. Never when reduced motion is asked for.
export function HeroFrame({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => el.toggleAttribute("data-offscreen", !entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    const layers = el.querySelectorAll<HTMLElement>(".desk-box, .desk-badge");
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let box: DOMRect | null = null; // measured once per hover, not on every pointer event
    let frame = 0;
    let last = 0;

    const step = (from: number, to: number, dt: number) => {
      const eased = (to - from) * (1 - Math.pow(1 - EASE, dt / 16.67));
      const cap = MAX_SPEED * (dt / 1000);
      return from + Math.max(-cap, Math.min(cap, eased));
    };
    // Runs only while the layers are still moving, then stops until the pointer moves again.
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      current.x = step(current.x, target.x, dt);
      current.y = step(current.y, target.y, dt);
      for (const layer of layers) {
        layer.style.setProperty("--mx", current.x.toFixed(4));
        layer.style.setProperty("--my", current.y.toFixed(4));
      }
      const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const aim = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const move = (event: PointerEvent) => {
      box ??= el.getBoundingClientRect();
      aim(((event.clientX - box.left) / box.width) * 2 - 1, ((event.clientY - box.top) / box.height) * 2 - 1);
    };
    const leave = () => {
      box = null;
      aim(0, 0);
    };
    const remeasure = () => (box = null);

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
