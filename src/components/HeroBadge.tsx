// A link styled as a circular badge. The circling text is decorative (aria-hidden) so the
// link is announced once, by its label. textLength stretches any text to fill the circle.
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
        <text className="fill-accent font-mono" fontSize="7" textLength="238" lengthAdjust="spacing">
          <textPath href="#hero-badge-circle">{text}</textPath>
        </text>
        <path
          d="M50 34 V64 M38 53 L50 65 L62 53"
          fill="none"
          className="stroke-accent"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
