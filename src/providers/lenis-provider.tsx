"use client"

import { useEffect, useRef, useState, createContext, useContext } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "@/lib/gsap"

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // State (no ref access in render) — il lenis è disponibile ai consumer via context
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = instance
    // Inizializzazione di external library — setState legittimo per esporre
    // l'istanza via context ai consumer. Non è una cascata di render (unico setState).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)

    // Sincronizzazione Lenis ↔ GSAP ScrollTrigger
    instance.on("scroll", ScrollTrigger.update)

    function raf(time: number) {
      instance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
