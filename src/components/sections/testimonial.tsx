"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label } from "@/components/common/typography"

const testimonials = [
  {
    id: 1,
    quote:
      "Con GIRO abbiamo finalmente un partner unico che capisce il nostro business. Strategia, sito e automazioni, tutto coordinato.",
    author: "Marco R.",
    role: "Founder, PMI manifatturiera siciliana",
  },
  {
    id: 2,
    quote:
      "La trasformazione digitale non era più un progetto infinito di riunioni. Abbiamo lanciato in 90 giorni quello che altri fornitori ci promettevano in un anno.",
    author: "Elena D.",
    role: "CEO, e-commerce food",
  },
  {
    id: 3,
    quote:
      "Il dashboard AI che ci hanno costruito ha cambiato il modo in cui prendiamo decisioni. Non è più un tool, è un collaboratore.",
    author: "Andrea P.",
    role: "COO, servizi B2B",
  },
]

export function Testimonial() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  const current = testimonials[index]
  if (!current) return null

  return (
    <Section size="lg" id="testimonial" className="relative overflow-hidden">
      {/* Background orbit */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            border: "1px solid var(--color-blue)",
            background:
              "radial-gradient(circle, rgba(58,143,232,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <Label className="mb-6 text-[var(--color-blue)]">
            Parola ai clienti
          </Label>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-8xl opacity-20"
                style={{ color: "var(--color-blue)" }}
              >
                &ldquo;
              </div>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold italic leading-snug">
                {current.quote}
              </p>
              <footer className="mt-8">
                <div className="text-sm font-semibold">{current.author}</div>
                <div className="text-xs text-[var(--color-gray-mid)] tracking-wide uppercase mt-1">
                  {current.role}
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Vai al testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: index === i ? "28px" : "8px",
                  background:
                    index === i ? "var(--color-blue)" : "var(--color-navy-light)",
                }}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
