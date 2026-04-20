"use client"

import { useEffect, useRef, useState, createContext, useContext } from "react"
import Lenis from "lenis"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "@/lib/gsap"

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = instance
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)

    // Sincronizzazione Lenis ↔ GSAP ScrollTrigger
    instance.on("scroll", ScrollTrigger.update)

    // Usa GSAP ticker invece di RAF standalone — un solo loop condiviso,
    // nessun doppio calcolo, cleanup corretto via gsap.ticker.remove
    gsap.ticker.lagSmoothing(0)
    const tickFn = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tickFn)

    return () => {
      gsap.ticker.remove(tickFn)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
