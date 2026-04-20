"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { serviceAreas } from "@/content/services"

const area = serviceAreas.find((a) => a.slug === "brand")!
const easeOut = [0.22, 1, 0.36, 1] as const

const paletteColors = ["#ff9eb1", "#ff6b88", "#ffc3cf", "#4a1a2a", "#ffeef2"]

/**
 * BRAND — Moodboard creativo.
 * Composizione caotica / magazine: typography big, palette, shape, mood quotes.
 * Si assemblano con stagger allo scroll (già dentro opacity fade del takeover).
 */
export function AreaBrand() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <Container>
        <div className="relative grid grid-cols-12 grid-rows-6 gap-3 md:gap-4 pointer-events-auto w-full h-[70vh] max-h-[620px]">
          {/* Cell 1: Palette colori */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="col-span-4 row-span-2 rounded-xl overflow-hidden border flex"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              background: "rgba(0,0,0,0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            {paletteColors.map((c) => (
              <div
                key={c}
                className="flex-1 relative"
                style={{ background: c }}
                title={c}
              />
            ))}
          </motion.div>

          {/* Cell 2: Titolo hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="col-span-5 row-span-3 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-3">
              <PlanetBadge color={area.color} size={56} />
              <div className="text-[11px] tracking-[0.35em] uppercase font-semibold text-white/85">
                {area.tagline}
              </div>
            </div>
            <h2
              className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-white"
              style={{ textShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
            >
              {area.title}
            </h2>
          </motion.div>

          {/* Cell 3: Shape big decorativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 8 }}
            transition={{ duration: 1, delay: 0.35, ease: easeOut }}
            className="col-span-3 row-span-2 flex items-center justify-center"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
              <defs>
                <linearGradient id="brand-shape" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff9eb1" />
                  <stop offset="100%" stopColor="#ff6b88" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="85" fill="url(#brand-shape)" />
              <circle cx="100" cy="100" r="85" fill="#ffffff" fillOpacity="0.08" />
            </svg>
          </motion.div>

          {/* Cell 4: Typography sample */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
            className="col-span-4 row-span-2 rounded-xl overflow-hidden border flex flex-col justify-center p-5"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              background: "rgba(0,0,0,0.15)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div
              className="font-display italic text-3xl md:text-4xl font-bold text-white"
              style={{ lineHeight: 1 }}
            >
              Aa
            </div>
            <div className="text-[10px] tracking-widest uppercase text-white/60 mt-2 font-mono">
              Playfair Display · Inter
            </div>
            <div className="text-xs text-white/80 mt-2">
              Editoriale + UI pulita
            </div>
          </motion.div>

          {/* Cell 5: Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="col-span-5 row-span-2 flex flex-col justify-center"
          >
            <p className="text-base md:text-lg leading-relaxed text-white/90">
              {area.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {area.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border bg-white/15 backdrop-blur-sm text-white"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Cell 6: Quote creativa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeOut }}
            className="col-span-3 row-span-2 rounded-xl overflow-hidden border flex flex-col justify-center p-5"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div className="font-display italic text-sm md:text-base text-white leading-snug">
              &ldquo;Il brand non si disegna. Si costruisce ogni giorno, un
              piccolo atto alla volta.&rdquo;
            </div>
            <div className="mt-3 text-[10px] tracking-widest uppercase text-white/60">
              — Manifesto GIRO
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}
