"use client"

import { useEffect, useState } from "react"
import { useLenis } from "@/providers/lenis-provider"
import { cn } from "@/lib/utils"

/**
 * Floating FAB "torna su". Appare quando l'utente supera il primo viewport
 * (sulla home e\u0300 dopo aver attraversato la HomeExperience pinned).
 * Al click scrolla a 0 con Lenis (smooth) o fallback nativo.
 */
export function ScrollToTop({ threshold = 1 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const check = () => {
      setVisible(window.scrollY > window.innerHeight * threshold)
    }
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [threshold])

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, lock: true })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Torna in cima alla pagina"
      className={cn(
        // bottom-[max(1.25rem,env(safe-area-inset-bottom))] evita collisione col notch iPhone
        "fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 rounded-full",
        "flex items-center justify-center",
        "bg-[var(--color-blue)] text-white",
        "shadow-[0_10px_30px_-8px_rgba(58,143,232,0.55)]",
        "ring-1 ring-white/10",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(58,143,232,0.7)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
