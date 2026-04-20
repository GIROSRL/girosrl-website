"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, Heading2 } from "@/components/common/typography"
import { serviceAreas } from "@/content/services"
import type { ServiceArea } from "@/types/content"
import { cn } from "@/lib/utils"

const easeOut = [0.22, 1, 0.36, 1] as const

export function ServicesIntro() {
  return (
    <Section size="lg" id="servizi" className="relative">
      <Container>
        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Label className="mb-4 text-[var(--color-blue)]">Aree di servizio</Label>
            <Heading2 className="max-w-2xl">
              Cinque direzioni.{" "}
              <em className="text-[var(--color-blue)] not-italic">Un solo partner.</em>
            </Heading2>
          </div>
          <Link
            href="/servizi"
            className="text-sm font-medium text-[var(--color-blue-light)] hover:text-[var(--color-blue)] transition-colors border-b border-[var(--color-blue-light)] pb-0.5 self-start md:self-end"
          >
            Scopri tutti i servizi →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceAreas.map((area, idx) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: easeOut }}
            >
              <ServiceCard area={area} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceCard({ area }: { area: ServiceArea }) {
  return (
    <Link
      href={area.href}
      className={cn(
        "group block h-full p-7 rounded-2xl relative overflow-hidden",
        "bg-[var(--color-navy-mid)] border border-[var(--color-navy-light)]",
        "transition-all duration-500",
        "hover:-translate-y-1"
      )}
      style={{ "--area-color": area.color } as React.CSSProperties}
    >
      {/* Hover border glow con colore dell'area */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--area-color)] opacity-60 transition-all duration-500 pointer-events-none"
      />

      {/* Hover glow con colore dell'area */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${area.color}22, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <ServiceIcon type={area.icon} color={area.color} />
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-2 mb-3">
        <h3
          className="text-xl md:text-2xl leading-tight"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
        >
          {area.title}
        </h3>
      </div>
      <p
        className="text-xs tracking-widest uppercase font-medium mb-4"
        style={{ color: area.color }}
      >
        {area.tagline}
      </p>
      <p className="text-sm leading-relaxed text-[var(--color-gray-mid)] mb-6">
        {area.description}
      </p>

      {/* Arrow */}
      <div
        className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
        style={{ color: area.color }}
      >
        <span>Scopri</span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M1 5 H14 M10 1 L14 5 L10 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}

function ServiceIcon({
  type,
  color,
}: {
  type: ServiceArea["icon"]
  color: string
}) {
  const common = {
    width: 56,
    height: 56,
    viewBox: "0 0 56 56",
    fill: "none" as const,
  }
  // Colori derivati dall'accent dell'area
  const ringDim = "#1a3a6e"
  const ringMid = color

  switch (type) {
    case "strategia":
      // Orbite con nucleo e satellite — visione sistemica
      return (
        <svg {...common}>
          <circle cx="28" cy="28" r="26" stroke={ringDim} strokeWidth="0.8" strokeDasharray="2.5 2" />
          <circle cx="28" cy="28" r="18" stroke={ringMid} strokeWidth="1.2" />
          <circle cx="28" cy="28" r="6" fill={color} />
          <circle cx="46" cy="10" r="3" fill={color} />
          <line x1="33" y1="23" x2="43" y2="13" stroke={ringMid} strokeWidth="0.7" strokeDasharray="2 2" />
        </svg>
      )
    case "sviluppo":
      // Browser/code editor
      return (
        <svg {...common}>
          <rect x="6" y="14" width="44" height="28" rx="3" stroke={ringMid} strokeWidth="1.2" />
          <line x1="6" y1="22" x2="50" y2="22" stroke={ringDim} strokeWidth="0.8" />
          <circle cx="11" cy="18" r="1" fill={color} />
          <circle cx="15" cy="18" r="1" fill={color} opacity="0.7" />
          <circle cx="19" cy="18" r="1" fill={color} opacity="0.5" />
          <path
            d="M 18 30 L 14 34 L 18 38 M 38 30 L 42 34 L 38 38 M 30 28 L 26 40"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "intelligenza":
      // Nodo neurale — AI
      return (
        <svg {...common}>
          <path
            d="M28 8 L42 18 L42 38 L28 48 L14 38 L14 18 Z"
            stroke={ringMid}
            strokeWidth="1.2"
            fill={`${color}08`}
          />
          <circle cx="28" cy="28" r="7" fill={color} />
          <circle cx="28" cy="28" r="11" stroke={color} strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />
          <circle cx="18" cy="20" r="1.5" fill={color} />
          <circle cx="38" cy="20" r="1.5" fill={color} />
          <circle cx="18" cy="36" r="1.5" fill={color} />
          <circle cx="38" cy="36" r="1.5" fill={color} />
          <line x1="20" y1="21" x2="27" y2="27" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <line x1="36" y1="21" x2="29" y2="27" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="35" x2="27" y2="29" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <line x1="36" y1="35" x2="29" y2="29" stroke={color} strokeWidth="0.5" opacity="0.5" />
        </svg>
      )
    case "brand":
      // Composizione creativa — forme che danzano
      return (
        <svg {...common}>
          <circle cx="18" cy="22" r="10" fill={color} opacity="0.35" />
          <rect
            x="26"
            y="28"
            width="20"
            height="20"
            rx="2"
            fill={color}
            opacity="0.6"
            transform="rotate(12 36 38)"
          />
          <path
            d="M 36 8 L 44 22 L 28 22 Z"
            fill={color}
            stroke={color}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="22" r="3" fill="#fff" opacity="0.9" />
        </svg>
      )
    case "marketing":
      // Megafono + onde di propagazione (amplificazione, performance)
      return (
        <svg {...common}>
          {/* Megafono */}
          <path
            d="M 14 22 L 14 34 L 22 34 L 34 42 L 34 14 L 22 22 Z"
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Handle */}
          <rect x="10" y="25" width="4" height="6" fill={color} />
          {/* Onde di propagazione */}
          <path
            d="M 40 20 Q 46 28 40 36"
            stroke={color}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 44 16 Q 52 28 44 40"
            stroke={color}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 48 12 Q 58 28 48 44"
            stroke={color}
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      )
  }
}
