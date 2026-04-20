"use client"

import React, { useRef, useState } from "react"
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Client tab data ──────────────────────────────────────────────────────────

const FALLBACKS: Record<string, string> = {
  siciliaclassica: "/images/projects/siciliaclassica-preview.svg",
  "south-unconventional": "/images/projects/south-unconventional-preview.svg",
  sicilery: "/images/projects/sicilery-preview.svg",
}

const screenshotOf = (url: string) =>
  `https://image.thum.io/get/width/1440/noanimate/fullpage/${url}`

export type ClientTab = {
  id: string
  label: string
  url: string | undefined
  fallback: string
  accentColor: string
}

export const SVILUPPO_TABS: ClientTab[] = [
  {
    id: "siciliaclassica",
    label: "Sicilia Classica",
    url: "https://siciliaclassica.it",
    fallback: FALLBACKS["siciliaclassica"]!,
    accentColor: "#c8832a",
  },
  {
    id: "south-unconventional",
    label: "South Unconventional",
    url: "https://www.southunconventional.com",
    fallback: FALLBACKS["south-unconventional"]!,
    accentColor: "#c8a0f0",
  },
  {
    id: "sicilery",
    label: "Sicilery",
    url: "https://www.sicilery.com/it/about-us",
    fallback: FALLBACKS["sicilery"]!,
    accentColor: "#d4a843",
  },
]

// ─── ContainerScroll ──────────────────────────────────────────────────────────

type ContainerScrollProps = {
  titleComponent?: React.ReactNode | undefined
  /** External MotionValue (0→1) from GSAP-pinned scroll. Falls back to useScroll when undefined. */
  motionProgress?: MotionValue<number> | undefined
  className?: string | undefined
}

export function ContainerScroll({
  titleComponent,
  motionProgress,
  className,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [manualTab, setManualTab] = useState<number | null>(null)

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // When motionProgress advances past the sub-phase boundaries, auto-switch tabs
  React.useEffect(() => {
    if (!motionProgress) return
    const unsub = motionProgress.on("change", (v) => {
      const auto =
        v < 0.357 ? 0
        : v < 0.714 ? 1
        : 2
      setActiveTab((prev) => {
        // reset manual override when auto catches up
        if (manualTab !== null && auto === manualTab) setManualTab(null)
        return manualTab !== null ? manualTab : auto
      })
    })
    return unsub
  }, [motionProgress, manualTab])

  const handleTabClick = (idx: number) => {
    setManualTab(idx)
    setActiveTab(idx)
  }

  const scaleDimensions = (): [number, number] => (isMobile ? [0.7, 0.9] : [1.05, 1])

  // Use external MotionValue when inside GSAP pin; otherwise fall back to useScroll
  const progress = motionProgress ?? scrollYProgress

  const rotate = useTransform(progress, [0, 1], [20, 0])
  const scale = useTransform(progress, [0, 1], scaleDimensions())
  const translate = useTransform(progress, [0, 1], [0, -100])

  const currentTab = SVILUPPO_TABS[activeTab] ?? SVILUPPO_TABS[0]!

  return (
    <div
      className={cn(
        motionProgress
          ? "w-full flex items-center justify-center relative p-2"
          : "h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20",
        className
      )}
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{ perspective: "1000px" }}
      >
        {titleComponent && (
          <motion.div
            style={{ translateY: translate }}
            className="max-w-5xl mx-auto text-center mb-6"
          >
            {titleComponent}
          </motion.div>
        )}

        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow:
              "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
          className="max-w-5xl -mt-4 mx-auto w-full border-4 border-[#3a3a3a] p-1 md:p-2 bg-[#1a1a1a] rounded-[24px] shadow-2xl"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#222] rounded-t-[16px] border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            {/* URL bar */}
            <div className="flex-1 mx-3 bg-[#333] rounded px-3 py-1 text-[11px] font-mono text-white/40 truncate">
              {currentTab?.url ?? "siciliaclassica.it"}
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex bg-[#1a1a1a] border-b border-white/5">
            {SVILUPPO_TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(i)}
                className="relative text-[10px] md:text-[12px] font-mono px-3 md:px-5 py-2 border-r border-white/5 transition-colors truncate max-w-[140px]"
                style={{
                  background: i === activeTab ? "#222" : "transparent",
                  color: i === activeTab ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {i === activeTab && (
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: tab.accentColor }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screen content */}
          <div className="h-[22rem] md:h-[34rem] w-full overflow-hidden rounded-b-[18px] bg-gray-100 dark:bg-zinc-900 relative">
            {SVILUPPO_TABS.map((tab, i) => (
              <SitePreview
                key={tab.id}
                tab={tab}
                active={i === activeTab}
                motionProgress={motionProgress}
                tabIndex={i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── SitePreview — scrollable screenshot inside the frame ────────────────────

type SitePreviewProps = {
  tab: ClientTab
  active: boolean
  motionProgress: MotionValue<number> | undefined
  tabIndex: number
}

function SitePreview({ tab, active, motionProgress, tabIndex }: SitePreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = useState(tab.url ? screenshotOf(tab.url) : tab.fallback)

  // Scroll the image based on sub-phase progress for this tab
  React.useEffect(() => {
    if (!motionProgress || !imgRef.current) return

    // Each tab covers 1/3 of the total progress range
    const TAB_WIDTH = 1 / 3
    const tabStart = tabIndex * TAB_WIDTH
    const tabEnd = tabStart + TAB_WIDTH

    const unsub = motionProgress.on("change", (v) => {
      if (!imgRef.current) return
      // local progress within this tab's slice (0→1)
      const local = Math.max(0, Math.min(1, (v - tabStart) / TAB_WIDTH))
      // Translate image up by up to 60% of its own height
      imgRef.current.style.transform = `translateY(-${local * 60}%)`
    })
    return unsub
  }, [motionProgress, tabIndex])

  return (
    <div
      className="absolute inset-0 transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0, pointerEvents: active ? "auto" : "none" }}
    >
      <img
        ref={imgRef}
        src={imgSrc}
        alt={tab.label}
        className="w-full object-cover object-top"
        style={{
          height: "160%", // taller than container so scroll has room
          willChange: "transform",
          transition: motionProgress ? undefined : "transform 0.3s ease",
        }}
        loading="lazy"
        onError={() => setImgSrc(tab.fallback)}
        draggable={false}
      />
    </div>
  )
}
