"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The hero frame. While a mouse-like pointer is over it, sets data-tilt and --mx / --my (-1 to 1: the
// pointer's position from the centre) for the CSS tilt in globals.css. Never when reduced motion is asked for.
export function ParallaxFrame({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    let frame = 0;
    let settle = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      frame = requestAnimationFrame(() => {
        el.dataset.tilt = "";
        const box = el.getBoundingClientRect();
        set(((event.clientX - box.left) / box.width) * 2 - 1, ((event.clientY - box.top) / box.height) * 2 - 1);
      });
    };
    // Ease back to level, then drop the transform once the transition has finished.
    const leave = () => {
      cancelAnimationFrame(frame);
      set(0, 0);
      settle = window.setTimeout(() => delete el.dataset.tilt, 700);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
