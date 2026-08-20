/**
 * Flat, on-brand bus illustration. Kept as an inline SVG (not a photo) so
 * it scales crisply at any size and can be animated (wheel spin) with CSS.
 */
export default function BusIllustration({ className }) {
  return (
    <svg viewBox="0 0 340 150" className={className} role="img" aria-label="Tour bus">
      {/* Body */}
      <rect x="10" y="30" width="300" height="80" rx="16" fill="var(--color-primary-navy)" />
      {/* Roof accent stripe */}
      <rect x="10" y="30" width="300" height="14" rx="7" fill="var(--color-secondary-navy)" />
      {/* Orange side stripe */}
      <rect x="10" y="86" width="300" height="12" fill="var(--color-accent-orange)" />
      {/* Windshield / front */}
      <path d="M 310 40 Q 330 40 330 60 L 330 92 Q 330 100 320 100 L 310 100 Z" fill="var(--color-secondary-navy)" />
      <rect x="315" y="48" width="12" height="24" rx="3" fill="var(--color-light-orange)" />

      {/* Passenger windows */}
      {[38, 90, 142, 194, 246].map((x) => (
        <rect key={x} x={x} y="42" width="38" height="30" rx="6" fill="var(--color-light-orange)" />
      ))}

      {/* Door */}
      <rect x="20" y="46" width="10" height="52" rx="3" fill="var(--color-secondary-navy)" />

      {/* Headlight */}
      <circle cx="322" cy="88" r="5" fill="var(--color-light-orange)" />

      {/* Wheels */}
      <g className="bus-wheel">
        <circle cx="80" cy="112" r="18" fill="#1a1f2b" />
        <circle cx="80" cy="112" r="8" fill="var(--color-light-cream)" />
      </g>
      <g className="bus-wheel">
        <circle cx="250" cy="112" r="18" fill="#1a1f2b" />
        <circle cx="250" cy="112" r="8" fill="var(--color-light-cream)" />
      </g>
    </svg>
  );
}
