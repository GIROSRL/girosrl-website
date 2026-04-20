"use client"

import { useEffect, useRef } from "react"

type MouseParallaxOptions = {
  strength?: number
}

export function useMouseParallax({ strength = 0.03 }: MouseParallaxOptions = {}) {
  const ref = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      ref.current.x = (e.clientX / window.innerWidth - 0.5) * strength
      ref.current.y = (e.clientY / window.innerHeight - 0.5) * strength
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [strength])

  return ref
}
