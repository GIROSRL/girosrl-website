"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type TabletMockupProps = {
  children?: ReactNode
  className?: string
  /** Colore accent per la cornice/glow */
  accent?: string
}

/**
 * Tablet mockup statico — cornice scura elegante stile iPad Pro.
 * Accetta children per il contenuto dello schermo (immagine, iframe, placeholder).
 * Zero WebGL, zero overhead. Look ispirato a ContainerScroll Aceternity.
 */
export function TabletMockup({ children, className, accent = "#3a8fe8" }: TabletMockupProps) {
  return (
    <div
      className={cn("relative w-full max-w-2xl mx-auto", className)}
      style={{
        perspective: "1200px",
      }}
    >
      <div
        className="relative aspect-[4/3] rounded-[24px] p-3 md:p-4 border-2"
        style={{
          background: "linear-gradient(180deg, #2a2a30 0%, #1a1a20 50%, #0a0a0f 100%)",
          borderColor: "#4a4a52",
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px ${accent}22`,
        }}
      >
        {/* Camera dot */}
        <div
          aria-hidden
          className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#0a0a0d", boxShadow: "inset 0 0 2px rgba(255,255,255,0.15)" }}
        />
        {/* Screen */}
        <div
          className="relative w-full h-full rounded-[16px] overflow-hidden"
          style={{
            background: "#080d1a",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {children}
        </div>
      </div>
      {/* Ground shadow */}
      <div
        aria-hidden
        className="absolute -bottom-4 left-[8%] right-[8%] h-6 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  )
}
