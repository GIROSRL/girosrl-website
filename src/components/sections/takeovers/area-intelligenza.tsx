"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { PlanetBadge } from "@/components/common/planet-badge"
import { serviceAreas } from "@/content/services"

const area = serviceAreas.find((a) => a.slug === "intelligenza")!
const easeOut = [0.22, 1, 0.36, 1] as const

type Message = {
  role: "user" | "ai"
  text: string
}

const conversation: Message[] = [
  { role: "user", text: "Quanti lead ci sono arrivati questo mese?" },
  {
    role: "ai",
    text: "128 lead — +12% vs ottobre. Canale top: Instagram (34%), seguito da LinkedIn (27%).",
  },
  { role: "user", text: "Qual è il cliente con più spesa ricorrente?" },
  {
    role: "ai",
    text: "Bianchi SRL: €18.400 YTD, 3 progetti attivi. Rinnovo annuale in scadenza a gennaio.",
  },
]

/**
 * INTELLIGENZA — Chat AI live.
 * Conversation UI con typewriter effect sulle risposte AI.
 * Network nodes animati in background.
 */
export function AreaIntelligenza() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center pointer-events-none"
    >
      {/* Neural nodes decorative background */}
      <NeuralBackground />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pointer-events-auto relative">
          {/* Sinistra — intestazione */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-4 mb-5">
              <PlanetBadge color={area.color} size={64} />
              <div className="text-[11px] tracking-[0.35em] uppercase font-semibold text-white/80">
                {area.tagline}
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
            <div className="flex flex-wrap gap-2">
              {area.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border bg-white/10 backdrop-blur-sm text-white"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Destra — Chat window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            className="md:col-span-7"
          >
            <ChatWindow />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  )
}

function ChatWindow() {
  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => {
        if (prev >= conversation.length) return prev
        return prev + 1
      })
    }, 900)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-2xl backdrop-blur-md"
      style={{
        borderColor: "rgba(255,255,255,0.15)",
        background: "rgba(8, 13, 26, 0.7)",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#3dd68c" }}
          />
          <span className="text-[10px] tracking-widest uppercase text-white/60 font-semibold">
            GIRO AI Agent
          </span>
        </div>
        <div className="ml-auto text-[9px] text-white/40">online · 0.4s avg</div>
      </div>

      {/* Messages */}
      <div className="p-5 min-h-[260px] flex flex-col gap-3">
        {conversation.slice(0, visibleMessages).map((msg, i) => (
          <MessageBubble key={i} message={msg} delay={i === visibleMessages - 1 ? 0 : 0} />
        ))}
        {visibleMessages < conversation.length && (
          <TypingIndicator />
        )}
      </div>

      {/* Input placeholder */}
      <div
        className="px-4 py-3 border-t flex items-center gap-2"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="flex-1 px-3 py-1.5 rounded-lg text-xs text-white/40"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          Chiedi qualsiasi cosa sui tuoi dati…
        </div>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: area.color }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path
              d="M1 5 L5 1 L9 5 M5 1 L5 9"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message, delay }: { message: Message; delay: number }) {
  const isUser = message.role === "user"
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: easeOut }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[78%] px-3.5 py-2 rounded-2xl text-xs md:text-sm leading-relaxed"
        style={{
          background: isUser
            ? "rgba(255,255,255,0.1)"
            : `linear-gradient(135deg, ${area.color}cc, ${area.color}aa)`,
          color: "#ffffff",
          borderTopRightRadius: isUser ? "4px" : undefined,
          borderTopLeftRadius: !isUser ? "4px" : undefined,
        }}
      >
        {!isUser && (
          <span className="text-[9px] tracking-widest uppercase opacity-80 mr-2 font-semibold">
            AI
          </span>
        )}
        {message.text}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="px-3 py-2 rounded-2xl flex items-center gap-1"
        style={{ background: `${area.color}55` }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: "#ffffff" }}
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function NeuralBackground() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* 14 nodi distribuiti */}
      {[
        [120, 100],
        [280, 80],
        [440, 160],
        [600, 60],
        [780, 140],
        [900, 240],
        [80, 260],
        [340, 340],
        [540, 300],
        [740, 380],
        [880, 460],
        [200, 480],
        [420, 520],
        [640, 480],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Connessioni */}
      {[
        [120, 100, 280, 80],
        [280, 80, 440, 160],
        [440, 160, 600, 60],
        [600, 60, 780, 140],
        [280, 80, 340, 340],
        [440, 160, 540, 300],
        [600, 60, 740, 380],
        [80, 260, 340, 340],
        [340, 340, 540, 300],
        [540, 300, 740, 380],
        [740, 380, 880, 460],
        [200, 480, 420, 520],
        [420, 520, 640, 480],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 + i * 0.08, ease: easeOut }}
        />
      ))}
    </svg>
  )
}
