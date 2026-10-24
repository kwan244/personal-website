// Decorative: hidden from screen readers. textLength stretches any badge text to fill the circle exactly.
export function HeroBadge({ text, className }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <path id="hero-badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-accent font-mono" fontSize="7.5" textLength="238" lengthAdjust="spacing">
        <textPath href="#hero-badge-circle">{text}</textPath>
      </text>
      <text x="50" y="58" textAnchor="middle" className="fill-accent font-display" fontSize="24">
        KW
      </text>
    </svg>
  );
}
