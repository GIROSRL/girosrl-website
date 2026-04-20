"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { serviceAreas } from "@/content/services"

const area = serviceAreas.find((a) => a.slug === "strategia")!
const easeOut = [0.22, 1, 0.36, 1] as const

const principi = [
  {
    num: "01",
    title: "Ascoltiamo",
    description: "Partiamo dal tuo business, non dalla tecnologia.",
  },
  {
    num: "02",
    title: "Analizziamo",
    description: "Mappatura onesta di obiettivi, ostacoli, risorse.",
  },
  {
    num: "03",
    title: "Decidiamo",
    description: "Roadmap con priorità chiare, KPI, deliverable.",
  },
  {
    num: "04",
    title: "Governiamo",
    description: "Misura, iterazione, revisione trimestrale.",
  },
]

/**
 * STRATEGIA — Bussola editoriale.
 * Titolo centrale grande + 4 principi disposti come direzioni cardinali.
 * Linee SVG convergono al centro.
 */
export function AreaStrategia() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <Container>
        {/* Diagramma bussola — linee convergenti SVG */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="center-glow-strategia" cx="50%" cy="50%">
              <stop offset="0%" stopColor={area.color} stopOpacity="0.4" />
              <stop offset="60%" stopColor={area.color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="300" r="180" fill="url(#center-glow-strategia)" />
          {/* 4 linee direzionali diagonali */}
          {[
            { x1: 500, y1: 300, x2: 180, y2: 120 },
            { x1: 500, y1: 300, x2: 820, y2: 120 },
            { x1: 500, y1: 300, x2: 180, y2: 480 },
            { x1: 500, y1: 300, x2: 820, y2: 480 },
          ].map((l, i) => (
            <motion.line
              key={i}
              {...l}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.5"
              strokeDasharray="2 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: easeOut }}
            />
          ))}
        </svg>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center pointer-events-auto w-full">
          {/* Col sinistra: principi 01, 03 */}
          <div className="hidden md:flex flex-col gap-10">
            <PrincipleCard principle={principi[0]!} align="right" delay={0.4} />
            <PrincipleCard principle={principi[2]!} align="right" delay={0.6} />
          </div>

          {/* Colonna centrale: Titolo + tagline */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="flex justify-center mb-6"
            >
              <PlanetBadge color={area.color} size={80} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
              className="text-[11px] tracking-[0.4em] uppercase font-semibold text-white/85 mb-4"
            >
              {area.tagline}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1] text-white mb-6"
              style={{ textShadow: "0 4px 32px rgba(0,0,0,0.45)" }}
            >
              {area.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
              className="max-w-md mx-auto text-sm md:text-base leading-relaxed text-white/85"
            >
              {area.description}
            </motion.p>
            {/* Principi mobile */}
            <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
              {principi.map((p, i) => (
                <PrincipleCard
                  key={p.num}
                  principle={p}
                  align="left"
                  delay={0.4 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Col destra: principi 02, 04 */}
          <div className="hidden md:flex flex-col gap-10">
            <PrincipleCard principle={principi[1]!} align="left" delay={0.5} />
            <PrincipleCard principle={principi[3]!} align="left" delay={0.7} />
          </div>
        </div>
      </Container>
    </motion.div>
  )
}

function PrincipleCard({
  principle,
  align,
  delay,
}: {
  principle: (typeof principi)[number]
  align: "left" | "right"
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "right" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={align === "right" ? "text-right" : "text-left"}
    >
      {/* Card con backdrop blur per stacco dal blu di fondo */}
      <div
        className="inline-block p-5 md:p-6 rounded-2xl border backdrop-blur-sm"
        style={{
          borderColor: "rgba(255, 255, 255, 0.22)",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.15) 100%)",
          boxShadow: "0 12px 32px -12px rgba(0,0,0,0.4)",
          maxWidth: "300px",
        }}
      >
        <div
          className={`flex items-center gap-3 mb-2 ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: "#ffffff" }}
          >
            {principle.num}
          </span>
          <div
            className="h-px flex-1 max-w-[32px]"
            style={{ background: "rgba(255,255,255,0.5)" }}
          />
        </div>
        <h3
          className="font-display text-2xl md:text-3xl font-bold mb-2 leading-tight"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {principle.title}
        </h3>
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          }}
        >
          {principle.description}
        </p>
      </div>
    </motion.div>
  )
}
