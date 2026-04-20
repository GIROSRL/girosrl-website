"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Compass,
  Code2,
  Brain,
  Palette,
  Users,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Feature Carousel adattato per GIRO — icone Lucide al posto di Hugeicons,
 * colori brand invece di blu fisso. Riutilizzabile in pagine hub (es. /servizi)
 * o sezioni "perché noi".
 * Fonte originale: prompt utente (pattern Magic UI-style).
 */

export type CarouselFeature = {
  id: string
  label: string
  icon: LucideIcon
  image: string
  description: string
}

const DEFAULT_FEATURES: CarouselFeature[] = [
  {
    id: "strategia",
    label: "Strategia",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
    description: "Direzione, visione e metodo: partiamo dal tuo business.",
  },
  {
    id: "sviluppo",
    label: "Sviluppo",
    icon: Code2,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
    description: "Siti, web app, dashboard: codice pulito e scalabile.",
  },
  {
    id: "intelligenza",
    label: "Intelligenza",
    icon: Brain,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200",
    description: "AI e automazione dentro i tuoi processi reali.",
  },
  {
    id: "brand",
    label: "Brand",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?q=80&w=1200",
    description: "Come il valore arriva al mercato.",
  },
  {
    id: "persone",
    label: "Persone",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
    description: "HR e organizzazione: le aziende sono fatte di persone.",
  },
  {
    id: "sparkle",
    label: "Zero sorprese",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
    description: "Budget, timeline, deliverable: sempre chiari, sempre.",
  },
]

const AUTO_PLAY_INTERVAL = 3500
const ITEM_HEIGHT = 60

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export function FeatureCarousel({
  features = DEFAULT_FEATURES,
  accent = "#3a8fe8",
  className,
}: {
  features?: CarouselFeature[]
  accent?: string
  className?: string
}) {
  const [step, setStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentIndex =
    ((step % features.length) + features.length) % features.length

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length
    if (diff > 0) setStep((s) => s + diff)
  }

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [nextStep, isPaused])

  const getCardStatus = (index: number): "active" | "prev" | "next" | "hidden" => {
    const diff = index - currentIndex
    const len = features.length
    let normalizedDiff = diff
    if (diff > len / 2) normalizedDiff -= len
    if (diff < -len / 2) normalizedDiff += len
    if (normalizedDiff === 0) return "active"
    if (normalizedDiff === -1) return "prev"
    if (normalizedDiff === 1) return "next"
    return "hidden"
  }

  return (
    <div className={cn("w-full max-w-7xl mx-auto md:p-8", className)}>
      <div
        className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[540px] lg:aspect-video border"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        {/* Sidebar chips */}
        <div
          className="w-full lg:w-[42%] min-h-[340px] md:min-h-[420px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 lg:pl-14"
          style={{ background: accent }}
        >
          <div
            className="absolute inset-x-0 top-0 h-16 lg:h-14 z-40"
            style={{
              background: `linear-gradient(to bottom, ${accent} 0%, ${accent}cc 60%, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 lg:h-14 z-40"
            style={{
              background: `linear-gradient(to top, ${accent} 0%, ${accent}cc 60%, transparent)`,
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex
              const distance = index - currentIndex
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              )
              const Icon = feature.icon

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.28,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-700 text-left border",
                      isActive
                        ? "bg-white z-10"
                        : "bg-transparent text-white/60 border-white/25 hover:border-white/50 hover:text-white"
                    )}
                    style={isActive ? { color: accent, borderColor: "#ffffff" } : {}}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className="transition-colors"
                      style={{ color: isActive ? accent : "rgba(255,255,255,0.55)" }}
                    />
                    <span className="text-xs md:text-sm tracking-tight whitespace-nowrap uppercase font-medium">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Preview card */}
        <div
          className="flex-1 min-h-[480px] md:min-h-[560px] lg:h-full relative flex items-center justify-center py-14 md:py-20 lg:py-14 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l"
          style={{
            background: "rgba(8, 13, 26, 0.92)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index)
              const isActive = status === "active"
              const isPrev = status === "prev"
              const isNext = status === "next"

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="absolute inset-0 rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden border-4 origin-center"
                  style={{ borderColor: "#080d1a" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-28 flex flex-col justify-end pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.45) 40%, transparent)",
                        }}
                      >
                        <div
                          className="bg-white px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] w-fit shadow-lg mb-2 font-semibold"
                          style={{ color: accent }}
                        >
                          {index + 1} · {feature.label}
                        </div>
                        <p className="text-white font-medium text-lg md:text-xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-white"
                        style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)" }}
                      />
                      <span className="text-white/80 text-[9px] uppercase tracking-[0.3em] font-mono">
                        Live
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
