// A round sticker that links somewhere. The circling text is decorative (aria-hidden) so the link
// is announced once, by its label. textLength stretches any text to fill the circle.
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
  return (
    <a href={href} aria-label={label} className={`block rounded-full ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full">
        <defs>
          <path id="hero-badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill="#08140d" stroke="#a1f3ce" strokeOpacity=".5" strokeWidth="1.2" />
        <text className="badge-spin fill-[#6ee7b7] font-mono" fontSize="7" textLength="238" lengthAdjust="spacing">
          <textPath href="#hero-badge-circle">{text}</textPath>
        </text>
        <path
          d="M50 34 V64 M38 53 L50 65 L62 53"
          fill="none"
          className="stroke-[#6ee7b7]"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
