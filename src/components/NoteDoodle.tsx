import type { NoteDoodle as Doodle } from "@/content/projects";

// Small pen sketches for the sticky notes, drawn on a 24-high grid in round-capped strokes so they read
// as ink. Decorative: the note's title and label already say what the project is.
const sketches: Record<Doodle, string[]> = {
  brain: [
    "M12 5c-1.5-1.8-4.6-1.6-5.4.6-2 .2-3.1 2.3-2.2 4-1.4 1-1.2 3.4.4 4.2-.2 2 1.6 3.6 3.6 3.2.9 1.4 2.9 1.5 3.6 0",
    "M12 5c1.5-1.8 4.6-1.6 5.4.6 2 .2 3.1 2.3 2.2 4 1.4 1 1.2 3.4-.4 4.2.2 2-1.6 3.6-3.6 3.2-.9 1.4-2.9 1.5-3.6 0",
    "M12 5.2v12.6",
    "M8.4 9.4c1 .3 1.6 1 1.7 2M15.6 9.4c-1 .3-1.6 1-1.7 2M8 14.2c.9-.6 2-.6 2.8.1M16 14.2c-.9-.6-2-.6-2.8.1",
  ],
  dumbbell: ["M3.5 12.2H6M18 11.8h2.5M8.5 12.1h7", "M6 8.6v6.9M8.5 6.9v10.3M15.5 7v10.1M18 8.4v7"],
  plate: [
    "M15.5 4a8 8 0 1 1-.1 0z",
    "M15.5 7a5 5 0 1 1-.1 0z",
    "M1.4 4v4.1M3.2 4v4.1M5 4v4.1M1.4 8.1c0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8M3.2 9.9V20",
    "M29.2 4v16M29.2 4c-1.2.9-1.8 3.1-1.8 5.7 0 .6.4 1 1 1h.8",
  ],
  magnifier: [
    "M10.5 4.9a5.6 5.6 0 1 1-.1 0z",
    "M14.6 14.7l5.6 5.4",
    "M8.9 9c.2-1 1-1.6 1.9-1.5.9.1 1.5.9 1.3 1.8-.2.8-1.3 1.1-1.3 2.1M10.8 13.3v.1",
  ],
  fist: [
    "M6.6 12.2V9.3a1.55 1.55 0 0 1 3.1 0v2.4M9.7 11.6V8.5a1.55 1.55 0 0 1 3.1 0v3",
    "M12.8 11.5V8.7a1.55 1.55 0 0 1 3.1 0v2.9M15.9 11.7V9.8a1.45 1.45 0 0 1 2.9 0v3.6",
    "M6.6 12.2c-1 .5-1.5 1.6-1.3 2.8.4 2.6 2.4 4.6 5 5.2 1.4.3 2.9.3 4.3 0 2.5-.6 4.3-2.9 4.2-5.6v-1.2",
    "M6.7 13.4c1.7-.5 3.5-.3 4.9.6.6.4.5 1.3-.2 1.5-1.4.4-2.8.2-4-.4M12.2 12.6h6.4",
  ],
};

// Most sketches are 24 × 24; the place setting needs room for a full-size plate between fork and knife.
const widths: Partial<Record<Doodle, number>> = { plate: 31 };

export function NoteDoodle({ kind, className }: { kind: Doodle; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${widths[kind] ?? 24} 24`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {sketches[kind].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
