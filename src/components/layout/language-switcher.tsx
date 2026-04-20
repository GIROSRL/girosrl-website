"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type Locale = "it" | "en"

const labels: Record<Locale, string> = {
  it: "IT",
  en: "EN",
}

export function LanguageSwitcher({ className }: { className?: string }) {
  // TODO Fase 9: collegare a next-intl
  const [current, setCurrent] = useState<Locale>("it")
  const [open, setOpen] = useState(false)

  const other: Locale = current === "it" ? "en" : "it"

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-1.5 rounded-full",
          "text-xs font-medium tracking-widest uppercase",
          "text-[var(--color-gray-mid)] hover:text-[var(--color-blue-light)]",
          "border border-[var(--color-navy-light)] hover:border-[var(--color-blue-dark)]",
          "transition-colors duration-200"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Lingua corrente: ${labels[current]}. Cambia lingua`}
      >
        <span>{labels[current]}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path
            d="M2 3.5 L5 6.5 L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full right-0 mt-2 min-w-[72px]",
              "rounded-lg bg-[var(--color-navy-mid)] border border-[var(--color-navy-light)]",
              "shadow-lg shadow-black/40 overflow-hidden z-50"
            )}
          >
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                setCurrent(other)
                setOpen(false)
              }}
              className={cn(
                "w-full px-4 py-2 text-xs font-medium tracking-widest uppercase text-left",
                "text-[var(--fg)] hover:bg-[var(--color-navy-light)] hover:text-[var(--color-blue-light)]",
                "transition-colors"
              )}
            >
              {labels[other]}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
