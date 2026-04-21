"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label } from "@/components/common/typography"
import { stats, type Stat } from "@/content/stats"

export function Numbers() {
  return (
    <Section size="lg" id="numeri" className="relative">
      <Container>
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Label className="mb-4 text-[var(--color-blue)]">
            Risultati · esperienza
          </Label>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight">
            Numeri che raccontano{" "}
            <em className="not-italic text-[var(--color-blue)]">una storia di fiducia.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, idx) => (
            <NumberCard key={stat.label} stat={stat} delay={idx * 0.15} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

function NumberCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  // SEO-SAFE: SSR renderizza il VALORE REALE (stat.value). Googlebot legge
  // il numero corretto nell'HTML server-side. L'animazione avviene SOLO
  // dopo intersection, manipolando il textContent direttamente (bypass React
  // re-render → zero flash). Quando la card entra in viewport, il DOM viene
  // azzerato e ri-animato verso stat.value con easing.
  useEffect(() => {
    if (!inView || !valueRef.current) return
    const node = valueRef.current
    const target = stat.value
    const startTime = performance.now()
    const duration = 1600

    node.textContent = "0"

    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - startTime - delay * 1000
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      node.textContent = String(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [inView, stat.value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center relative"
    >
      {/* Orbital frame */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-4 mx-auto w-24 h-24 rounded-full opacity-20"
        style={{
          border: "1px solid var(--color-blue)",
          background:
            "radial-gradient(circle, rgba(58,143,232,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none break-words">
          <span ref={valueRef} style={{ color: "var(--color-blue)" }}>
            {stat.value}
          </span>
          <span className="text-[var(--color-blue-light)]">{stat.suffix}</span>
        </div>
        <div className="mt-3 md:mt-4 text-xs sm:text-sm font-semibold tracking-wide">{stat.label}</div>
        {stat.sublabel && (
          <div className="mt-1 text-[9px] sm:text-[10px] tracking-widest uppercase text-[var(--color-gray-mid)]">
            {stat.sublabel}
          </div>
        )}
      </div>
    </motion.div>
  )
}
