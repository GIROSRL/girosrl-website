"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { serviceAreas } from "@/content/services"
import { helmeInstagram } from "@/content/helme-instagram"

const area = serviceAreas.find((a) => a.slug === "marketing")!
const easeOut = [0.22, 1, 0.36, 1] as const

/**
 * MARKETING — Campaign dashboard multi-canale.
 * Simulazione di una campagna live: post Instagram, Google Ad, KPI cards performance.
 * Mostra il marketing "a 360°" tangibile.
 */
export function AreaMarketing() {
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
          {/* Sinistra — intestazione */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-4 mb-5">
              <PlanetBadge color={area.color} size={64} />
              <div className="text-[11px] tracking-[0.35em] uppercase font-semibold text-white/85">
                {area.tagline}
              </div>
            </div>
            <h2
              className="font-display text-5xl md:text-6xl font-bold leading-[1.02] text-white mb-5"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
            >
              {area.title}
            </h2>
            <p className="max-w-md text-sm md:text-base leading-relaxed text-white/90 mb-6">
              {area.description}
            </p>
            <ul className="flex flex-wrap gap-2">
              {area.items.map((item) => (
                <li
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border bg-white/15 backdrop-blur-sm text-white"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destra — Campaign dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="md:col-span-7"
          >
            <CampaignDashboard />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}

function CampaignDashboard() {
  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-2xl"
      style={{
        borderColor: "rgba(0,0,0,0.4)",
        background: "rgba(8, 13, 26, 0.85)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#3dd68c" }}
        />
        <span className="text-[10px] tracking-widest uppercase text-white/70 font-semibold">
          Campagna live · Meta + Google
        </span>
        <span className="ml-auto text-[9px] text-white/40 font-mono">ROAS 4.8×</span>
      </div>

      <div className="p-3 grid grid-cols-3 gap-3">
        {/* Helme Instagram feed — social management live */}
        <HelmeInstagramFeed />
        {/* Google Ad Preview */}
        <GoogleAdPreview />
        {/* Performance KPI */}
        <PerformancePanel />
      </div>

      {/* Timeline footer */}
      <div className="px-4 py-2 border-t border-white/10 flex items-center gap-3 text-[9px] text-white/50 font-mono">
        <div className="flex-1 relative h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: "#fbbf24" }}
            animate={{ width: ["0%", "68%"] }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />
        </div>
        <span>14/30 giorni</span>
      </div>
    </div>
  )
}

/**
 * Helmè Instagram feed — profilo + grid 2x3 dei post REALI di @helmestore.
 * Lo screenshot del feed reale viene catturato da scripts/capture-previews.mjs
 * (Playwright), salvato in /images/projects/helme-instagram-preview.jpg.
 * Per aggiornare: `node scripts/capture-previews.mjs`.
 */
function HelmeInstagramFeed() {
  return (
    <div
      className="rounded-lg overflow-hidden border flex flex-col"
      style={{
        borderColor: "rgba(255,255,255,0.12)",
        background: "#0a0e1a",
      }}
    >
      {/* Profile header — dati reali da @helmestore */}
      <div className="flex items-center gap-2 px-2 py-2 border-b border-white/10">
        {/* Avatar reale con ring stile Instagram story */}
        <div
          className="relative p-[2px] rounded-full"
          style={{
            background:
              "conic-gradient(from 140deg, #f09433, #bc1888, #cc2366, #e6683c, #f09433)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={helmeInstagram.avatar}
            alt={`Avatar ${helmeInstagram.displayName}`}
            className="w-7 h-7 rounded-full object-cover"
            style={{ boxShadow: "inset 0 0 0 2px #0a0e1a" }}
            draggable={false}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-white truncate">
            @{helmeInstagram.handle}
          </div>
          <div className="text-[7px] text-white/50 truncate">
            {helmeInstagram.displayName} · Luxury lifestyle
          </div>
        </div>
        <div
          className="px-1.5 py-0.5 rounded text-[7px] font-bold"
          style={{ background: "#fbbf24", color: "#0d1424" }}
        >
          SEGUI
        </div>
      </div>

      {/* Stats strip — numeri reali */}
      <div className="grid grid-cols-3 text-center border-b border-white/10 py-1.5">
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.posts}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Post
          </div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.followers}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Follower
          </div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.following}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Seguiti
          </div>
        </div>
      </div>

      {/* Grid 2x3 dei post REALI — screenshot dal feed @helmestore */}
      <div className="flex-1 overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/helme-instagram-preview.jpg"
          alt="Feed Instagram @helmestore — post editoriali luxury lifestyle"
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Footer: engagement rate */}
      <div className="px-2 py-1.5 border-t border-white/10 flex items-center gap-2">
        <span className="text-[7px] uppercase tracking-widest text-[#fbbf24] font-semibold">
          Engagement
        </span>
        <span className="ml-auto text-[8px] font-bold text-white">6.2%</span>
        <span className="text-[7px] font-semibold" style={{ color: "#34d399" }}>
          +2.1pt
        </span>
      </div>
    </div>
  )
}

function GoogleAdPreview() {
  return (
    <div
      className="rounded-lg overflow-hidden border flex flex-col"
      style={{
        borderColor: "rgba(255,255,255,0.12)",
        background: "#ffffff",
      }}
    >
      {/* Google SERP simulated */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-[#4285f4]" />
          <div className="w-3 h-3 rounded-full bg-[#ea4335]" />
          <div className="w-3 h-3 rounded-full bg-[#fbbc04]" />
          <div className="w-3 h-3 rounded-full bg-[#34a853]" />
          <div className="ml-2 flex-1 h-3 rounded-full bg-gray-100" />
        </div>
        <div
          className="inline-block px-1.5 rounded text-[7px] font-bold mb-1"
          style={{ background: "#fef2c7", color: "#a16207" }}
        >
          SPONSORIZZATO
        </div>
        <div className="text-[10px] font-semibold text-[#1a73e8] leading-tight truncate">
          giro-srl.com/marketing
        </div>
        <div className="text-[9px] font-semibold text-[#0d1424] mt-0.5 leading-tight">
          Marketing digitale per PMI
        </div>
        <div className="text-[8px] text-gray-500 mt-0.5 leading-snug">
          Contenuti, ads, strategia. Tutto in un solo partner.
        </div>
      </div>
      {/* KPI block */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="space-y-1.5">
          <KpiRow label="Impressioni" value="148K" trend="+18%" />
          <KpiRow label="Click" value="5.6K" trend="+24%" />
          <KpiRow label="CPC" value="€0.42" trend="-8%" inverted />
        </div>
        <div className="mt-2 text-[7px] uppercase tracking-widest text-gray-400 font-mono">
          Google Ads · ultime 24h
        </div>
      </div>
    </div>
  )
}

function KpiRow({
  label,
  value,
  trend,
  inverted,
}: {
  label: string
  value: string
  trend: string
  inverted?: boolean
}) {
  const positive = inverted ? trend.startsWith("-") : trend.startsWith("+")
  return (
    <div className="flex items-baseline justify-between">
      <div className="text-[8px] uppercase tracking-wider text-gray-500">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[11px] font-bold text-[#0d1424]">{value}</span>
        <span
          className="text-[8px] font-semibold"
          style={{ color: positive ? "#059669" : "#dc2626" }}
        >
          {trend}
        </span>
      </div>
    </div>
  )
}

function PerformancePanel() {
  return (
    <div
      className="rounded-lg overflow-hidden border flex flex-col p-3"
      style={{
        borderColor: "rgba(251, 191, 36, 0.3)",
        background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
      }}
    >
      <div className="text-[8px] tracking-[0.3em] uppercase font-semibold text-[#fbbf24] mb-2">
        Performance
      </div>
      <div className="text-3xl font-display font-bold text-white mb-0.5 leading-none">
        €48k
      </div>
      <div className="text-[9px] text-white/70 mb-3">
        Revenue attribuito · 30d
      </div>

      {/* Mini chart */}
      <div className="flex-1 min-h-[60px] relative">
        <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mkt-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 30 L 12 28 L 24 25 L 36 22 L 48 20 L 60 18 L 72 12 L 84 8 L 100 5 L 100 40 L 0 40 Z"
            fill="url(#mkt-fill)"
          />
          <path
            d="M 0 30 L 12 28 L 24 25 L 36 22 L 48 20 L 60 18 L 72 12 L 84 8 L 100 5"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1"
          />
          <circle cx="100" cy="5" r="1.5" fill="#fbbf24" />
        </svg>
      </div>

      <div className="mt-2 space-y-0.5">
        <div className="flex justify-between text-[8px]">
          <span className="text-white/60">ROAS</span>
          <span className="font-bold text-white">4.8×</span>
        </div>
        <div className="flex justify-between text-[8px]">
          <span className="text-white/60">CAC</span>
          <span className="font-bold text-white">€24.10</span>
        </div>
        <div className="flex justify-between text-[8px]">
          <span className="text-white/60">Conv. rate</span>
          <span className="font-bold text-white">3.8%</span>
        </div>
      </div>
    </div>
  )
}
