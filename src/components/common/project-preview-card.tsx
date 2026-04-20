"use client"

import { useState } from "react"
import type { Project } from "@/content/projects"
import { DashboardMock } from "./dashboard-mock"

type Props = {
  project: Project
}

/**
 * Card piccola progetto: screenshot (via thum.io) + overlay label con link al sito live.
 * Se `type === "dashboard-mock"` usa il componente DashboardMock inline.
 */
export function ProjectPreviewCard({ project }: Props) {
  const [imgFailed, setImgFailed] = useState(false)

  if (project.type === "dashboard-mock") {
    return (
      <div
        className="relative aspect-[16/10] rounded-lg overflow-hidden border"
        style={{ borderColor: `${project.accent}44` }}
      >
        <DashboardMock accent={project.accent} />
        <CardLabel project={project} />
      </div>
    )
  }

  // Screenshot reali (JPG, catturati via scripts/capture-previews.mjs) o
  // fallback SVG locale quando il progetto non ha un dominio pubblico (es. Helmè, Virauto).
  const fallbackMap: Record<string, string> = {
    siciliaclassica: "/images/projects/siciliaclassica-preview.jpg",
    "south-unconventional": "/images/projects/south-unconventional-preview.jpg",
    sicilery: "/images/projects/sicilery-preview.jpg",
    helme: "/images/projects/helme-preview.svg",
    virauto: "/images/projects/virauto-preview.svg",
  }
  const fallbackSvg = fallbackMap[project.id]

  const src = imgFailed && fallbackSvg ? fallbackSvg : project.image

  const inner = (
    <div
      className="relative aspect-[16/10] rounded-lg overflow-hidden border bg-[var(--color-navy-mid)] group"
      style={{ borderColor: `${project.accent}44` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={() => setImgFailed(true)}
      />
      <CardLabel project={project} />
    </div>
  )

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Apri ${project.title} in nuova scheda`}
        className="block"
      >
        {inner}
      </a>
    )
  }
  return inner
}

function CardLabel({ project }: { project: Project }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 left-0 right-0 p-3"
      style={{
        background: "linear-gradient(to top, rgba(8,13,26,0.92), transparent)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: project.accent }}
        />
        <span className="text-xs font-semibold text-white truncate">{project.title}</span>
      </div>
    </div>
  )
}
