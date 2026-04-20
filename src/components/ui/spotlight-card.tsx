"use client"

import React, { useEffect, type ReactNode, type CSSProperties } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * SINGLE global pointermove listener condiviso da TUTTE le GlowCard.
 * Scrive --x/--y/--xp/--yp su document.documentElement: tutte le card
 * (che usano background-attachment: fixed) ereditano gli stessi valori.
 * Prima: N card = N listener + N style writes per frame. Ora: 1 listener + 1 write.
 */
let globalGlowListenerInstalled = false
let globalGlowRefCount = 0
let globalCleanup: (() => void) | null = null

function ensureGlobalGlowListener() {
  if (typeof window === "undefined") return
  if (globalGlowListenerInstalled) {
    globalGlowRefCount++
    return
  }
  globalGlowListenerInstalled = true
  globalGlowRefCount = 1

  const root = document.documentElement
  let rafId = 0
  let pending: PointerEvent | null = null
  const apply = () => {
    rafId = 0
    if (!pending) return
    const e = pending
    pending = null
    root.style.setProperty("--glow-x", e.clientX.toFixed(2))
    root.style.setProperty("--glow-xp", (e.clientX / window.innerWidth).toFixed(3))
    root.style.setProperty("--glow-y", e.clientY.toFixed(2))
    root.style.setProperty("--glow-yp", (e.clientY / window.innerHeight).toFixed(3))
  }
  const sync = (e: PointerEvent) => {
    pending = e
    if (!rafId) rafId = requestAnimationFrame(apply)
  }
  document.addEventListener("pointermove", sync, { passive: true })
  globalCleanup = () => {
    document.removeEventListener("pointermove", sync)
    if (rafId) cancelAnimationFrame(rafId)
    globalGlowListenerInstalled = false
    globalCleanup = null
  }
}

function releaseGlobalGlowListener() {
  globalGlowRefCount = Math.max(0, globalGlowRefCount - 1)
  if (globalGlowRefCount === 0 && globalCleanup) globalCleanup()
}

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

  // Single shared listener — tutte le card leggono --glow-x/--glow-y dal root.
  useEffect(() => {
    if (prefersReducedMotion) return
    ensureGlobalGlowListener()
    return () => releaseGlobalGlowListener()
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
    backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--glow-x, 0) * 1px) calc(var(--glow-y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 90) * 1%) calc(var(--lightness, 62) * 1%) / var(--bg-spot-opacity, 0.12)), transparent)`,
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    borderRadius: "calc(var(--radius) * 1px)",
    position: "relative",
    touchAction: "auto",
    ...(width !== undefined
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...(height !== undefined
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
  }

  return (
    <div
      data-giro-glow
      style={inlineStyles as CSSProperties}
      className={cn(sizeClass, aspect, "relative", className)}
    >
      <div data-giro-glow aria-hidden />
      {children}
    </div>
  )
}
