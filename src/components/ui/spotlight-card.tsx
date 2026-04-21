"use client"

import React, { useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Perf-first: la card attiva SOLO quando il cursore ci passa sopra.
 * - Listener aggiunto on mouseenter, rimosso on mouseleave
 * - Nessun `background-attachment: fixed` (che forzava repaint viewport-wide
 *   su tutte le card ad ogni frame)
 * - Coordinate relative alla card, non al viewport
 *
 * Risultato: 5 GlowCard idle = 0 listener attivi + 0 paint. Hovered card =
 * 1 listener + 1 paint a frame (solo sul proprio rect).
 */

type GlowColorPreset = "blue" | "purple" | "green" | "red" | "orange"

type GlowCardProps = {
  children?: ReactNode
  className?: string
  glowColor?: GlowColorPreset
  /** Hue base HSL (0..360). Override del preset glowColor. */
  hue?: number
  /** Range di shift hue col movimento pointer. Default 80. */
  spread?: number
  /** Saturation HSL percentuale. Default 90. */
  saturation?: number
  /** Lightness HSL percentuale. Default 62. */
  lightness?: number
  /** Bordo radius in px (default 16) */
  radius?: number
  /** Spessore bordo luminoso in px (default 1.5) */
  border?: number
  size?: "sm" | "md" | "lg"
  width?: string | number
  height?: string | number
  /** Se true, NON applica size preset né aspect ratio — usa className/style */
  customSize?: boolean
  style?: CSSProperties
}

const glowColorMap: Record<GlowColorPreset, { base: number; spread: number }> = {
  blue: { base: 210, spread: 40 },
  purple: { base: 270, spread: 60 },
  green: { base: 160, spread: 40 },
  red: { base: 340, spread: 40 },
  orange: { base: 30, spread: 40 },
}

const sizeMap: Record<NonNullable<GlowCardProps["size"]>, string> = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
}

/**
 * Card con bordo luminoso che reagisce al movimento del pointer.
 * Adattato da un componente spotlight di referenza: listener pointer sul document
 * (ogni card viene illuminata in coerenza con una singola "sorgente di luce"),
 * `background-attachment: fixed` → la sfumatura è ancorata in viewport coords.
 */
export function GlowCard({
  children,
  className,
  glowColor = "blue",
  hue,
  spread,
  saturation = 90,
  lightness = 62,
  radius = 16,
  border = 1.5,
  size = "md",
  width,
  height,
  customSize = false,
  style,
}: GlowCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  // Listener hover-gated: attivo solo quando il cursore sta sopra la card.
  // Scrive coords LOCALI (relative alla card) — niente repaint su altre card.
  useEffect(() => {
    if (prefersReducedMotion) return
    const el = cardRef.current
    if (!el) return

    let rafId = 0
    let pending: PointerEvent | null = null

    const apply = () => {
      rafId = 0
      if (!pending || !cardRef.current) return
      const e = pending
      pending = null
      const rect = cardRef.current.getBoundingClientRect()
      const lx = e.clientX - rect.left
      const ly = e.clientY - rect.top
      cardRef.current.style.setProperty("--glow-x", lx.toFixed(2))
      cardRef.current.style.setProperty("--glow-y", ly.toFixed(2))
      cardRef.current.style.setProperty(
        "--glow-xp",
        (lx / Math.max(1, rect.width)).toFixed(3)
      )
    }
    const onMove = (e: PointerEvent) => {
      pending = e
      if (!rafId) rafId = requestAnimationFrame(apply)
    }
    const onEnter = () => {
      el.style.setProperty("--bg-spot-opacity", "0.12")
      el.style.setProperty("--border-spot-opacity", "1")
      el.style.setProperty("--border-light-opacity", "0.85")
      el.addEventListener("pointermove", onMove, { passive: true })
    }
    const onLeave = () => {
      el.removeEventListener("pointermove", onMove)
      el.style.setProperty("--bg-spot-opacity", "0")
      el.style.setProperty("--border-spot-opacity", "0")
      el.style.setProperty("--border-light-opacity", "0")
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }

    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointerleave", onLeave)
      el.removeEventListener("pointermove", onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])

  const preset = glowColorMap[glowColor]
  const baseHue = hue ?? preset.base
  const hueSpread = spread ?? preset.spread

  const sizeClass = customSize ? "" : sizeMap[size]
  const aspect = customSize ? "" : "aspect-[3/4]"

  const inlineStyles: CSSProperties & Record<string, string | number> = {
    ...(style as Record<string, string | number> | undefined),
    "--base": String(baseHue),
    "--spread": String(hueSpread),
    "--radius": String(radius),
    "--border": String(border),
    "--backdrop": "transparent",
    "--backup-border": "rgba(255,255,255,0.06)",
    "--size": "220",
    "--outer": "1",
    "--saturation": String(saturation),
    "--lightness": String(lightness),
    "--border-size": "calc(var(--border, 1.5) * 1px)",
    "--spotlight-size": "calc(var(--size, 220) * 1px)",
    "--hue": "calc(var(--base) + (var(--glow-xp, 0) * var(--spread, 0)))",
    // opacity iniziale 0 (invisibile). hover listener la porta a 0.12 (vedi onEnter sopra).
    "--bg-spot-opacity": "0",
    "--border-spot-opacity": "0",
    "--border-light-opacity": "0",
    backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--glow-x, 0) * 1px) calc(var(--glow-y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 90) * 1%) calc(var(--lightness, 62) * 1%) / var(--bg-spot-opacity, 0)), transparent)`,
    backgroundSize: "100% 100%",
    backgroundPosition: "0 0",
    // background-attachment: fixed rimosso — gradient relativo alla card
    border: "var(--border-size) solid var(--backup-border)",
    borderRadius: "calc(var(--radius) * 1px)",
    position: "relative",
    touchAction: "auto",
    transition: "--bg-spot-opacity 0.2s ease, --border-spot-opacity 0.2s ease",
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
  }

  return (
    <div
      ref={cardRef}
      data-giro-glow
      style={inlineStyles as CSSProperties}
      className={cn(sizeClass, aspect, "relative", className)}
    >
      <div data-giro-glow aria-hidden />
      {children}
    </div>
  )
}
