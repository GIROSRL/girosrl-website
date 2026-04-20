"use client"

import React, { useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

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
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = cardRef.current
    if (!el) return
    let rafId = 0
    let pending: PointerEvent | null = null
    const apply = () => {
      rafId = 0
      if (!pending) return
      const e = pending
      pending = null
      el.style.setProperty("--x", e.clientX.toFixed(2))
      el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(3))
      el.style.setProperty("--y", e.clientY.toFixed(2))
      el.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(3))
    }
    const sync = (e: PointerEvent) => {
      pending = e
      if (!rafId) rafId = requestAnimationFrame(apply)
    }
    document.addEventListener("pointermove", sync, { passive: true })
    return () => {
      document.removeEventListener("pointermove", sync)
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
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 90) * 1%) calc(var(--lightness, 62) * 1%) / var(--bg-spot-opacity, 0.12)), transparent)`,
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

  // Stili borderlight :before/:after tramite un singolo <style> scoped via data attribute
  const cssRules = `
    [data-giro-glow]::before,
    [data-giro-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      -webkit-mask-clip: padding-box, border-box;
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
    }
    [data-giro-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.7) calc(var(--spotlight-size) * 0.7) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 90) * 1%) calc(var(--lightness, 62) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(1.6);
    }
    [data-giro-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.4) calc(var(--spotlight-size) * 0.4) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 0% 100% / var(--border-light-opacity, 0.85)), transparent 100%
      );
    }
    [data-giro-glow] [data-giro-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      filter: blur(calc(var(--border-size) * 4));
      background: none;
      pointer-events: none;
      border: none;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssRules }} />
      <div
        ref={cardRef}
        data-giro-glow
        style={inlineStyles as CSSProperties}
        className={cn(sizeClass, aspect, "relative", className)}
      >
        <div data-giro-glow aria-hidden />
        {children}
      </div>
    </>
  )
}
