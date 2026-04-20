"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { ProjectPreviewCard } from "@/components/common/project-preview-card"
import { serviceAreas } from "@/content/services"
import { projects } from "@/content/projects"

const area = serviceAreas.find((a) => a.slug === "sviluppo")!
const easeOut = [0.22, 1, 0.36, 1] as const

const devProjects = projects.filter(
  (p) => p.areaSlug === "sviluppo" || p.areaSlug === "intelligenza"
)

const techStack = [
  "Next.js 15",
  "TypeScript",
  "React Three Fiber",
  "GSAP",
  "Tailwind v4",
  "Supabase",
  "Resend",
]

/**
 * SVILUPPO — IDE / Code editor.
 * Tab bar con i file progetti, file explorer piccolo, area principale con screenshot.
 */
export function AreaSviluppo() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeProject = devProjects[activeIdx]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center pointer-events-auto">
          {/* Sinistra — meta + tech stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-4 mb-5">
              <PlanetBadge color={area.color} size={64} />
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase font-semibold text-white/80">
                  {area.tagline}
                </div>
              </div>
            </div>
            <h2
              className="font-display text-5xl md:text-6xl font-bold leading-[1.02] text-white mb-5"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
            >
              {area.title}
            </h2>
            <p className="max-w-md text-sm md:text-base leading-relaxed text-white/85 mb-6">
              {area.description}
            </p>
            {/* Stack technology chips monospace */}
            <div className="mb-6">
              <div className="text-[9px] font-mono tracking-widest uppercase text-white/60 mb-2">
                {"// stack"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-1 rounded border"
                    style={{
                      color: "#ffffff",
                      borderColor: "rgba(255,255,255,0.25)",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Destra — IDE window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="md:col-span-7"
          >
            <IDEWindow
              projects={devProjects}
              activeIdx={activeIdx}
              onSelect={setActiveIdx}
              activeProject={activeProject}
            />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}

function IDEWindow({
  projects,
  activeIdx,
  onSelect,
  activeProject,
}: {
  projects: typeof devProjects
  activeIdx: number
  onSelect: (i: number) => void
  activeProject: (typeof devProjects)[number] | undefined
}) {
  const fileNames = projects.map((p) => `${p.id.replace(/-/g, "_")}.tsx`)

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden border shadow-2xl"
      style={{
        borderColor: "rgba(0,0,0,0.4)",
        background: "#0d1117",
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-[#161b22]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 text-[10px] font-mono text-white/45">
          giro-srl/projects — vscode
        </div>
      </div>

      <div className="flex min-h-[360px]">
        {/* File explorer */}
        <aside className="w-44 shrink-0 border-r border-white/5 bg-[#0b0f14] py-2">
          <div className="px-3 text-[9px] font-mono tracking-widest uppercase text-white/35 mb-2">
            Explorer
          </div>
          <div className="px-1.5">
            {fileNames.map((name, i) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelect(i)}
                className="w-full text-left text-[11px] font-mono px-2 py-1 rounded transition-colors flex items-center gap-2"
                style={{
                  background:
                    i === activeIdx ? "rgba(20, 214, 180, 0.12)" : "transparent",
                  color: i === activeIdx ? "#ffffff" : "rgba(255,255,255,0.55)",
                }}
              >
                <FileIcon active={i === activeIdx} />
                <span className="truncate">{name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex items-center bg-[#0b0f14] border-b border-white/5">
            {fileNames.map((name, i) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelect(i)}
                className="relative text-[11px] font-mono px-4 py-2 border-r border-white/5 transition-colors"
                style={{
                  background:
                    i === activeIdx ? "#0d1117" : "transparent",
                  color: i === activeIdx ? "#ffffff" : "rgba(255,255,255,0.45)",
                }}
              >
                {i === activeIdx && (
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: area.color }}
                  />
                )}
                {name}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="flex-1 relative overflow-hidden bg-black/30">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <ProjectPreviewCard project={activeProject} />
              </motion.div>
            )}
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-3 py-1 text-[9px] font-mono"
            style={{ background: area.color, color: "#0b1020" }}
          >
            <div className="flex items-center gap-3">
              <span>● main</span>
              <span>production</span>
            </div>
            <div className="flex items-center gap-3">
              {activeProject?.tags?.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2.5 1h5l2 2v7.5a.5.5 0 0 1-.5.5h-6.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5Z"
        stroke={active ? area.color : "rgba(255,255,255,0.45)"}
        strokeWidth="0.8"
        fill={active ? `${area.color}18` : "none"}
      />
      <path
        d="M7.5 1v2.5h2"
        stroke={active ? area.color : "rgba(255,255,255,0.45)"}
        strokeWidth="0.8"
      />
    </svg>
  )
}
