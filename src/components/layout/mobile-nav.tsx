"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { GiroButton } from "@/components/common/giro-button"
import { LanguageSwitcher } from "./language-switcher"
import type { NavItem } from "./nav-items"

type MobileNavProps = {
  items: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        className={cn(
          "relative z-50 flex items-center justify-center w-10 h-10",
          "text-[var(--fg)] hover:text-[var(--color-blue-light)] transition-colors",
          "md:hidden"
        )}
      >
        <span className="sr-only">Menu</span>
        <div className="relative w-6 h-5">
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-0 left-0 w-6 h-px bg-current"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-0 w-6 h-px bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-4 left-0 w-6 h-px bg-current"
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu principale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--color-navy)] md:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-10 px-8">
              <nav className="flex-1 flex flex-col gap-6">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-display text-3xl font-semibold",
                        "text-[var(--fg)] hover:text-[var(--color-blue)]",
                        "transition-colors block py-1"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-auto flex flex-col gap-4"
              >
                <GiroButton
                  variant="primary"
                  size="lg"
                  href="/contatti"
                  className="w-full justify-center"
                >
                  Prenota una call
                </GiroButton>
                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-navy-light)]">
                  <span className="text-xs tracking-widest uppercase text-[var(--color-gray-mid)]">
                    Lingua
                  </span>
                  <LanguageSwitcher />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
