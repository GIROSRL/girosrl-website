"use client"

import { useEffect } from "react"

/**
 * Forza il ricaricamento della pagina a scrollY=0 al mount.
 * - `scrollRestoration = "manual"` dice al browser di non restore automatico
 * - scrollTo(0,0) applica immediatamente su reload/navigation
 *
 * Montato una volta in RootLayout → vale per tutte le route.
 */
export function ScrollRestorationReset() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])
  return null
}
