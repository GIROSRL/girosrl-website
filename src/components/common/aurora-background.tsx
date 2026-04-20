"use client"

import { useMemo } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type AuroraBackgroundProps = {
  /** Colore dominante (hex o rgb/rgba) — default blu brand */
  accent?: string
  /** Colore secondario per blob 2 (default: accent stesso) */
  secondary?: string
  /** Intensità 0..1 (default 0.55) — quanto "visibile" è l'aurora */
  intensity?: number
  className?: string
}

const ALPHA_STRONG = 0xaa
const ALPHA_MID = 0x77
const ALPHA_SOFT = 0x55

function alphaHex(base: string, alphaByte: number): string {
  // Accetta #RRGGBB e ritorna #RRGGBBAA. Se il formato non è hex, restituisce base (fallback).
  if (/^#([0-9a-fA-F]{6})$/.test(base)) {
    const a = alphaByte.toString(16).padStart(2, "0")
    return `${base}${a}`
  }
  return base
}

/**
 * Aurora background CSS-only.
 * 3 blob radiali che si spostano lentamente tramite background-position.
 * Fixed inset-0 -z-10 pointer-events-none. Rispetta prefers-reduced-motion.
 */
export function AuroraBackground({
  accent = "#3a8fe8",
  secondary,
  intensity = 0.55,
  className,
}: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const sec = secondary ?? accent

  const { strong, mid, soft, strongSec } = useMemo(() => {
    const clamp = Math.max(0, Math.min(1, intensity))
    return {
      strong: alphaHex(accent, Math.round(ALPHA_STRONG * clamp)),
      mid: alphaHex(accent, Math.round(ALPHA_MID * clamp)),
      soft: alphaHex(accent, Math.round(ALPHA_SOFT * clamp)),
      strongSec: alphaHex(sec, Math.round(ALPHA_MID * clamp)),
    }
  }, [accent, sec, intensity])

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Base navy gradient fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-mid) 100%)",
        }}
      />

      {/* Blob 1 — dominante, alto-sinistra */}
      <div
        className={cn(
          "absolute -inset-[20%]",
          !prefersReducedMotion && "aurora-blob-1",
        )}
        style={{
          backgroundImage: `radial-gradient(60% 50% at 25% 30%, ${strong} 0%, ${accent}00 60%)`,
          filter: "blur(60px)",
          mixBlendMode: "screen",
          opacity: 0.95,
        }}
      />

      {/* Blob 2 — secondario, basso-destra */}
      <div
        className={cn(
          "absolute -inset-[20%]",
          !prefersReducedMotion && "aurora-blob-2",
        )}
        style={{
          backgroundImage: `radial-gradient(55% 45% at 75% 75%, ${strongSec} 0%, ${sec}00 60%)`,
          filter: "blur(80px)",
          mixBlendMode: "screen",
          opacity: 0.85,
        }}
      />

      {/* Blob 3 — accent basso-centro */}
      <div
        className={cn(
          "absolute -inset-[25%]",
          !prefersReducedMotion && "aurora-blob-3",
        )}
        style={{
          backgroundImage: `radial-gradient(50% 40% at 50% 95%, ${mid} 0%, ${accent}00 65%)`,
          filter: "blur(100px)",
          mixBlendMode: "screen",
          opacity: 0.75,
        }}
      />

      {/* Soft vignette top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />

      {/* Vignette perimetrale leggera (mantiene leggibilità del contenuto) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 90% at 50% 50%, transparent 65%, rgba(8,13,26,0.45) 100%)",
        }}
      />

      {/* Soft noise texture (static, low-cost) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1.2px 1.2px at 23% 18%, rgba(255,255,255,0.35) 0%, transparent 100%), radial-gradient(1px 1px at 67% 82%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 82% 22%, rgba(255,255,255,0.28) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 12% 72%, rgba(255,255,255,0.25) 0%, transparent 100%)",
          opacity: 0.5,
          mixBlendMode: "screen",
        }}
      />

      {/* Thin inset soft hint del secondary */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 90% 10%, ${soft} 0%, transparent 50%)`,
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      <style>{`
        @keyframes aurora-shift-1 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          33%  { transform: translate3d(6%, 4%, 0) scale(1.08); }
          66%  { transform: translate3d(-4%, 8%, 0) scale(0.96); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        @keyframes aurora-shift-2 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          50%  { transform: translate3d(-8%, -6%, 0) scale(1.12); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        @keyframes aurora-shift-3 {
          0%   { transform: translate3d(0%, 0%, 0) scale(1); }
          40%  { transform: translate3d(10%, -4%, 0) scale(0.92); }
          80%  { transform: translate3d(-6%, 6%, 0) scale(1.05); }
          100% { transform: translate3d(0%, 0%, 0) scale(1); }
        }
        .aurora-blob-1 {
          animation: aurora-shift-1 26s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-blob-2 {
          animation: aurora-shift-2 34s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-blob-3 {
          animation: aurora-shift-3 42s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob-1, .aurora-blob-2, .aurora-blob-3 { animation: none; }
        }
      `}</style>
    </div>
  )
}
