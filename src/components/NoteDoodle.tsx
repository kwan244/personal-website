import type { NoteDoodle as Doodle } from "@/content/projects";

// Small pen sketches for the sticky notes, drawn on a 24 × 24 grid in round-capped strokes so they read
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
    "M12 5.5a6.4 6.4 0 1 1-.1 0z",
    "M12 8.3a3.7 3.7 0 1 1-.1 0z",
    "M3.4 4.5v4c0 1 .5 1.7 1.2 1.7s1.2-.7 1.2-1.7v-4M4.6 4.6v14.8",
    "M20.6 4.5c-1.2 1.6-1.5 4.2-.9 6.8h.9v8.1",
  ],
  magnifier: [
    "M10.5 4.9a5.6 5.6 0 1 1-.1 0z",
    "M14.6 14.7l5.6 5.4",
    "M8.9 9c.2-1 1-1.6 1.9-1.5.9.1 1.5.9 1.3 1.8-.2.8-1.3 1.1-1.3 2.1M10.8 13.3v.1",
  ],
  scissors: [
    "M6 4.4a2.6 2.6 0 1 1-.1 0zM6 14.4a2.6 2.6 0 1 1-.1 0z",
    "M8.3 8.4 20.2 16.3M8.3 15.6 20.2 7.8",
    "M13.4 12h.1",
  ],
};

export function NoteDoodle({ kind, className }: { kind: Doodle; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
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
