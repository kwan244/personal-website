// A round sticker that links somewhere. The circling text is drawn aria-hidden and spoken as part of the
// link's name instead ("Creativity sparks, greatness in progress: see my projects"), so the name includes
// what's visible, as voice control needs. textLength stretches any text to fill the circle.
export function HeroBadge({
  text,
  href,
  label,
  className,
}: {
  text: string;
  href: string;
  label: string;
  className?: string;
}) {
  const spoken = text
    .split("✦")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .join(", ");
  return (
    <a
      href={href}
      aria-label={`${spoken.charAt(0).toUpperCase()}${spoken.slice(1)}: ${label}`}
      className={`hero-badge block rounded-full ${className ?? ""}`}
    >
      <svg viewBox="-50 -50 100 100" aria-hidden="true" className="size-full">
        <defs>
          <path id="hero-badge-circle" d="M -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle r="48" fill="#08140d" stroke="#a1f3ce" strokeOpacity=".5" strokeWidth="1.2" />
        {/* The slow spin, plus a second spin that only runs while the badge is hovered or focused. Both turn
            about the origin, which the viewBox centres: Safari misplaces a CSS transform-origin here. */}
        <g className="badge-boost">
          <text className="badge-spin fill-[#6ee7b7] font-mono" fontSize="7" textLength="238" lengthAdjust="spacing">
            <textPath href="#hero-badge-circle">{text}</textPath>
          </text>
        </g>
        <path
          d="M0 -16 V14 M-12 3 L0 15 L12 3"
          fill="none"
          className="badge-arrow stroke-[#6ee7b7]"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
