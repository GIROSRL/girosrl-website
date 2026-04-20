"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LogoAnimated } from "./logo-animated"
import { LanguageSwitcher } from "./language-switcher"
import { MobileNav } from "./mobile-nav"
import { GiroButton } from "@/components/common/giro-button"
import { navItems } from "./nav-items"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]",
          "px-4 py-2 rounded-md bg-[var(--color-blue)] text-white text-sm font-medium"
        )}
      >
        Salta al contenuto
      </a>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[rgba(8,13,26,0.75)] backdrop-blur-xl border-b border-[var(--color-navy-light)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12",
            "flex items-center justify-between gap-4",
            "transition-[padding] duration-300",
            scrolled ? "py-3" : "py-5"
          )}
        >
          <LogoAnimated size="md" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Principale">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm tracking-wide text-[var(--color-gray-mid)]",
                  "hover:text-[var(--fg)] transition-colors duration-200",
                  "after:absolute after:bottom-[-6px] after:left-0 after:h-px after:w-0",
                  "after:bg-[var(--color-blue)] after:transition-all after:duration-300",
                  "hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <GiroButton href="/contatti" size="sm">
              Prenota una call
            </GiroButton>
          </div>

          {/* Mobile */}
          <MobileNav items={navItems} />
        </div>
      </motion.header>
    </>
  )
}
