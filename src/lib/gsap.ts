"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"

// Registrazione plugin idempotente (safe anche con React strict mode double-invoke)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer)
}

export { gsap, ScrollTrigger, Observer }
