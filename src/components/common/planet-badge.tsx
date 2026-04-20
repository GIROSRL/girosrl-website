type PlanetBadgeProps = {
  color: string
  size?: number
}

/**
 * Mini-pianeta SVG decorativo da mettere accanto a un titolo.
 * Replica visivamente lo stile del pianeta 3D (core + glow + orbit ring).
 */
export function PlanetBadge({ color, size = 56 }: PlanetBadgeProps) {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* Orbit ring esterno */}
      <ellipse
        cx="30"
        cy="30"
        rx="26"
        ry="10"
        stroke={color}
        strokeWidth="0.6"
        strokeDasharray="2 2"
        opacity="0.4"
      />
      {/* Glow esterno */}
      <circle cx="30" cy="30" r="16" fill={color} opacity="0.12" />
      {/* Glow interno */}
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.2" />
      {/* Core */}
      <circle cx="30" cy="30" r="8" fill={color} />
      {/* Highlight */}
      <circle cx="27" cy="27" r="2.5" fill="#ffffff" opacity="0.5" />
    </svg>
  )
}
