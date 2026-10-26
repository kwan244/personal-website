// Thin line icons in the doodles' round-capped style; decorative, so the text beside them names the control.
export const icons = {
  download: "M12 4v11M7.5 10.5 12 15l4.5-4.5M5 16v3h14v-3",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  external: "M7 17 17 7M8 7h9v9",
  pin: "M19 10c0 4.6-5.2 9.4-6.6 10.6a.6.6 0 0 1-.8 0C10.2 19.4 5 14.6 5 10a7 7 0 0 1 14 0zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  github:
    "M15 21v-3.5a3.4 3.4 0 0 0-1-2.6c3.1-.3 6.3-1.5 6.3-6.8A5.3 5.3 0 0 0 18.9 4.5a4.9 4.9 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.3 13.3 0 0 0-7 0C5.4.5 4.2.9 4.2.9a4.9 4.9 0 0 0-.1 3.6 5.3 5.3 0 0 0-1.4 3.6c0 5.3 3.2 6.5 6.3 6.8a3.4 3.4 0 0 0-1 2.6V21M9 18.5c-3.5 1.1-3.5-1.8-5-2.2",
  linkedin:
    "M16 8.5a5.5 5.5 0 0 1 5.5 5.5v6.5H18V14a2 2 0 0 0-4 0v6.5h-3.5V14A5.5 5.5 0 0 1 16 8.5zM2.5 9.5H6v11H2.5zM4.25 2.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5z",
};

export function Icon({ d, className = "size-5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={d} />
    </svg>
  );
}
