"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type LogoAnimatedProps = {
  href?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "dark" | "light"
  showClaim?: boolean
}

/**
 * Viewbox interno fisso (350 × 100) replica il logo brandbook in scala ridotta.
 * La dimensione visibile è controllata via width/height — le proporzioni rimangono identiche.
 */
const sizes = {
  sm: { w: 120, h: 34 },
  md: { w: 150, h: 42 },
  lg: { w: 200, h: 56 },
}

export function LogoAnimated({
  href = "/",
  className,
  size = "md",
  variant = "dark",
  showClaim = false,
}: LogoAnimatedProps) {
  const { w, h } = sizes[size]

  const c =
    variant === "dark"
      ? {
          wordmark: "#ffffff",
          srl: "#3a8fe8",
          line: "#3a8fe8",
          claim: "#7ec0f0",
          ringOuter: "#1a3a6e",
          ringMid: "#2d6abf",
          ringInner: "#1e4a8a",
          core: "#3a8fe8",
          satellite: "#5bb3f0",
          arc: "#3a8fe8",
          dashedLine: "#2d6abf",
        }
      : {
          wordmark: "#080d1a",
          srl: "#1a5faa",
          line: "#1a5faa",
          claim: "#1a5faa",
          ringOuter: "#b8cfe8",
          ringMid: "#3a8fe8",
          ringInner: "#a0bcd8",
          core: "#1a5faa",
          satellite: "#3a8fe8",
          arc: "#1a5faa",
          dashedLine: "#3a8fe8",
        }

  const svg = (
    <motion.svg
      width={w}
      height={h}
      viewBox="0 0 350 100"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Symbol — centered at 50,50, r=30 outer */}
      <g transform="translate(50, 50)">
        {/* Outer dashed ring — rotates on hover */}
        <motion.g
          variants={{ rest: { rotate: 0 }, hover: { rotate: 360 } }}
          transition={{ duration: 12, ease: "linear" }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        >
          <circle
            cx="0"
            cy="0"
            r="30"
            fill="none"
            stroke={c.ringOuter}
            strokeWidth="0.8"
            strokeDasharray="3 2.5"
          />
        </motion.g>
        {/* Mid ring */}
        <circle cx="0" cy="0" r="20" fill="none" stroke={c.ringMid} strokeWidth="1.2" />
        {/* Inner ring */}
        <circle cx="0" cy="0" r="12" fill="none" stroke={c.ringInner} strokeWidth="0.6" />
        {/* Arc */}
        <motion.path
          d="M -30 0 A 30 30 0 0 1 0 -30"
          fill="none"
          stroke={c.arc}
          strokeWidth="1.8"
          strokeLinecap="round"
          variants={{
            rest: { pathLength: 1, opacity: 1 },
            hover: { pathLength: [0.3, 1], opacity: 1 },
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Dashed connector */}
        <line
          x1="5"
          y1="-5"
          x2="18"
          y2="-18"
          stroke={c.dashedLine}
          strokeWidth="0.7"
          strokeDasharray="2 2"
        />
        {/* Satellite */}
        <motion.circle
          cx="21"
          cy="-21"
          r="3.3"
          fill={c.satellite}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.3 } }}
          transition={{ duration: 0.25 }}
          style={{ transformOrigin: "21px -21px" }}
        />
        {/* Core */}
        <motion.circle
          cx="0"
          cy="0"
          r="6.5"
          fill={c.core}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "center", transformBox: "fill-box" }}
        />
      </g>

      {/* Wordmark GIRO */}
      <text
        x="100"
        y="48"
        fontFamily="'Helvetica Neue', Inter, Arial, sans-serif"
        fontSize="30"
        fontWeight="200"
        letterSpacing="7.5"
        fill={c.wordmark}
      >
        GIRO
      </text>

      {/* SRL */}
      <text
        x="101"
        y="62"
        fontFamily="'Helvetica Neue', Inter, Arial, sans-serif"
        fontSize="8"
        fontWeight="300"
        letterSpacing="4"
        fill={c.srl}
      >
        SRL
      </text>

      {/* Line */}
      <line x1="100" y1="70" x2="340" y2="70" stroke={c.line} strokeWidth="1" strokeLinecap="round" />

      {/* Claim (optional) */}
      {showClaim && (
        <text
          x="100"
          y="84"
          fontFamily="'Helvetica Neue', Inter, Arial, sans-serif"
          fontSize="7"
          fontWeight="300"
          letterSpacing="1.8"
          fill={c.claim}
        >
          UN SOLO PARTNER. INFINITE DIREZIONI.
        </text>
      )}
    </motion.svg>
  )

  const classes = cn("inline-flex items-center group", className)

  if (href) {
    return (
      <Link href={href} className={classes} aria-label="GI.R.O. SRL — Home">
        {svg}
      </Link>
    )
  }

  return (
    <div className={classes} aria-label="GI.R.O. SRL">
      {svg}
    </div>
  )
}
