"use client"

import dynamic from "next/dynamic"
import { useEffect, useId, useState } from "react"
import type { ISourceOptions } from "@tsparticles/engine"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Particles è importato dinamicamente (no SSR) così il chunk tsparticles
 * resta fuori dal bundle iniziale. Il caricamento parte SOLO quando la
 * componente monta lato client — ulteriormente saltato in reduced-motion.
 */
const Particles = dynamic(
  () => import("@tsparticles/react").then((m) => m.default),
  { ssr: false, loading: () => null },
)

type SparklesProps = {
  className?: string
  size?: number
  minSize?: number | null
  density?: number
  speed?: number
  minSpeed?: number | null
  opacity?: number
  opacitySpeed?: number
  minOpacity?: number | null
  color?: string
  background?: string
  options?: Partial<ISourceOptions>
}

/**
 * Campo di particelle "stellari" con tsparticles slim.
 * - Dynamic import: il chunk particles non è nel bundle iniziale.
 * - `prefers-reduced-motion`: se l'utente lo richiede, nulla viene caricato.
 * - Engine inizializzato lazy solo al primo mount effettivo.
 */
export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    let cancelled = false
    Promise.all([
      import("@tsparticles/react"),
      import("@tsparticles/slim"),
    ]).then(([reactMod, slimMod]) => {
      if (cancelled) return
      reactMod
        .initParticlesEngine(async (engine) => {
          await slimMod.loadSlim(engine)
        })
        .then(() => {
          if (!cancelled) setIsReady(true)
        })
    })
    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion])

  const id = useId()

  // Reduced motion: fallback statico con dots via CSS radial (no JS runtime).
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none", className)}
        style={{
          backgroundImage:
            "radial-gradient(1.2px 1.2px at 20% 30%, rgba(184,207,232,0.55) 0%, transparent 100%), radial-gradient(1px 1px at 70% 60%, rgba(184,207,232,0.4) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 45% 80%, rgba(184,207,232,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 85% 25%, rgba(184,207,232,0.35) 0%, transparent 100%)",
          backgroundSize: "320px 320px",
          opacity: 0.6,
        }}
      />
    )
  }

  if (!isReady) return null

  const defaultOptions: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 60,
    particles: {
      color: { value: color },
      move: {
        enable: true,
        direction: "none",
        speed: { min: minSpeed ?? speed / 10, max: speed },
        straight: false,
      },
      number: { value: density },
      opacity: {
        value: { min: minOpacity ?? opacity / 10, max: opacity },
        animation: { enable: true, sync: false, speed: opacitySpeed },
      },
      size: {
        value: { min: minSize ?? size / 2.5, max: size },
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id={id}
      options={{ ...defaultOptions, ...options }}
      {...(className ? { className } : {})}
    />
  )
}
