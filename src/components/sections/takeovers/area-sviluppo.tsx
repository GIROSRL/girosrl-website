"use client"

import { motion, type MotionValue } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { serviceAreas } from "@/content/services"

const area = serviceAreas.find((a) => a.slug === "sviluppo")!
const easeOut = [0.22, 1, 0.36, 1] as const

const techStack = [
  "Next.js",
  "TypeScript",
  "Tailwind v4",
  "Supabase",
  "Resend",
  "Vercel",
]

type AreaSviluppoProps = {
  /** External MotionValue (0→1) from GSAP-pinned scroll — drives tilt + inner scroll */
  motionProgress?: MotionValue<number> | undefined
}

export function AreaSviluppo({ motionProgress }: AreaSviluppoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center pointer-events-auto">
          {/* Left — meta + tech stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-4"
          >
            <div className="flex items-center gap-4 mb-5">
              <PlanetBadge color={area.color} size={56} />
              <div className="text-[11px] tracking-[0.35em] uppercase font-semibold text-white/80">
                {area.tagline}
              </div>
            </div>
            <h2
              className="font-display text-4xl md:text-5xl font-bold leading-[1.02] text-white mb-4"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
            >
              {area.title}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/80 mb-5">
              {area.description}
            </p>

            {/* Tech stack chips */}
            <div>
              <div className="text-[9px] font-mono tracking-widest uppercase text-white/50 mb-2">
                {"// stack"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-1 rounded border"
                    style={{
                      color: "#ffffff",
                      borderColor: "rgba(255,255,255,0.2)",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — ContainerScroll with live site previews */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            className="md:col-span-8"
          >
            <ContainerScroll motionProgress={motionProgress} />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}
