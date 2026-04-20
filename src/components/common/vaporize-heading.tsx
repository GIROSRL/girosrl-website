"use client"

import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

// Lazy-load: il canvas-based VaporizeTextCycle è heavy (getImageData + particles).
// Caricamento client-side only + only quando la pagina è montata.
const VaporizeTextCycle = dynamic(
  () => import("@/components/ui/vapour-text-effect"),
  { ssr: false, loading: () => null }
)

type VaporizeHeadingProps = {
  /** Lista testi che si alternano ciclicamente */
  texts: string[]
  /** Dimensione font in px (default 88 = hero page) */
  fontSize?: number
  /** Font weight (default 700 = Playfair bold) */
  fontWeight?: number
  /** Colore testo (hex/rgb) — accetta rgb(r,g,b) */
  color?: string
  /** Tag semantico per SEO (default h1) */
  tag?: "h1" | "h2" | "h3" | "p"
  /** Wait duration tra cicli (sec) */
  waitDuration?: number
  /** Vaporize duration (sec) */
  vaporizeDuration?: number
  className?: string
}

/**
 * Heading wrapper standardizzato per le pagine /servizi e /percorsi.
 * - Font Playfair Display (brand display)
 * - Preserva SEO via tag nascosto
 * - Altezza intrinseca fissa (canvas ha bisogno di wrapper dimensioni)
 */
export function VaporizeHeading({
  texts,
  fontSize = 88,
  fontWeight = 700,
  color = "rgb(240, 244, 255)",
  tag = "h1",
  waitDuration = 2.2,
  vaporizeDuration = 1.6,
  className,
}: VaporizeHeadingProps) {
  // Altezza wrapper: proporzionale al fontSize, con margine per discendenti
  const wrapperHeight = Math.round(fontSize * 1.6)

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: `${wrapperHeight}px` }}
    >
      <VaporizeTextCycle
        texts={texts}
        font={{
          fontFamily: "Playfair Display, Georgia, serif",
          fontSize: `${fontSize}px`,
          fontWeight,
        }}
        color={color}
        spread={5}
        density={5}
        animation={{
          vaporizeDuration,
          fadeInDuration: 0.9,
          waitDuration,
        }}
        direction="left-to-right"
        alignment="left"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tag={tag as any}
      />
    </div>
  )
}
